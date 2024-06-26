import { Tooltip } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'
import {
  HiCheck,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineStar,
  HiPencilAlt,
  HiStar,
} from 'react-icons/hi'
import Button from '../../components/Button'
import test from '../../assets/images/logo.png'
import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai'
import Divider from '@mui/material/Divider'
import ModalTitle from '../../components/DetailResume/components/ModalTitle'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  notifyActionSelector,
  resumeActionSelector,
  resumeStateSelector,
  userStateSelector,
} from '../../store'
import { IResume } from '../../types/IResume'
import default_not_data from '../../assets/images/notFoundSearch.jpg'
import { useNavigate } from 'react-router-dom'
import ModalConfirm from '../../components/ModalConfirm'
import jsPDF from 'jspdf'

interface Props {}

const CVManagement: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const hasFetchedCVs = useRef(false)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { resumeData, messageErrorResume, isDeleteCVSuccess } =
    useStoreState(resumeStateSelector)
  const {
    setResumeData,
    getAllResumeUser,
    patchResume,
    deleteCV,
    setIsDeleteCVSuccess,
    getCVById,
  } = useStoreActions(resumeActionSelector)

  const [editName, setIsEditName] = useState({ id: '', isEditName: false })
  const [openModalTitle, setOpenModalTitle] = useState(false)
  const [inputName, setInputName] = useState('')
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [idDelete, setIdDelete] = useState<string>('')
  const [loading, setLoading] = useState<string>('START')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [listResume, setListResume] = useState<IResume[]>([])

  const getAllCVOffUser = async () => {
    setLoading('LOADING')
    const res = await getAllResumeUser()
    if (res) {
      setListResume(res)
    }
    setLoading('LOADING_SUCCESS')
  }

  const handlePatchResume = async (id: string) => {
    setIsLoading(true)
    const res = await patchResume({ id: id, data: { title: inputName } })
    if (res) {
      getAllCVOffUser()
    }
    setIsLoading(false)
  }

  const generatePdf = async (id: string) => {
    const res = await getCVById(id)
    if (res) {
      const imageUrl = res.image
      if (!imageUrl) {
        console.error('Image URL not found in the CV data.')
        return
      }

      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.src = imageUrl

      image.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        if (context) {
          const scaleFactor = 2
          const imageWidth = image.width
          const imageHeight = image.height
          const scaledWidth = imageWidth * scaleFactor
          const scaledHeight = imageHeight * scaleFactor

          canvas.width = scaledWidth
          canvas.height = scaledHeight

          context.fillStyle = 'white'
          context.fillRect(0, 0, scaledWidth, scaledHeight)

          context.scale(scaleFactor, scaleFactor)
          context.drawImage(image, 0, 0, imageWidth, imageHeight)

          const dataUrl = canvas.toDataURL('image/png')

          const pdfWidth = 480
          const pdfHeight = (scaledHeight * pdfWidth) / scaledWidth // Calculate PDF height based on aspect ratio

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [pdfWidth, pdfHeight],
          })

          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
          pdf.save('cv.pdf')
        } else {
          console.error('Failed to get 2D context for the canvas.')
        }
      }
      image.onerror = (error) => {
        console.error('Failed to load the image.', error)
      }
    }
  }

  const handleChangeMainCV = async (id: string) => {
    setIsLoading(true)
    const res = await patchResume({ id: id, data: { state: true } })
    if (res) {
      getAllCVOffUser()
    }
    setIsLoading(false)
  }

  const handleDeleteCV = async () => {
    setIsLoading(true)
    const res = await deleteCV(idDelete || '')
    if (res) {
      getAllCVOffUser()
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Delete CV successful',
      })
    }
    setOpenModalDelete(false)
    setIsLoading(false)
  }

  useEffect(() => {
    if (currentUserSuccess && !hasFetchedCVs.current) {
      getAllCVOffUser()
      hasFetchedCVs.current = true
    }

    return () => {}
  }, [currentUserSuccess])

  useEffect(() => {
    if (!isDeleteCVSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorResume,
      })
      setIsDeleteCVSuccess(true)
    }
  }, [isDeleteCVSuccess])

  return (
    <>
      <div className="p-8 mt-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-2xl">My resume</span>
          <Button
            onClick={() => {
              setResumeData({})
              setOpenModalTitle(true)
            }}>
            <HiOutlinePlus className="mr-2" /> New resume
          </Button>
        </div>

        {loading === 'LOADING_SUCCESS' && listResume.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-8">
            {listResume.map((item, index) => (
              <div
                key={index}
                className="relative min-h-[100px] rounded-xl bg-[#f3f3f3] pt-4 flex-shrink max-w overflow-hidden">
                <div className="flex items-center gap-2 px-4 ">
                  {editName.id === item.id && editName.isEditName ? (
                    <>
                      <input
                        className="outline-none px-2 max-w-[80%] rounded-md "
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                      />
                      <div>
                        <HiCheck
                          onClick={() => {
                            if (item.title !== inputName) {
                              handlePatchResume(item.id || '')
                            }
                            setIsEditName({ id: item.id || '', isEditName: false })
                          }}
                          className={`cursor-pointer text-xl hover:text-green-600 ${
                            isLoading && 'pointer-events-none'
                          } `}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{item.title}</span>
                      <Tooltip title="edit name resume">
                        <div>
                          <HiOutlinePencil
                            onClick={() => {
                              setInputName(item.title || '')
                              setIsEditName({ id: item.id || '', isEditName: true })
                            }}
                            className="cursor-pointer"
                          />
                        </div>
                      </Tooltip>
                    </>
                  )}
                </div>

                <div className="absolute top-5 right-5">
                  {item.state ? (
                    <Tooltip title="Main cv">
                      <div>
                        <HiStar className="text-xl text-blue-500" />
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Choose main cv ">
                      <div onClick={() => handleChangeMainCV(item.id || '')}>
                        <HiOutlineStar className="text-xl cursor-pointer" />
                      </div>
                    </Tooltip>
                  )}
                </div>

                <div className="px-8 pt-4 pb-2 h-[200px] overflow-hidden">
                  <img
                    src={item.image || test}
                    className="max-w-[110px]  z-1 mx-auto h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  scale-x-200 bg-white "
                    alt=""
                  />
                </div>

                <div
                  className="flex py-2 bg-[#D9DDE0] px-4 justify-between z-10
            ">
                  <div
                    onClick={() => navigate('/cv/' + item.id)}
                    className="!z-50 flex items-center gap-2 text-gray-500 cursor-pointer text-base hover:text-gray-800">
                    <HiPencilAlt className="" /> Edit
                  </div>
                  <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                  />
                  <div
                    onClick={async () => {
                      await generatePdf(item.id || '')
                    }}
                    className="flex items-center gap-2 text-gray-500 cursor-pointer text-base hover:text-gray-800">
                    <AiOutlineDownload className="" /> Download
                  </div>
                  <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                  />
                  <div
                    onClick={() => {
                      setIdDelete(item.id || '')
                      setOpenModalDelete(true)
                    }}
                    className={`flex items-center gap-2 text-gray-500 cursor-pointer text-base hover:text-red-600 ${
                      isLoading && 'pointer-events-none'
                    }`}>
                    <AiFillDelete className="" /> Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading === 'LOADING_SUCCESS' && listResume.length === 0 && (
          <div className="h-96 flex flex-col justify-center items-center">
            <img
              className="h-60 w-auto"
              src={default_not_data}
              alt=""
            />
            <span className="font-medium text-lg">You don't have any resume yet</span>
          </div>
        )}

        {loading === 'LOADING' && (
          <div className="mt-8 grid grid-cols-3 gap-8">
            <div className="animate-pulse border h-20 border-slate-200 px-3 py-2 flex flex-col gap-2"></div>

            <div className="animate-pulse border h-20 border-slate-200 px-3 py-2 flex flex-col gap-2"></div>

            <div className="animate-pulse border h-20 border-slate-200 px-3 py-2 flex flex-col gap-2"></div>
          </div>
        )}
      </div>
      {openModalTitle && !resumeData?.title && (
        <ModalTitle
          open={openModalTitle}
          setOpen={setOpenModalTitle}
        />
      )}

      {openModalDelete && (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleDeleteCV}
        />
      )}
    </>
  )
}

export default CVManagement
