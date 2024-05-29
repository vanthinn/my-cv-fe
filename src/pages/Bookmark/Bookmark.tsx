import { useStoreActions } from 'easy-peasy'
import { FC, useEffect, useState } from 'react'
import { HiBookmark, HiX } from 'react-icons/hi'
import { bookmarkActionSelector } from '../../store'
import { IBookmark } from '../../types/IUser'
import { Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { daysUntil } from '../../utils/functions/formatDay'

interface Props {}

const Bookmark: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { deleteBookmark, getBookmarkOfUser } = useStoreActions(bookmarkActionSelector)
  const [data, setData] = useState<IBookmark[]>([])

  const getBookmark = async () => {
    const res = await getBookmarkOfUser()
    if (res) {
      setData(res)
    }
  }

  const handleDelete = async (id: string) => {
    const res = await deleteBookmark({ id: id })
    if (res) {
      const newData = data.filter((item) => item.job.id !== id)
      setData(newData)
    }
  }

  useEffect(() => {
    getBookmark()
  }, [])

  return (
    <div className="p-8 mt-8 min-h-12 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h2 className="text-2xl font-semibold text-blue-700 flex gap-2 items-center">
        Bookmark <HiBookmark className={`text-3xl mr-1`} />
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-6">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="border px-4 py-2 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-medium flex-1 line-clamp-1">
                  {item?.job?.jobTitle}
                </h4>
                <HiX
                  onClick={() => handleDelete(item.job.id || '')}
                  className="text-2xl mt-2 hover:text-red-500 cursor-pointer"
                />
              </div>
              <div
                onClick={() => navigate('/jobs/' + item.job.id)}
                className="flex mt-2 gap-2 flex-wrap">
                <li className="list-none px-2 py-0.5 bg-blue-400 text-white rounded-md text-sm">
                  {item.job.salary}
                </li>

                <li className="list-none px-2 py-0.5 bg-blue-400 text-white rounded-md text-sm">
                  {item.job.experience}
                </li>
                <li className="list-none px-2 py-0.5 bg-blue-400 text-white rounded-md text-sm">
                  {item.job.jobType}
                </li>
                {item.job.education && (
                  <li className="list-none px-2 py-0.5 bg-blue-400 text-white rounded-md text-sm">
                    {item.job.education}
                  </li>
                )}
                <li className="list-none px-2 py-0.5 bg-blue-400 text-white rounded-md text-sm">
                  <span className="font-semibold text-slate-200">
                    {daysUntil(item.job.deadline)}
                  </span>{' '}
                  days left to apply
                </li>
              </div>

              <div
                onClick={() => navigate('/jobs/' + item.job.id)}
                style={{ paddingBottom: '16px' }}
                className="mt-4  flex gap-4 items-center ">
                <img
                  className="h-14 w-14 border border-slate-200 rounded-md"
                  src={item.job.company.logoUrl}
                  alt=""
                />
                <div className="flex flex-col flex-1 ">
                  <Tooltip title={item.job.company.displayName}>
                    <h4 className="line-clamp-1 text-base font-medium text-gray-700 ">
                      {item.job.company.displayName}
                    </h4>
                  </Tooltip>
                  <div className="flex items-center text-sm mt-0.5 ">
                    <Tooltip title={item.job.company.address}>
                      <span className="line-clamp-1 ">{item.job.company.address}</span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Bookmark
