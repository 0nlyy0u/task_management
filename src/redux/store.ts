import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'], // định nghĩa các slice được phép duy trì qua mỗi lần f5 trình duyệt
    // blacklist: ['activeBoard'] //định nghĩa các slice không được phép duy trì qua mỗi lần f5 trình duyệt
}

const rootReducer = combineReducers({
    user: userSlice
})

const persistedReducers = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store