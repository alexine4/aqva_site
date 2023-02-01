

export interface User {
	id?: string
	username?: string
	email?: string
	password: string
}

export interface UserInfo {
	idUserInfo?: number
	idUser: number
	imageSRC?: string
	country?: string
	address?: string
	city?: string
	phone?: string
}

export interface UserStatus {
	status: boolean
}

export interface Category {
	idCategories?: number
	name?: string
	count?: number
}

export interface Type {
	idType?: number
	name: string
	idCategory: number
	count?: number
}

export interface Genus {
	idGenus?: number
	name: string
	idType: number
	count?: number
}

export interface Position {
	idPosition?: number
	name: string
	description?: string
	idGenus?: number
	count?: number
	delete?: boolean
	amount: number
	coast?: number
	company: string
}


export interface Image {
	idPosition: number
	idImage?: string
	imageSRC: string
	color?: string
	idUser: number
	active?: boolean
}

export interface Message {
	message: string
}

export interface Color {
	color: string
}

export interface universalAdder {
	name?: string
	type?: string
	action?: string
	description?: string
	amount?: number
	quantity?: number
	coastPerOne?: number
	totalCoast?: number
}

export interface Order {
	idPosition: number
	date?: string
	amount: number
	coastPerOne: number
	totalCoast: number
	company: string
}

export interface OrderList {
	idUser?: number
	idOrder: number
	orderStatus: boolean
	total?: number
	updatedAt?: Date
}

export interface Company {
	idCompany?: number
	name: string
	description?: string
	pickUpAddress: string
	phone?: string
	email?: string
}