import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { LoginScreen, RegisterScreen, ForgotPassword } from "../screens";
import NavigationNames from "./NavigationNames";
import { Theme } from "../theme";

const RootStack = createStackNavigator();

export default function () {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: true,
                headerMode: "screen",
                headerBackTitleVisible: false,
                headerTintColor: 'black',
                headerShadowVisible: false
            }}
        >
            <RootStack.Screen
                name={NavigationNames.LoginScreen}
                component={LoginScreen}
                options={{
                    title: '',
                    headerLeftContainerStyle: {
                        left: 10
                    }
                }}
            />
            <RootStack.Screen
                name={NavigationNames.RegisterScreen}
                component={RegisterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name={NavigationNames.ForgotPassword}
                component={ForgotPassword}
                options={{
                    title: 'Quên mật khẩu',
                    headerTitleStyle: {
                        color: Theme.colors.primaryColor,
                    },
                    headerTitleAlign: 'center',
                    headerLeftContainerStyle: {
                        left: 10
                    }
                }}
            />
        </RootStack.Navigator>
    )
}
