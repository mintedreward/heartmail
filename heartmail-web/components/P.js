import Typography from '@mui/material/Typography'

export default function P (props) {
  return (
    <Typography variant="p" component="p" mb="1em">
      {props.children}
    </Typography>
  )
}
