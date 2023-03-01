export interface IFormRegister {
    email: string
    name: string
    password: string
    confirmPassword: string
    isCompany: number | boolean
}

export interface AuthRegisterRequest extends IFormRegister {

}

export interface IFormLogin {
    email: string
    password: string
}