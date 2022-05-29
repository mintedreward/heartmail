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
    <Card sx={{ marginBottom: '10px', marginTop: '10px' }}>
      <Box sx={{ padding: '10px' }}>
        <Avatar src={avatar} sx={{ float: 'left', width: 100, height: 100, marginRight: '10px', marginBottom: '10px' }} />
        <b>{name}</b><br />
        <Link href={`mailto:${heartmail}`}>{heartmail}</Link><br />
        <Typography variant='body1' component='span' sx={{ color: 'text.secondary' }}>{bio}</Typography>
      </Box>
      <Divider sx={{ clear: 'both' }} />
      <FormGroup>
        <FormControlLabel control={<Switch sx={{ marginLeft: '10px' }} />} label='Signed in as' />
      </FormGroup>
    </Card>
  )
}
