import { Tooltip } from '@mui/material'
import { FC, useState } from 'react'
import { HiOutlinePencil, HiOutlinePlus, HiPencilAlt } from 'react-icons/hi'
import Button from '../../components/Button'
import test from '../../assets/images/logo.png'
import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai'
import Divider from '@mui/material/Divider'
import ModalTitle from '../../components/DetailResume/components/ModalTitle'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { resumeActionSelector, resumeStateSelector } from '../../store'

interface Props {}

const CVManagement: FC<Props> = (props): JSX.Element => {
  const [editName, setIsEditName] = useState(false)
  const [openModalTitle, setOpenModalTitle] = useState(false)
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)
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

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="min-h-[100px] rounded-xl bg-[#f3f3f3] pt-4 flex-shrink max-w overflow-hidden">
            <div className="flex items-center gap-2 px-4 ">
              {editName ? <input type="text" /> : <span>My resume</span>}
              <Tooltip title="edit name resume">
                <div>
                  <HiOutlinePencil
                    onClick={() => setIsEditName(!editName)}
                    className="cursor-pointer"
                  />
                </div>
              </Tooltip>
            </div>

            <div className="px-8 pt-4 pb-2 h-[200px] ">
              <img
                src={test}
                className="w-auto mx-auto h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] object-cover bg-white "
                alt=""
              />
            </div>

            <div
              className="flex py-2 bg-[#D9DDE0] px-4 justify-between z-10
            ">
              <div className="flex items-center gap-2 text-gray-500 cursor-pointer text-base hover:text-gray-800">
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
              <div className="flex items-center gap-2 text-gray-500 cursor-pointer text-base hover:text-red-600">
                <AiFillDelete className="" /> Delete
              </div>
            </div>
          </div>
        </div>
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
