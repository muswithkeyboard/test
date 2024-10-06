export type User = {
    id: number
    login: string
    password: string
    surname: string
    firstname: string
    secondname: string
}

export type Place = {
    id: number
    number: string
    address: string
    to: To[]
    defect: Defect[]

}
export type To = {
    id: number
    placeNumber: string
    address: string
    placeTo: Place
    createdAt: Date
    updatedAt: Date
    protocol11: any
    protocol12: any
    protocol32: any
    protocol51: any
    protocol52: any
    protocol61: any
    protocol10: any
    fio: string
}

export type Defect = {
    id: number
    placeNumber: string
    content: string
    createdAt: Date
    updatedAt: Date
    placeDefect: Place
}