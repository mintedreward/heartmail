import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Link from '../components/Link'
import Typography from '@mui/material/Typography'

export default function ContactCard (props) {
  const name = props.name
  const heartmail = props.heartmail
  const avatar = props.avatar
  const bio = props.bio
  return (
    <Card sx={{ padding: '16px', marginBottom: '8px', marginTop: '8px' }}>
      <Avatar src={avatar} sx={{ float: 'left', width: 96, height: 96, marginRight: '16px' }} />
      <b>{name}</b><br />
      <Link href={`mailto:${heartmail}`}>{heartmail}</Link><br />
      <Typography variant='body1' component='span' sx={{ color: 'text.secondary' }}>{bio}</Typography>
    </Card>
  )
}
