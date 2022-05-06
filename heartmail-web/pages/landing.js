import Head from 'next/head'
import styles from '../styles/Landing.module.css'
import MB from '../components/mb.js'
import NavTop from '../components/nav-top.js'
import CssBaseline from '@mui/material/CssBaseline'
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
          <meta name="description" content="Get paid per email." />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />

        <main className={styles.main}>
          <NavTop />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
          <MB />
        </main>
    </ThemeProvider>
  )
}
