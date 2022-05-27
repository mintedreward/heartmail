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
    <Card sx={{ padding: '10px', marginBottom: '10px', marginTop: '10px' }}>
      <Avatar src={avatar} sx={{ float: 'left', width: 100, height: 100, marginRight: '10px' }} />
      <b>{name}</b><br />
      <Link href={`mailto:${heartmail}`}>{heartmail}</Link><br />
      <Typography variant='body1' component='span' sx={{ color: 'text.secondary' }}>{bio}</Typography>
    </Card>
  )
}
