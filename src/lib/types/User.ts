import { Model, Optional } from 'sequelize/types'

export type UserModel = Model<UserAttributes, UserRequiredAttributes>

export interface UserAttributes {
    readonly id: string
    name?: string
    email: string
    password: string
}

export type UserRequiredAttributes = Optional<UserAttributes, 'id'>
