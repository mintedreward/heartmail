import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LinkIcon from '@mui/icons-material/Link'

export default function AffiliateCard (props) {
  const heartmail = props.heartmail
  return (
    <Card sx={{ padding: '10px', marginBottom: '10px', marginTop: '10px', cursor: 'pointer' }}>
      <Typography variant='body1' sx={{ fontSize: '18px', fontWeight: '700', color: 'primary.main' }}><LinkIcon sx={{ height: '28px', width: '28px', float: 'left', marginRight: '2px' }} />Copy affiliate link</Typography>
      <Typography variant='body2' sx={{ marginTop: '5px', marginBottom: '10px', color: 'text.secondary' }}>Earn 20% revenue of all users you refer.</Typography>
      <TextField disabled={true} variant='outlined' value={`heartmail.com/?a=${heartmail}`} sx={{ width: '100%', cursor: 'pointer', '& .MuiOutlinedInput-input': { cursor: 'pointer' } }} />
    </Card>
  )
}
