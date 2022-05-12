import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinkIcon from '@mui/icons-material/Link'

export default function AffiliateCard (props) {
  const heartmail = props.heartmail
  return (
    <Card sx={{
      padding: '10px',
      marginBottom: '10px',
      marginTop: '10px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'primary.main'
      },
      '&:hover *': {
        color: 'white',
        borderColor: 'white'
      }
    }}>
      <Typography variant='body1' sx={{
        fontSize: '18px',
        fontWeight: '700',
        color: 'primary.main',
        overflow: 'hidden'
      }}>
        <LinkIcon sx={{ height: '28px', width: '28px', float: 'left', marginRight: '2px' }} />
        Copy affiliate link
      </Typography>
      <Typography variant='body2' sx={{
        marginTop: '5px',
        marginBottom: '10px',
        color: 'text.secondary',
        overflow: 'hidden'
      }}>
        Earn 20% revenue of all users you refer.
      </Typography>
      <Box sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '4px',
        padding: '10px',
        color: 'text.secondary',
        overflow: 'hidden'
      }}>
      heartmail.com/?a=${heartmail}
      </Box>
    </Card>
  )
}
