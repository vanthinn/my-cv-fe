import { FC, useCallback, useEffect, useState } from 'react'
import { DATA_SIDEBAR } from '../../../common/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  HiOutlineChatAlt2,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineUserCircle,
  HiOutlineViewGrid,
  HiUser,
} from 'react-icons/hi'

interface Props {}

// bg - [#cee4f0]

const SidebarEmployer: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [selected, setSelected] = useState<number | null | string>(null)
  useEffect(() => {
    const routePath = `/${pathname.split('/')[1]}`
    DATA_SIDEBAR.map((item) => {
      if (routePath === item.pathName) {
        setSelected(item.id)
      }
    })
  }, [])

  const _renderIcon = useCallback((icon: string) => {
    let result = null
    switch (icon) {
      case 'dashboard': {
        result = <HiOutlineViewGrid className="inline-block h-6 w-6 font-thin" />
        break
      }
      case 'setting': {
        result = <HiOutlineCog className="inline-block h-6 w-6" />
        break
      }
      case 'recruitment': {
        result = <HiOutlineClipboardList className="inline-block h-6 w-6" />
        break
      }
      case 'cv': {
        result = <HiOutlineUserCircle className="inline-block h-6 w-6" />
        break
      }
      case 'chat': {
        result = <HiOutlineChatAlt2 className="inline-block h-6 w-6" />
        break
      }
    }
    return result
  }, [])

  return (
    <div className="flex-1 bg-[#fff] border-r border-slate-200 max-h-[100vh] fixed w-full">
      <div>
        <ul
          id="side-menu"
          className="w-full float-none flex flex-col gap-2  py-4 ">
          {DATA_SIDEBAR.map((dataItem: any, index: number) => (
            <li
              className={`relative`}
              key={JSON.parse(JSON.stringify(dataItem)) + index}>
              <a
                className={`flex text-black cursor-pointer `}
                onClick={() => {
                  // if (selected != dataItem?.id) {
                  setSelected(dataItem?.id)
                  navigate(dataItem?.pathName)
                  // }
                }}>
                <div
                  className={`flex w-full justify-start items-center px-2 py-2.5 
                 ${
                   selected === index
                     ? 'bg-slate-200'
                     : 'hover:bg-slate-200 transition-all duration-200'
                 } `}>
                  <div className="ml-[8px]">{_renderIcon(dataItem.icon)}</div>
                  <span className={`text-base  ml-2`}>{dataItem?.name}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SidebarEmployer
