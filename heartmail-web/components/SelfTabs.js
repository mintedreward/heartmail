import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

export default function SelfTabs (props = { value: 0 }) {
  const router = useRouter()
  const value = props.value ? props.value : 0

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      router.push('/accounts')
    } else if (newValue === 1) {
      router.push('/addresses')
    } else if (newValue === 2) {
      router.push('/settings')
    }
  }
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='Accounts' />
        <Tab label='Addresses' />
        <Tab label='Settings' />
      </Tabs>
    </Box>
  )
}
