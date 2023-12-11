import { PER_PAGE } from "../../constants"
import axiosInstance from "../utilities/customAxios"

// GET LIST NEWS
export const getDanhSachTin = async (data) => {
    try {
        const request = await axiosInstance.post(`/thuvien/tintuc/danhsachtintuc`, data)
        return request.data
    }
    catch (error) {
        console.error(error)
    }
}

// GET DETAIL NEWS
export const getChiTietTin = async (id) => {
    try {
        const request = await axiosInstance.post(`/thuvien/tintuc/chitiettintuc`, { tintucId: id })
        return request.data
    }
    catch (error) {
        console.error(error)
    }
}

// GET LIST CATEGORIES
export const getNhomTinTuc = async () => {
    try {
        const request = await axiosInstance.get(`/thuvien/tintuc/nhomtintuc`)
        return request.data
    }
    catch (error) {
        console.error(error)
    }
}

export const NewsService = {
    getNhomTinTuc,
    getDanhSachTin,
    getChiTietTin
}