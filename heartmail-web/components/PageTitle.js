import Typography from '@mui/material/Typography'

export default function PageTitle (props) {
  return (
    <Typography variant='h2' component='h1' mt='50px' mb='50px' sx={{ textAlign: 'center' }}>
      {props.children}
    </Typography>
  )
}
