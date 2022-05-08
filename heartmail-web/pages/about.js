import Layout from '../components/Layout.js'
import Typography from '@mui/material/Typography'

export default function Landing() {
  return (
    <Layout title='About'>
      <Typography variant="h2" component="h2" mt={'50px'} mb={'50px'} sx={{textAlign: 'center'}}>
        About
      </Typography>
    </Layout>
  )
}
