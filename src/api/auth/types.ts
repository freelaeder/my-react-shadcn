
export interface Role {
    id: string
    name: string
    description: string
}

export interface UserRes {
    id: string
    username: string
    name: string
    phoneNumber: string
    email: string
    blocked: boolean
    roles: Array<Role>
    regionId: number
    whetherRegister: boolean
    parent: string
    level: number
}

export enum AuthTypeEnum {
    USERNAME_PASSWORD = 'USERNAME_PASSWORD',
    PHONE_NUMBER_PASSWORD = 'PHONE_NUMBER_PASSWORD',
    PHONE_NUMBER_VERIFICATION_CODE = 'PHONE_NUMBER_VERIFICATION_CODE'
}
