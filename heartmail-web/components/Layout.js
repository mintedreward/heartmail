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
  const title = props.title ? `HeartMail: ${props.title}` : 'HeartMail'
  const account = props.account

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Get paid for email.' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content='HeartMail is email with a pay wall. Charge advertisers a contact fee to send you an email. Add your friends so they don&#8217;t have to pay.' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='/heartmail-og-preview.png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:locale' content='en_US' />
      </Head>
      <CssBaseline />

      <Box sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        width: '100%'
      }}
      >
        <Box sx={{
          padding: 0
        }}
        >
          <NavTop account={account} />
          <Box sx={{
            maxWidth: '500px',
            paddingLeft: '8px',
            paddingRight: '8px',
            margin: '0 auto'
          }}
          >
            {props.children}
            <Box sx={{
              width: '100%',
              paddingTop: '48px',
              paddingBottom: '48px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            >
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                &copy; {new Date().getFullYear()} HeartMail Inc.<br />
                <Link href='/about'>About</Link> · <Link href='/terms'>Terms</Link> · <Link href='/privacy'>Privacy</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
