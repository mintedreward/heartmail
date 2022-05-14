import Head from 'next/head'
import NavTop from '../components/NavTop'
import Link from '../components/Link'
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

export default function Layout (props) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{props.title ? `HeartMail: ${props.title}` : 'HeartMail'}</title>
        <meta name='description' content='Get paid for email.' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <CssBaseline />

      <Box sx={{
        padding: 0,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      >
        <NavTop />
        <Box sx={{
          maxWidth: '450px',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
        >
          {props.children}
          <Box sx={{
            width: '100%',
            marginTop: '50px',
            marginBottom: '50px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          >
            <Typography variant='p' sx={{ textAlign: 'center' }}>
              &copy; 2022 <Link href='/'>HeartMail</Link> Inc.<br />
              <Link href='/about'>About</Link> · <Link href='/terms'>Terms</Link> · <Link href='/privacy'>Privacy</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
