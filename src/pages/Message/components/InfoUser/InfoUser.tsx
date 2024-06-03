import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useStoreState } from 'easy-peasy'
import { conversationStateSelector, userStateSelector } from '../../../../store'
import { formatDayVN } from '../../../../utils/functions/formatDay'
import {
  HiOutlineCake,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiOutlineUser,
} from 'react-icons/hi'
import avatar_default from '../../../../assets/images/user-default.jpg'

export default function InfoUser({ open, toggleDrawer }: any) {
  const { currentConversation } = useStoreState(conversationStateSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const infoUser = currentConversation?.users.filter(
    (item) => item.userId !== currentUserSuccess?.id,
  )[0]
  const DrawerList = (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}>
      <div
        className="col-span-2 border-l border-gray-300 flex flex-col py-4 items-center px-2 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 62px)' }}>
        <img
          className="h-16 w-16 rounded-full border border-gray-500 object-cover flex-shrink-0"
          src={currentConversation?.avatarUrl || avatar_default}
          alt={currentConversation?.displayName}
        />

        <span className="font-semibold text-lg mt-4">
          {currentConversation?.displayName}
        </span>

        <span className="mt-2 flex items-center gap-2">
          <HiOutlineUser />
          {infoUser?.user.gender}
        </span>

        <span className="mt-2 flex items-center gap-2">
          <HiOutlineCake />
          {formatDayVN(infoUser?.user.dateOfBirth || '')}
        </span>
        <span className="mt-2 flex items-center gap-2">
          <HiOutlineMail />
          {infoUser?.user.email}
        </span>
        <span className="mt-2 flex items-center gap-2">
          <HiOutlinePhone />
          {infoUser?.user.phoneNumber}
        </span>
        {infoUser?.user.company && (
          <span className="mt-2 flex items-center gap-2">
            <HiOutlineOfficeBuilding />
            {infoUser?.user.company.displayName}
          </span>
        )}
      </div>
    </Box>
  )

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
