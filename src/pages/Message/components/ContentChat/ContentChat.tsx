import { FC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import imgVT from '../../../../assets/images/ingVT.png'
import { Tooltip } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { IMessage } from '../../../../types/IConversation'
import { userStateSelector } from '../../../../store'
import { pageMode } from '../../../../types/ICommon'
import { formatDateLocalV2 } from '../../../../utils/functions/formatDay'
import avatar_default from '../../../../assets/images/user-default.jpg'

interface Props {
  data: IMessage[]
  checkNext: boolean
  setPaginationModel: React.Dispatch<React.SetStateAction<pageMode | null>>
  totalRowCount: number
  heightContent?: number
  loading: boolean | null
  paginationModel: pageMode | null
  loadingImage: boolean
}

const ContentChat: FC<Props> = ({
  data,
  checkNext,
  setPaginationModel,
  totalRowCount,
  heightContent,
  loading,
  paginationModel,
  loadingImage,
}: Props): JSX.Element => {
  const { currentUserSuccess } = useStoreState(userStateSelector)
  return (
    <>
      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          if (checkNext) {
            setPaginationModel((prevPaginationModel: any) => ({
              page: prevPaginationModel ? prevPaginationModel.page + 1 : 0,
              pageSize: 10,
            }))
          }
        }}
        hasMore={data.length !== totalRowCount}
        height={heightContent !== undefined ? heightContent : '0'}
        loader={
          loading && (
            <div className=" flex flex-col px-2 gap-2">
              <div className="animate-pulse justify-start flex gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 mt-auto"></div>
                <div className="flex flex-col">
                  <p className="w-20 h-2 rounded-md bg-slate-200"></p>
                  <p className="w-52 h-5 rounded-md mt-2 bg-slate-200"></p>
                </div>
              </div>
              <div className="animate-pulse justify-start flex gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 mt-auto"></div>
                <div className="flex flex-col">
                  <p className="w-20 h-2 rounded-md bg-slate-200"></p>
                  <p className="w-72 h-5 rounded-md mt-2 bg-slate-200"></p>
                </div>
              </div>

              <div className="animate-pulse justify-end flex gap-2">
                <div className="flex flex-col">
                  <p className="w-14 h-5 rounded-md mt-2 bg-slate-200"></p>
                </div>
              </div>
              <div className="animate-pulse justify-end flex gap-2">
                <div className="flex flex-col">
                  <p className="w-28 h-5 rounded-md mt-2 bg-slate-200"></p>
                </div>
              </div>

              <div className="animate-pulse justify-start flex gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 mt-auto"></div>
                <div className="flex flex-col">
                  <p className="w-20 h-2 rounded-md bg-slate-200"></p>
                  <p className="w-16 h-5 rounded-md mt-2 bg-slate-200"></p>
                </div>
              </div>

              <div className="animate-pulse justify-end flex gap-2">
                <div className="flex flex-col">
                  <p className="w-20 h-5 rounded-md mt-2 bg-slate-200"></p>
                </div>
              </div>

              <div className="animate-pulse justify-start flex gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 mt-auto"></div>
                <div className="flex flex-col">
                  <p className="w-20 h-2 rounded-md bg-slate-200"></p>
                  <p className="w-40 h-5 rounded-md mt-2 bg-slate-200"></p>
                </div>
              </div>
            </div>
          )
        }
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        inverse={true}
        endMessage={
          <div>
            {data.length === totalRowCount && data.length === 0 && paginationModel && (
              <div>
                <div className="flex justify-center ">
                  <img
                    className=" h-32 w-32 animate-[wiggle_1s_ease-in-out_infinite]"
                    src={imgVT}
                    alt="Vẫy tay"
                  />
                </div>
                <p
                  style={{
                    textAlign: 'center',
                    marginBottom: 16,
                  }}>
                  <b>Be the one to start the conversation</b>
                </p>
              </div>
            )}
            {data.length === totalRowCount && data.length > 0 && paginationModel && (
              <p style={{ textAlign: 'center', marginTop: 12 }}>
                <b>You have seen all the messages</b>
              </p>
            )}
          </div>
        }
        scrollableTarget="scrollableDivContentChat">
        <>
          {loadingImage && (
            <div className="animate-pulse flex flex-col">
              <div className="ml-auto mr-2">
                <div className="h-48 w-48 bg-slate-200 rounded-md"></div>
              </div>
            </div>
          )}
          {data.map((item, index) => (
            <div
              id={item.id}
              key={index}
              className="flex flex-col px-2">
              <div
                className={`flex gap-2 my-1.5  ${
                  item.author.id === currentUserSuccess?.id ? ' ml-auto' : 'mr-auto'
                }`}>
                {item.author.id !== currentUserSuccess?.id && (
                  <div className="mt-auto">
                    <div className="h-8 w-8 overflow-hidden">
                      <img
                        className="h-full w-full rounded-3xl border border-gray-200"
                        src={item.author.avatarUrl || avatar_default}
                        alt={item.author.firstName}
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-1 text-xs">
                  {item.author.id !== currentUserSuccess?.id && (
                    <span>{item.author.firstName + ' ' + item.author.lastName}</span>
                  )}
                  <Tooltip title={formatDateLocalV2(item.createdAt)}>
                    <div className="flex max-w-[700px] ">
                      {item.type === 'TEXT' && (
                        <p
                          className={`text-base px-2.5 py-0.5 break-words ${
                            item.author.id === currentUserSuccess?.id
                              ? 'bg-blue-400 text-white'
                              : 'bg-gray-100 text-black'
                          } rounded-2xl`}
                          style={{ wordBreak: 'break-all' }}>
                          {item.content}
                        </p>
                      )}
                      {item.type === 'IMAGE' && (
                        <div className="w-full overflow-hidden ">
                          <img
                            src={item.content}
                            alt="image"
                            className="rounded-md max-h-[250px] max-w-[600px] border border-gray-200 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </>
      </InfiniteScroll>
    </>
  )
}

export default ContentChat
