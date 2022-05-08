import Head from 'next/head'
import styles from '../styles/Landing.module.css'
import MB from '../components/mb.js'
import NavTop from '../components/nav-top.js'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#66ace2',
      light: '#94c6eb',
      dark: '#4c80a8',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#a896f8',
      light: '#ddcffc',
      dark: '#857cd1',
      contrastText: '#ffffff'
    },
    error: {
      main: '#e14546',
      light: '#ea7c7d',
      dark: '#a73334',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#ddaa4a',
      light: '#e7c380',
      dark: '#a47e37',
      contrastText: '#ffffff'
    },
    info: {
      main: '#738bcb',
      light: '#9daedb',
      dark: '#566797',
      contrastText: '#ffffff'
    },
    success: {
      main: '#93bd6a',
      light: '#b3d196',
      dark: '#6d8c4f',
      contrastText: '#ffffff'
    }
  }
})

export default function Landing() {
  return (
    <ThemeProvider theme={theme}>
        <Head>
          <title>HeartMail</title>
          <meta name="description" content="Get paid for email." />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />

        <main className={styles.main}>
          <NavTop />
          <Typography variant="h2" component="h2" mt={'50px'} mb={'50px'}>
            Get paid
          </Typography>
          <Typography variant="h2" component="h2" mb={'50px'}>
            $1.00
          </Typography>
          <Typography variant="h2" component="h2" mb={'50px'}>
            per email
          </Typography>
          <MB />
        </main>
    </ThemeProvider>
  )
}
