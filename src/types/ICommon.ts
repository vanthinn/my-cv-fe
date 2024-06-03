export interface IOption {
    label?: string
    name: string
    id?: string
    value?: string
}

export interface Image {
    name: string
    fileUrl: string
}

export interface pageMode {
    page: number,
    pageSize: number
}

export interface IParams {
    id?: string;
    params?: any
}
