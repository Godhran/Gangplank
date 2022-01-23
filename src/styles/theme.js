import {createTheme} from '@mui/material/styles'
import Colours from "./colours";

const Theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#000000',
            light: '#bee9fa',
        },
        secondary: {
            main: Colours.pink,
        },
        text: {
            primary: '#212121',
            secondary: '#424242',
            disabled: '#757575',
        },
        typography: {
            fontFamily: ['Noto Sans JP'].join(','),
            button: {
                fontFamily: 'Noto Sans JP',
            },
        },
    },
    overrides: {
        MuiSelect: {
        },
        // Applied to the <li> elements
        MuiMenuItem: {
            root: {
                fontSize: 12,
            },
        },
    },
})
export default Theme
