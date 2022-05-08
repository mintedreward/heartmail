import Head from 'next/head'
import styles from '../styles/Landing.module.css'
import MB from '../components/mb.js'
import NavTop from '../components/nav-top.js'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Link from '../components/Link'

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
          <Box sx={{maxWidth: '450px', paddingLeft: '10px', paddingRight: '10px'}}>
            <Typography variant="h2" component="h2" mt={'50px'} mb={'50px'} sx={{textAlign: 'center'}}>
              Get paid
            </Typography>
            <TextField id="outlined-basic" label="Contact Fee" defaultValue="$1.00" variant="outlined" sx={{width: '100%', marginBottom: '50px', '& .MuiOutlinedInput-input': {fontSize: 60, textAlign: 'center', fontWeight: 300} }} />
            <Typography variant="h2" component="h2" mb={'50px'} sx={{textAlign: 'center'}}>
              per email
            </Typography>
            <Typography variant="p" component="p" mb="1em">
              HeartMail is email with a pay wall. Charge advertisers a contact fee to send you an email. Whitelist your friends so they don’t have to pay.
            </Typography>
            <Typography variant="p" component="p" mb="1em">
              Random heartmails are free. Custom heartmails, such as [name]@heartmail.com, cost $1.00. You can have as many heartmails as you want and you can resell heartmails for any amount of money.
            </Typography>
            <Typography variant="p" component="p" mb="1em">
              HeartMail launches July 15, 2022. An early access version will launch June 15, 2022.
              Join early to get privileged access to your custom heartmails.
              Early access users will be invited in the order they register.
            </Typography>
            <Typography variant="p" component="p" mb="1em">
              By buying early access, you agree to the Terms of Service.
            </Typography>
            <MB />
            <Box alignItems="center" mt="50px" mb="50px" sx={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="p" component="span">
                &copy; 2022 <Link href='/about'>HeartMail Inc.</Link> · Privacy · Terms
              </Typography>
            </Box>
          </Box>
        </main>
    </ThemeProvider>
  )
}
