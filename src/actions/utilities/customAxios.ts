import axios from 'axios'
import { logOutUser } from '../../redux/user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingManager } from '../../presentation'
import { Alert } from 'react-native'
import { API_URL, STORAGE_TOKEN } from './constants'

let headers = {
    
}
let axiosInstance = axios.create({
    baseURL: API_URL,
    headers,
})
axiosInstance.defaults.timeout = 1000 * 60 * 10
axiosInstance.defaults.withCredentials = true

let store:any
export const injectStore = (_store:any) => {
    store = _store
}
let isAlertDisplayed = 0;
axiosInstance.interceptors.request.use(async function (config) {
    LoadingManager.showLoading()
    // Do something before request is sent
    const token = await AsyncStorage.getItem(STORAGE_TOKEN)
    //console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    else {
        config.headers.Authorization = null
    }
    
    return config
}, function (error) {
    LoadingManager.hideLoading()
    return Promise.reject(error)
})
let refreshTokenProimise:any = null
axiosInstance.interceptors.response.use(function (response) {
    LoadingManager.hideLoading()
    isAlertDisplayed = 0
    return response
}, async (error) => {
    if(error.toJSON().message === 'Network Error'){
        Alert.alert('', 'no internet connection')
    }
    console.log('error: ', error)
    isAlertDisplayed+=1
    if (isAlertDisplayed === 1 && error?.response?.status === 401) {
        Alert.alert('','Hết phiên đăng nhập. Vui lòng đăng nhập lại!', [
            {
                text: 'Đồng ý',
                onPress: () => {
                    store.dispatch(logOutUser(false))
                }
            }
        ])
    }
    const originalConfig = error?.config
    if (error?.response?.status === 410 && !originalConfig._retry) {
        originalConfig._retry = true
        if (!refreshTokenProimise) {
            // refreshTokenProimise = refreshToken()
            //     .then((data:any) => data)
            //     .catch(() => {})
            //     .finally(() => refreshTokenProimise = null)
        }

        return refreshTokenProimise.then((data:any) => {
            if (data.stt)
                return axiosInstance(originalConfig)
            return
        })
    }
    let errorMessage = error?.message
    if (error.response?.data?.errors) {
        errorMessage = error.response?.data?.errors
    }
    if (error?.response?.status !== 410) {

    }
    LoadingManager.hideLoading()
    return Promise.reject(error)
})

export default axiosInstance