module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['nativewind/babel'],
        [
            'react-native-reanimated/plugin', {
                relativeSourceLocation: true,
            },
        ],
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '~/navigations': './src/navigations',
                    '~/screens': './src/screens',
                    '~/actions': './src/actions',
                    '~/components': './src/components',
                    '~/constants': './src/constants',
                    '~/helpers': './src/helpers',
                    '~/localization': './src/localization',
                    '~/modals': './src/modals',
                    '~/models': './src/models',
                    '~/presentation': './src/presentation',
                    '~/redux': './src/redux',
                    '~/theme': './src/theme',
                    '~/mock': './src/mock',
                },
            },
        ],
    ],
};
