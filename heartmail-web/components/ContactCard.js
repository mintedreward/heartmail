import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Link from '../components/Link'
import Typography from '@mui/material/Typography'

export default function ContactCard (props) {
  const name = props.name
  const heartmail = props.heartmail
  const bio = props.bio
  const avatar = props.avatar || '/anonymous-avatar-288.jpg'
  return (
    <Card sx={{ padding: '16px', marginBottom: '8px', marginTop: '8px' }}>
      <Avatar src={avatar} sx={{ float: 'left', width: 96, height: 96, marginRight: '16px' }} />
      <b>{name}</b><br />
      <span style={{ maxWidth: 'calc(100% - 96px - 16px)', display: 'inline-block', whiteSpace: 'no-wrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '-6px' }}><Link href={`mailto:${heartmail}`}>{heartmail}</Link></span><br />
      <Typography variant='body1' component='span' sx={{ color: 'text.secondary' }}>{bio}</Typography>
    </Card>
  )
}
