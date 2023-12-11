import React from "react"

import { Theme } from "../theme"
import NavigationNames from "./NavigationNames"
import { StackNavigationOptions } from "@react-navigation/stack"
import { ParamListBase, RouteProp } from "@react-navigation/native"
import { IconHome, Tabbar_GhiMuon, Tabbar_GhiTra, Tabbar_IconAccount } from "../constants"
import { Text } from "../components"
import { isTablet } from "react-native-device-info"

export const getTabTitle = (route: RouteProp<ParamListBase>, focused: boolean, color: string) => {
    switch (route.name) {
        case NavigationNames.GhiTraTab:
            return (
                <Text style={{ color: color, fontSize: isTablet() ? Theme.sizes.fontBase : Theme.sizes.fontTiny }}>Liên hệ</Text>
            )
            break;
        case NavigationNames.HomeTab:
            return (
                <Text style={{ color: color, fontSize: isTablet() ? Theme.sizes.fontBase : Theme.sizes.fontTiny }}>Trang chủ</Text>
            )
            break;
        case NavigationNames.ProfileTab:
            return (
                <Text style={{ color: color, fontSize: isTablet() ? Theme.sizes.fontBase : Theme.sizes.fontTiny }}>Tài khoản</Text>
            )
            break;
        case NavigationNames.GhiMuonTab:
            return (
                <Text style={{ color: color, fontSize: isTablet() ? Theme.sizes.fontBase : Theme.sizes.fontTiny }}>Hỗ trợ</Text>
            )
            break;
        default:
            break;
    }
}

export const tabScreenOptions = (route: RouteProp<ParamListBase, keyof ParamListBase>, focused: boolean, color: string, size: number = 28) => {
    let icon
    switch (route.name) {
        case NavigationNames.GhiTraTab:
            icon = <Tabbar_GhiTra height={24} width={24} color={color} />
            break
        case NavigationNames.HomeTab:
            icon = <IconHome height={24} width={24} color={color} />
            break
        case NavigationNames.ProfileTab:
            icon =  <Tabbar_IconAccount height={24} width={24} color={color} />
            break
        case NavigationNames.GhiMuonTab:
            icon = <Tabbar_GhiMuon height={24} width={24} color={color} />
            break
    }
    return icon
}

export const stackScreenOptions: StackNavigationOptions = {
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerTintColor: Theme.colors.primaryColor,
}
