import { useStoreActions, useStoreState } from 'easy-peasy'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  bookmarkActionSelector,
  jobActionSelector,
  jobStateSelector,
  notifyActionSelector,
  userStateSelector,
} from '../../store'
import { IRecruitmentResponse } from '../../types/IRecruitment'
import { FiDollarSign } from 'react-icons/fi'
import {
  HiArrowSmRight,
  HiBookmark,
  HiOutlineAcademicCap,
  HiOutlineBookmark,
  HiOutlineBriefcase,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
} from 'react-icons/hi'
import { LiaBusinessTimeSolid } from 'react-icons/lia'
import { BiTimer } from 'react-icons/bi'
import { dayComparedToThePast, formatDayVN } from '../../utils/functions/formatDay'
import Button from '../../components/Button'
import { AiOutlineSend } from 'react-icons/ai'
import { Tooltip } from '@mui/material'

interface Props {}

const JobOfferDetail: FC<Props> = (props): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isApplyJobSuccess, messageErrorJob } = useStoreState(jobStateSelector)
  const { getJobById, applyJob, setIsApplyJobSuccess } =
    useStoreActions(jobActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { createBookmark, deleteBookmark } = useStoreActions(bookmarkActionSelector)

  const [job, setJob] = useState<IRecruitmentResponse>()
  const [loading, setLoading] = useState<string>('START')
  const [statusBookmark, setStatusBookmark] = useState<string>('')

  const getJobByIdPage = async () => {
    if (id) {
      setLoading('LOADING')
      const res = await getJobById({ jobId: id, userId: currentUserSuccess?.id })
      if (res) {
        setJob(res)
        setStatusBookmark(res?.statusBookmark)
      }
      setLoading('LOADING_SUCCESS')
    }
  }

  const handleApplyJob = async () => {
    if (id) {
      const res = await applyJob({ jobId: id })
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Apply job successful',
        })
      }
    }
  }

  const handleBookmark = async () => {
    if (id) {
      if (statusBookmark === 'NONE_BOOKMARK') {
        await createBookmark({ id: id })
        setStatusBookmark('BOOKMARK')
      } else {
        await deleteBookmark({ id: id })
        setStatusBookmark('NONE_BOOKMARK')
      }
    }
  }

  useEffect(() => {
    if (!isApplyJobSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorJob,
      })
      setIsApplyJobSuccess(true)
    }
  }, [isApplyJobSuccess])

  useEffect(() => {
    getJobByIdPage()
  }, [id])
  return (
    <div className="my-8">
      <div className="grid grid-cols-12 gap-8 ">
        {loading === 'LOADING_SUCCESS' && (
          <>
            <div className="col-span-8">
              <div className="flex flex-col px-4 py-3 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <h4 className="text-xl font-semibold">{job?.jobTitle}</h4>
                <div className=" mt-5 mb-3 grid grid-cols-3 gap-2 ">
                  <div className="flex items-center gap-4">
                    <div className="px-2 py-2 bg-blue-500 text-white rounded-full">
                      <FiDollarSign className="text-xl " />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Salary</span>
                      <span className="font-medium">{job?.salary}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="px-2 py-2 bg-blue-500 text-white rounded-full">
                      <LiaBusinessTimeSolid className="text-xl " />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Working time</span>
                      <span className="font-medium">{job?.jobType}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="px-2 py-2 bg-blue-500 text-white rounded-full">
                      <HiOutlineBriefcase className="text-xl " />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-medium">{job?.experience}</span>
                    </div>
                  </div>
                </div>

                {job?.education && (
                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="flex items-center gap-2 text-blue-500">
                      <HiOutlineAcademicCap className="text-2xl" />
                      <span className="font-medium">Education:</span>
                    </div>
                    <span className="font-medium">{job?.education}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex items-center gap-2 text-red-500">
                    <BiTimer className="text-2xl" />
                    <span className="font-medium">Deadline for submission:</span>
                  </div>
                  <span className="font-medium">{formatDayVN(job?.deadline || '')}</span>
                </div>

                <div className="flex mt-2 gap-2 items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <HiOutlineClock className="text-xl" />
                    <span className="text-sm">
                      Post at {dayComparedToThePast(job?.createdAt || '')}
                    </span>
                  </div>

                  {job?.updatedAt && job?.updatedAt !== job.createdAt && (
                    <>
                      <span className="transform translate-y-[-6.5px] text-2xl text-gray-400 ">
                        .
                      </span>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-sm">
                          Update at {dayComparedToThePast(job?.updatedAt || '')}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-12 gap-4 mt-4">
                  <div className="col-span-8">
                    <Button
                      onClick={() => {
                        if (currentUserSuccess) handleApplyJob()
                        else navigate('/auth/login')
                      }}
                      className="flex items-start gap-2 flex-1 w-full justify-center py-2.5">
                      <AiOutlineSend className="text-xl mr-2  rotate-[-45deg]" />
                      <span>Apply now</span>
                    </Button>
                  </div>

                  <div className="col-span-4">
                    <Button
                      onClick={() => {
                        if (currentUserSuccess) handleBookmark()
                        else navigate('/auth/login')
                      }}
                      typeButton="outline"
                      className={`flex items-start gap-2 flex-1 w-full justify-center py-2.5 
                        ${
                          statusBookmark === 'BOOKMARK'
                            ? 'border-blue-500 text-blue-500'
                            : 'hover:border-blue-500 hover:text-blue-500'
                        } `}>
                      {statusBookmark == 'BOOKMARK' ? (
                        <HiBookmark className={`text-xl mr-1 text-blue-500 `} />
                      ) : (
                        <HiOutlineBookmark className={`text-xl mr-1`} />
                      )}

                      <span>Bookmark</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-8 px-4 py-3 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <h4 className="text-xl font-semibold">Job Description</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: job?.description || '',
                  }}
                />
              </div>

              <div className="mt-8 px-4 py-3 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <h4 className="text-xl font-semibold">Related jobs</h4>
                {/* <div
              dangerouslySetInnerHTML={{
                __html: job?.description || '',
              }}
            /> */}
              </div>
            </div>

            <div className="col-span-4">
              <div className="flex flex-col px-4 py-3 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <div className="h-14 w-14 rounded-lg mx-auto border border-gray-200">
                  <img
                    className="object-cover h-full f-full"
                    src={job?.company.logoUrl}
                    alt=""
                  />
                </div>
                <h4 className="mx-auto mt-2 font-semibold">{job?.company.displayName}</h4>
                <div className="flex gap-2 mt-2 text-sm">
                  <div className="flex  items-center">
                    <HiOutlineUserGroup className="text-xl mr-2" />
                    <span className="font-medium">Scale:</span>
                  </div>
                  <span>{job?.company.scale}</span>
                </div>

                <div className="flex gap-2 mt-2 text-sm">
                  <div className="flex  items-center">
                    <HiOutlineLocationMarker className="text-xl mr-2" />
                    <span className="font-medium">Address:</span>
                  </div>
                  <Tooltip title={job?.company.address}>
                    <span className="line-clamp-1">{job?.company.address}</span>
                  </Tooltip>
                </div>

                <span className="mx-auto mt-4 text-blue-500 cursor-pointer hover:underline hover:text-violet-500">
                  See company
                </span>
              </div>

              <div className="mt-8 px-4 py-3 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <h4 className="text-base font-semibold">
                  Other Jobs from {job?.company.displayName}
                </h4>
                <div className="flex flex-col my-3">
                  {job?.jobsCompany && job?.jobsCompany.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {job?.jobsCompany.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          onClick={() => navigate('/jobs/' + item.id)}
                          className="border border-slate-300 px-2 py-2 rounded-md cursor-pointer hover:border-blue-500 hover:scale-105 transition-all duration-200">
                          <h4 className="font-medium">{item.jobTitle}</h4>
                          <div className="grid grid-cols-2">
                            <span className="flex items-center gap-2 font-medium mt-1 text-blue-500">
                              <FiDollarSign className="text-xl " />
                              {item.salary}
                            </span>
                            <span className="flex items-center gap-2 font-medium mt-1">
                              <LiaBusinessTimeSolid className="text-xl " />
                              {item.jobType}
                            </span>
                          </div>
                          <span className="flex items-center gap-2 font-medium mt-1">
                            <HiOutlineBriefcase className="text-xl " />
                            {item.experience}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-base mx-auto">There are no other jobs</span>
                  )}

                  {job?.jobsCompany && job?.jobsCompany.length > 3 && (
                    <span className="mx-auto mt-4 text-blue-500 cursor-pointer hover:underline hover:text-violet-500 flex items-center">
                      See more
                      <HiArrowSmRight className="text-xl text-blue-500 cursor-pointer hover:underline hover:text-violet-500 " />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {loading === 'LOADING' && <span>Loading...</span>}
      </div>
    </div>
  )
}

export default JobOfferDetail
