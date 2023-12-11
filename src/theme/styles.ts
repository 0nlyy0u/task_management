import { StyleSheet, Dimensions, Platform } from "react-native"
import { Theme } from "./Theme"
import { scale } from "../helpers/commonHelper"

const iIOS = Platform.OS === 'ios'
const iAndroid = Platform.OS === 'android'

export const s = StyleSheet.create({
    bgGradient: {
        borderBottomStartRadius: 35,
        overflow: 'hidden',
    },
    headerMain: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 8,
        gap: 10,
    },
    shadow: {
        backgroundColor: 'white',
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.14,
        shadowRadius: 4.27,

        elevation: 3,
    },
    shadowV1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.14,
        shadowRadius: 4.27,
        elevation: 3,
    },
    shodowMD: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    textCenter: {
        textAlign: 'center',
    },
    backButton: {
        flexBasis: 44,
        maxWidth: 44,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35
    },
    headerSearch: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 5,
        gap: 10,
    },
    boxMenuButton: {
        flexBasis: 40,
        maxWidth: 40,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35
    },
    iconSearch: {
        flexBasis: 35,
        maxWidth: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input_box: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        right: 0,
        overflow: 'hidden',
    },
    back_icon_box: {
        height: 40,
        width: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRigh: 5
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: Theme.sizes.fontBase,
    },
    textInput: {
        backgroundColor: '#fff',
        height: Theme.sizes.inputHeightLogin,
        borderWidth: 1,
        borderColor: Theme.colors.borderColor,
        borderRadius: Theme.sizes.buttonBorderRadius,
        paddingHorizontal: 10
    },
    textRequired: {
        color: Theme.colors.primaryColor
    },
    labelWidth120: {
        flexBasis: 120
    },
    inputLabel: {
        fontSize: Theme.sizes.fontH2,
        marginBottom: 5,
    },
    selectGroup: {
        flexDirection: 'row',
        gap: 15
    },
    selectItem: {
        backgroundColor: '#fff',
        flex: 1
    },
    inputGroup: {
        flexDirection: 'row',
        gap: 16
    },
    dropdown: {
        margin: 0,
        height: 44,
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: Theme.colors.borderColor,
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: Theme.sizes.buttonBorderRadius
    },
    
    placeholderStyle: {
        fontSize: Theme.sizes.fontBase,
        color: Theme.colors.gray
    },
    selectedTextStyle: {
        fontSize: Theme.sizes.fontBase,
    },
    inputSearchStyle: {},
    flexRow: {
        flexDirection: 'row'
    },
    gap10: {
        gap: 10
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    justifyStart: {
        justifyContent: 'flex-start'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    alignCenter: {
        alignItems: 'center'
    },
    alignStart: {
        alignItems: 'flex-start'
    },
    alignEnd: {
        alignItems: 'flex-end'
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: "center",
        margin: 0,
        alignItems: 'center'
    },
    mainForm: {
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    titleModal: {
        textAlign: 'center',
        fontSize: scale(16),
        color: Theme.colors.headerColor,
    },
    btnClose: {
        height: 35,
        width: 35,
        position: 'absolute',
        right: 0,
        top: -5,
        borderRadius: 25,
        backgroundColor: Theme.colors.windowBackground,
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorGray: {
        color: Theme.colors.subtitleColor
    },
    colorBlack: {
        color: Theme.colors.headerColor
    },
    fs13: {
        fontSize: scale(13)
    },
    mainSheetModal: {
        padding: 16
    }
})