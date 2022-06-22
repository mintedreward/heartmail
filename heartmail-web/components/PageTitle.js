import Typography from '@mui/material/Typography'

export default function PageTitle (props) {
  return (
    <Typography variant='h2' component='h1' mt='48px' mb='48px' sx={{ textAlign: 'center', fontWeight: '300' }}>
      {props.children}
    </Typography>
  )
}
