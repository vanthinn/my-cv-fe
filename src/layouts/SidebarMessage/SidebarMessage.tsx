import { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import InfiniteScroll from 'react-infinite-scroll-component'
import default_avatar from '../../assets/images/user-default.jpg'
// import socket from '@utils/socket/socketConfig'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { pageMode } from '../../types/ICommon'
import { useDebounce } from '../../hooks/useDebounce'
import SearchInput from '../../components/SearchInput'
import { dayComparedToThePast } from '../../utils/functions/formatDay'
import {
  conversationActionSelector,
  conversationStateSelector,
  userStateSelector,
} from '../../store'
import notFoundSearch from '../../assets/images/notFoundSearch.jpg'
import socket from '../../utils/socket/socketConfig'

interface Props {}
const SidebarMessage: FC<Props> = (): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    getAllConverSation,
    setCurrentConversation,
    setListConversation,
    setIsReadConversation,
  } = useStoreActions(conversationActionSelector)
  const { listConversation, currentConversation } = useStoreState(
    conversationStateSelector,
  )
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const checkRole = currentUserSuccess?.role?.name === 'EMPLOYER'

  const [inputSearch, setInputSearch] = useState<string>('')
  const [totalRowCount, setTotalRowCount] = useState<number>(0)
  const [paginationModel, setPaginationModel] = useState<pageMode | null>(null)
  const [loading, setIsLoading] = useState<boolean>(false)

  const getAllConversationPage = async (): Promise<void> => {
    setIsLoading(true)
    if (paginationModel) {
      const res = await getAllConverSation({
        search: inputSearch,
        skip: paginationModel.page * 10,
        take: paginationModel.pageSize,
      })
      if (res) {
        setTotalRowCount(res.totalRecords)
        const newData = res.data.map((item: any) => {
          return {
            ...item,
            lastMessage:
              item.lastMessage !== null
                ? {
                    ...item.lastMessage,
                    author: { ...item.lastMessage.author.user },
                  }
                : null,
          }
        })
        setListConversation([...listConversation, ...newData])
      }
    }
    setIsLoading(false)
  }

  const debounce = useDebounce(inputSearch, 500)

  useEffect(() => {
    setListConversation([])
    setPaginationModel({ page: 0, pageSize: 10 })
  }, [debounce])

  useEffect(() => {
    getAllConversationPage()
  }, [paginationModel])

  const handleChangeSearch = (value: string): void => {
    setInputSearch(value)
  }

  useEffect(() => {
    if (currentConversation?.users === undefined) {
      const newData = listConversation.find(
        (item: any) => item.id === currentConversation?.id,
      )
      if (newData) {
        setCurrentConversation(newData)
      }
    }
  }, [id, listConversation])

  const handleReadMessage = (messageId: string, conversationId: string): void => {
    setIsReadConversation(conversationId)
    socket.emit('onReadMessage', { messageId: messageId, conversationId: conversationId })
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h2
            className={`px-3 py-2 text-2xl ${checkRole ? 'font-semibold' : 'font-bold'}`}>
            {checkRole ? 'Chat-service' : 'Chat'}
          </h2>
        </div>
        <div className="px-3 pb-3 shadow">
          <SearchInput
            value={inputSearch}
            setValue={handleChangeSearch}
            width="100%"
            size="small"
          />
        </div>

        <div
          id="scrollableDiv"
          style={{
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto',
          }}>
          <InfiniteScroll
            dataLength={listConversation.length}
            next={() =>
              setPaginationModel((prevPaginationModel) => ({
                page: prevPaginationModel ? prevPaginationModel.page + 1 : 0,
                pageSize: 10,
              }))
            }
            hasMore={listConversation.length !== totalRowCount}
            loader={<div>{loading && <span>Loading...</span>}</div>}
            scrollableTarget="scrollableDiv"
            endMessage={
              <div>
                {paginationModel && !loading && listConversation.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="h-40 w-40">
                      <img
                        className="h-full w-full"
                        src={notFoundSearch}
                        alt="not found search"
                      />
                    </div>
                    <span className="font-medium">
                      We're sorry. We were not able to find a match
                    </span>
                  </div>
                )}
                {/* {data.length === totalRowCount && data.length > 0 && paginationModel && (
              <p style={{ textAlign: 'center', marginTop: 12 }}>
                <b>Đúng! Bạn đã nhìn thấy tất cả kết quả tìm kiếm</b>
              </p>
            )} */}
              </div>
            }>
            <ul className="flex flex-col mt-2 gap-1 px-2 pt-1 ">
              {listConversation.length > 0 &&
                listConversation.map((item: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (!checkRole) {
                        navigate('/message/' + item.id)
                      } else {
                        navigate('/employer/chat-service/' + item.id)
                      }
                      setCurrentConversation(item)

                      if (!item.isRead) {
                        handleReadMessage(item.lastMessage?.id || '', item.id)
                      }
                    }}
                    className={`flex px-2 py-1  transition-all duration-200 rounded-md cursor-pointer
                ${id === item?.id ? 'bg-sky-100' : 'hover:bg-gray-200'}
                `}>
                    <a className="relative flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full border border-gray-700 bg-gray-700 object-cover mr-2 "
                        src={item?.avatarUrl || default_avatar}
                        alt="avatar"
                      />
                      {/* {item.type === 'CHAT' &&
                        listFriendOnline.some(
                          (user: any) =>
                            user.id === item.users[0].userId ||
                            user.id === item.users[1].userId,
                        ) && (
                          <span
                            title="online"
                            className="flex ml-auto flex-shrink-0 absolute bottom-1 right-1.5 bg-green-500 border border-white w-[11px] h-[11px] rounded-full"></span>
                        )} */}
                    </a>
                    <div className="flex flex-col w-full ">
                      <span className="font-semibold whitespace-nowrap truncate max-w-[200px] ">
                        {item?.displayName}
                        {item.forumId === null && item.type === 'GROUP_CHAT' && (
                          <span>
                            <HiMiniUserGroup className="inline mb-1 h-4 w-4 ml-1.5" />
                          </span>
                        )}
                      </span>
                      <div
                        className={`flex items-center gap-2 ${
                          !item.isRead && 'font-semibold'
                        }`}>
                        <span className={` text-sm max-w-[125px] break-words truncate `}>
                          {item.lastMessage?.type === 'TEXT' &&
                            `${item.lastMessage?.content}`}
                          {item.lastMessage?.type === 'IMAGE' &&
                            (item.lastMessage.author.id === currentUserSuccess?.id
                              ? 'Bạn đã gửi một ảnh'
                              : `${
                                  item.lastMessage.author.displayName ||
                                  item.lastMessage.author.fullName
                                } đã gửi mọt ảnh`)}
                        </span>
                        <span className=" text-xs">
                          {item?.lastMessage &&
                            dayComparedToThePast(item.lastMessage.createdAt)}
                        </span>
                      </div>
                    </div>

                    {!item.isRead && (
                      <span
                        title="not read"
                        className="flex ml-auto flex-shrink-0  transform translate-y-[18px] bg-blue-500 border border-white w-[10px] h-[10px] rounded-full"></span>
                    )}
                  </li>
                ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}

export default SidebarMessage
