import { NavigationContainer } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { StatusBar } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'

import { LoadingLayout, LoadingManager } from "../presentation"

import { Provider, useDispatch } from 'react-redux'
import store, { persistor } from "../redux/store"
import { PersistGate } from "redux-persist/integration/react"
import DrawerNavigator from "./HomeDrawerNavigator"
import axiosInstance from "../actions/utilities/customAxios"

import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastLayout, { ToastManager } from "../presentation/toast/ToastLayout";
import { STORAGE_USER } from "../constants";


export default function () {
    const [user, setUser] = useState(AsyncStorage.getItem(STORAGE_USER))

    useEffect(() => {
        AsyncStorage.multiGet(["AccessToken", "User"]).then((response) => {
            const _accessToken = response[0][1];
            const _user = response[1][1];

            if (_accessToken && _user) {
                axiosInstance.defaults.headers["Authorization"] = "Bearer " + _accessToken;
                setUser(JSON.parse(_user));
            }
        })
    }, [])

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <SafeAreaProvider>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <NavigationContainer
                            theme={{
                                dark: false,
                                colors: {
                                    background: "#f8f8f8",
                                    border: "rgb(224, 224, 224)",
                                    card: "rgb(255, 255, 255)",
                                    primary: "rgb(0, 122, 255)",
                                    text: "rgb(28, 28, 30)",
                                },
                            }}
                        >
                            <DrawerNavigator />
                        </NavigationContainer>
                        <LoadingLayout ref={(ref) => LoadingManager.setLoadingView(ref)} />
                        <ToastLayout ref={(ref) => ToastManager.setToastView(ref)} />
                    </PersistGate>
                </Provider>
            </SafeAreaProvider>
        </>
    );
}
