import { IUser } from "./IUser"

export interface IConversation {
    id: string,
    avatarUrl: string,
    displayName: string
    lastMessage: IMessage | null
    users: {
        userId: string,
        displayName: string | null
        user: IUser
    }[]
    type: string
    isRead?: boolean
    forumId?: string | null
}

export interface IMessage {
    id?: string
    type: string
    content: string,
    author: IUser,
    createdAt: string,
    updatedAt: string,
    conversationId?: string,
    conversation?: IConversation
    userId?: string
}
