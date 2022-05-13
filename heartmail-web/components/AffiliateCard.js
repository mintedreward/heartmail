import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinkIcon from '@mui/icons-material/Link'
import * as React from 'react'

export default function AffiliateCard (props) {
  const [show, setShow] = React.useState(false)

  const heartmail = props.heartmail
  const affiliateUrl = `${process.env.NEXT_PUBLIC_URL}/?a=${heartmail}`

  const handleClick = (event) => {
    setShow(true)
    navigator.clipboard.writeText(affiliateUrl)
    setTimeout(() => { setShow(false) }, 2000)
  }

  return (
    <Card
      onClick={handleClick} sx={{
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
        },
        position: 'relative'
      }}
    >
      <Typography
        variant='body1' sx={{
          fontSize: '18px',
          fontWeight: '700',
          color: 'primary.main',
          overflow: 'hidden'
        }}
      >
        <LinkIcon sx={{ height: '28px', width: '28px', float: 'left', marginRight: '2px' }} />
        Copy affiliate link
      </Typography>
      <Typography
        variant='body2' sx={{
          marginTop: '5px',
          marginBottom: '10px',
          color: 'text.secondary',
          overflow: 'hidden'
        }}
      >
        Earn 20% revenue of all users you refer.
      </Typography>
      <Box sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '4px',
        padding: '10px',
        color: 'text.secondary',
        overflow: 'hidden'
      }}
      >
        heartmail.com/?a={heartmail}
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: show ? 1 : 0,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '40px'
      }}
      >
        <Box>
          <Typography
            variant='body1' sx={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              overflow: 'hidden'
            }}
          >
            <LinkIcon sx={{ height: '28px', width: '28px', float: 'left', marginRight: '2px' }} />
            Copied link
          </Typography>
          <Typography
            variant='body2' sx={{
              color: 'white',
              marginLeft: '5px'
            }}
          >
            Invite your friends.
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}
