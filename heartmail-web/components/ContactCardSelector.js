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
    <Card sx={{ marginBottom: '16px', marginTop: '16px' }}>
      <Box sx={{ padding: '16px' }}>
        <Avatar src={avatar} sx={{ float: 'left', width: 96, height: 96, marginRight: '16px', marginBottom: '16px' }} />
        <b>{name}</b><br />
        <span style={{ maxWidth: 'calc(100% - 96px - 16px - 16px)', display: 'inline-block', whiteSpace: 'no-wrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><Link href={`mailto:${heartmail}`}>{heartmail}</Link></span>
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
