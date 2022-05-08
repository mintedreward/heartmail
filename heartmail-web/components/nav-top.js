import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'

export default function NavTop () {
  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ alignItems: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Image src="/heartmail-small.png" alt="HeartMail: Get paid for email." width="151.67" height="26" />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}