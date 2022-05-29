import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Link from './Link'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function ContactCardSelector (props) {
  const name = props.name
  const heartmail = props.heartmail
  const avatar = props.avatar
  const bio = props.bio
  return (
    <Card sx={{ marginBottom: '8px', marginTop: '8px' }}>
      <Box sx={{ padding: '8px' }}>
        <Avatar src={avatar} sx={{ float: 'left', width: 100, height: 100, marginRight: '8px', marginBottom: '8px' }} />
        <b>{name}</b><br />
        <Link href={`mailto:${heartmail}`}>{heartmail}</Link><br />
        <Typography variant='body1' component='span' sx={{ color: 'text.secondary' }}>{bio}</Typography>
      </Box>
      <Divider sx={{ clear: 'both' }} />
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <FormGroup>
            <FormControlLabel control={<Switch />} label='Signed in' />
          </FormGroup>
        </Box>
      </Box>
    </Card>
  )
}
