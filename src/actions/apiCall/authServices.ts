import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRegisterParams, UserUpdateParams, UserLoginParams, UserMemberType } from "../../models";
import { STORAGE_TOKEN, STORAGE_USER } from "../../constants";
import { ToastManager } from "../../presentation/toast";
import { LoadingManager } from "../../presentation";
import axiosInstance from '../utilities/customAxios';

type token = {
    accessToken: string
}

type ResponseApi = {
    data: User,
    messageCode: number,
    messageText: string
}

interface Rarams {
    email: string
    otp: string
    password: string
}

type imageFile = {
    FileName: string
    FileBase64: string
}

interface LoginProps {
    messageCode: number
    messageText: string
    data: User[]
}

const loadUser = async ():Promise<ResponseApi> =>  {
    try {
        const result = await axiosInstance.get(`/usrMember/getUsrMember`)
        if (result.data.messageCode !== 1) {
            await AsyncStorage.removeItem(STORAGE_TOKEN)
            return Promise.reject(Error(result.data.messageText))
        }
        //console.log('user: ', user)
        await AsyncStorage.setItem(STORAGE_USER, JSON.stringify(result.data.data))
        return Promise.resolve(result.data);
    }
    catch (error) {
        return Promise.reject(error);
    }
}

const login = async (data: UserLoginParams): Promise<LoginProps> => {
    try {
        const result = await axiosInstance.post(`/thuvien/bandoc/login`, data)
        
        if (result.data.messageCode === 1 && result.data.token) {
            await AsyncStorage.multiSet([
                [STORAGE_TOKEN, result.data.accessToken],
            ])
        }
        
        //let user = await loadUser()
        return Promise.resolve(result.data)
    } catch (error) {
        return Promise.reject(error);
    }
};

const register = async (data: UserRegisterParams): Promise<ResponseApi> => {
    try {
        const result = await axiosInstance.post("/usrMember/insUsrMember", data);
        if (result?.data?.messageCode !== 1) {
            return Promise.reject(Error(result.data.messageText));
        }
        return Promise.resolve(result.data);
    } catch (error:any) {
        if (error?.response?.status === 401) {
            return Promise.reject({
                messageCode: 2,
                messageText: 'Hết hạn token, vui lòng đăng nhập lại',
                data: []
            })
        }
        else {
            return Promise.reject(error);
        }
    }
};


const updateProfile = async (data:UserUpdateParams): Promise<User>  => {
    try {
        const result = await axiosInstance.post(`/usrMember/updUsrMember`, data)
        if (result?.data?.error) {
            return Promise.reject(Error(result.data.error.message))
        }
        let user = await loadUser()
        return Promise.resolve(user.data)
    } catch (error:any) {
        if (error?.response?.status === 401) {
            return Promise.reject({
                messageCode: 2,
                messageText: 'Hết hạn token, vui lòng đăng nhập lại',
                data: []
            })
        }
        else {
            return Promise.reject(error);
        }
    }
}

const updateProfileImage = async (fileImg: imageFile): Promise<ResponseApi> => {
    try {
        const result = await axiosInstance.post("/usrMember/updUsrMemberByImage", fileImg);
        if (result?.data?.error) {
            return Promise.reject(Error(result.data.error.message));
        }
        return Promise.resolve(result.data);
    } catch (error:any) {
        console.log('error: ', error)
        if (error?.response?.status === 401) {
            return Promise.reject({
                messageCode: 2,
                messageText: 'Hết hạn token, vui lòng đăng nhập lại',
                data: []
            })
        }
        else {
            return Promise.reject(error);
        }
    }
};

const forgetPassword = async (data:string): Promise<ResponseApi>  => {
    try {
        const result = await axiosInstance.post(`/usrMember/forgotPasswordByVerifyCodeGet`, {language: 1, email: data})
        if (result?.data?.error) {
            return Promise.reject(Error(result.data.error.message))
        }
        return Promise.resolve(result.data)
    } catch (error) {
        return Promise.reject(error);
    }
}
const verifyCodeCheck = async (data:string): Promise<ResponseApi>  => {
    try {
        const result = await axiosInstance.post(`/usrMember/forgotPasswordByVerifyCodeCheck`, {language: 1, verifyCode: data})
        if (result?.data?.error) {
            return Promise.reject(Error(result.data.error.message))
        }
        return Promise.resolve(result.data)
    } catch (error) {
        return Promise.reject(error);
    }
}
const resetPassword = async (data:Rarams): Promise<ResponseApi>  => {
    try {
        const result = await axiosInstance.post(`/usrMember/forgotPasswordByChangePassword`, {language: 1, email: data.email, verifyCode: data.otp, password: data.password})
        if (result?.data?.error) {
            return Promise.reject(Error(result.data.error.message))
        }
        return Promise.resolve(result.data)
    } catch (error) {
        return Promise.reject(error);
    }
}

const getMemberType = async (): Promise<UserMemberType[]> => {
    try {
        const result = await axiosInstance.get("/catCategory/catMemberType");
        return Promise.resolve(result.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

const changePassword = async (data:{password: string}): Promise<ResponseApi> => {
    try {
        const result = await axiosInstance.post("/usrMember/updUsrMemberByChangePassword", data)
        return Promise.resolve(result.data)
    } catch (error:any) {
        if (error?.response?.status === 401) {
            return Promise.reject({
                messageCode: 2,
                messageText: 'Hết hạn token, vui lòng đăng nhập lại',
                data: []
            })
        }
        else {
            return Promise.reject(error);
        }
    }
};

export const AuthServices = {
    loadUser,
    login,
    register,
    updateProfile,
    updateProfileImage,
    forgetPassword,
    verifyCodeCheck,
    resetPassword,
    getMemberType,
    changePassword
}
