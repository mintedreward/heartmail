import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import MB from '../components/mb.js'
import MyAppBar from '../components/app-bar.js'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
          <Box sx={{ width: '100%', flexGrow: 1 }}>
            <AppBar position="fixed">
              <Toolbar>
                <Box sx={{ alignItems: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Image src="/heartmail-small.png" alt="HeartMail: Love your neighbor as you love yourself." width="152" height="26" />
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
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
