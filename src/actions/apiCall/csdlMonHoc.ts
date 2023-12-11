import { PER_PAGE } from "../../constants"
import axiosInstance from "../utilities/customAxios"

// GET MONHOC
export const getMonHoc = async (data: any) => {
    try {
        const request = await axiosInstance.post(`/thuvien/csdlmh/monhoc`, data)
        return request.data
    }
    catch (error) {
        console.error(error)
    }
}

// GET MONHOC
export const getChiTieMonHoc = async (data: any) => {
    try {
        const request = await axiosInstance.post(`/thuvien/csdlmh/chitietmonhoc`, data)
        return request.data
    }
    catch (error) {
        console.error(error)
    }
}

// GET CHI TIET CHUYEN DE
export const getChiTieChuyenDe = async (data: any) => {
    try {
        const request = await axiosInstance.post(`/thuvien/csdlmh/chitietchuyende`, data)
        return request.data
    }
    catch (error) {
        console.error(error)
    }
}

export const MonHocService = {
    getMonHoc,
    getChiTieMonHoc,
    getChiTieChuyenDe
}