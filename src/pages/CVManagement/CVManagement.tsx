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

interface Props {}

const CVManagement: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const hasFetchedCVs = useRef(false)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { resumeData, messageErrorResume, isDeleteCVSuccess } =
    useStoreState(resumeStateSelector)
  const { setResumeData, getAllResumeUser, patchResume, deleteCV, setIsDeleteCVSuccess } =
    useStoreActions(resumeActionSelector)

  const [editName, setIsEditName] = useState({ id: '', isEditName: false })
  const [openModalTitle, setOpenModalTitle] = useState(false)
  const [inputName, setInputName] = useState('')

  const [listResume, setListResume] = useState<IResume[]>([])

  const getAllCVOffUser = async () => {
    const res = await getAllResumeUser()
    if (res) {
      setListResume(res)
    }
  }

  const handlePatchResume = async (id: string) => {
    const res = await patchResume({ id: id, data: { title: inputName } })
    if (res) {
      getAllCVOffUser()
    }
  }

  const handleChangeMainCV = async (id: string) => {
    const res = await patchResume({ id: id, data: { state: true } })
    if (res) {
      getAllCVOffUser()
    }
  }

  const handleDeleteCV = async (id: string) => {
    const res = await deleteCV(id)
    if (res) {
      getAllCVOffUser()
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Delete CV successful',
      })
    }
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

        {listResume.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-8">
            {listResume.map((item, index) => (
              <div
                key={index}
                className="relative min-h-[100px] rounded-xl bg-[#f3f3f3] pt-4 flex-shrink max-w overflow-hidden">
                <div className="flex items-center gap-2 px-4 ">
                  {editName.id === item.id && editName.isEditName ? (
                    <>
                      <input
                        className="outline-none px-2 py-0.5"
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
                          className="cursor-pointer text-xl hover:text-green-600"
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

                <div className="absolute top-4 right-4">
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
                    className="w-auto  z-1 mx-auto h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  scale-x-200 bg-white "
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
                  <div className="flex items-center gap-2 text-gray-500 cursor-pointer text-base hover:text-gray-800">
                    <AiOutlineDownload className="" /> Download
                  </div>
                  <Divider
                    orientation="vertical"
                    variant="fullWidth"
                    flexItem
                  />
                  <div
                    onClick={() => handleDeleteCV(item.id || '')}
                    className="flex items-center gap-2 text-gray-500 cursor-pointer text-base hover:text-red-600">
                    <AiFillDelete className="" /> Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {listResume.length === 0 && (
          <div className="h-96 flex flex-col justify-center items-center">
            <img
              className="h-60 w-auto"
              src={default_not_data}
              alt=""
            />
            <span className="font-medium text-lg">You don't have any resume yet</span>
          </div>
        )}
      </div>
      {openModalTitle && !resumeData?.title && (
        <ModalTitle
          open={openModalTitle}
          setOpen={setOpenModalTitle}
        />
      )}
    </>
  )
}

export default CVManagement
