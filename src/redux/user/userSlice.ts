import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_TOKEN, STORAGE_USER } from '../../constants'

type InitStateProps = {
    user: any
    isLoggedIn: boolean
}

//Khởi tạo giá trị slice trong redux
const initialState: InitStateProps = {
    user: null,
    isLoggedIn: false,
}
// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// createAsyncThunk là middleware
// https://redux-toolkit.js.org/api/createAsyncThunk
export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',
    async (data:any) => {
        return null
    }
)

//Khởi tạo một slice trong redux store
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
        // https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
        setUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
        logOutUser: (state, action) => {
            AsyncStorage.multiRemove([STORAGE_TOKEN, STORAGE_USER]);
            state.user = null
            state.isLoggedIn = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            let user = action.payload // Chính là request.data trên loginUserAPI
            state.user = user
            state.isLoggedIn = true
        })
    }
})

// Action creators are generated for each case reducer function
// Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { setUser, logOutUser, updateUser } = userSlice.actions

// Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const getUser = (state: {user:InitStateProps}) => {
    return state.user
}
export const getIsLoggedIn = (state: {user:InitStateProps}) => {
    return state.user.isLoggedIn
}

export default userSlice.reducer
