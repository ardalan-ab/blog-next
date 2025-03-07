import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#181C14',
        },
        background: {
            default: '#181C14',
            paper: '#255F38'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#A9A9A9'
        }
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
         
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
           
        },
    },
});

export default theme;
