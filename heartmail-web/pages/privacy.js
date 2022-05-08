import Layout from '../components/Layout.js'
import Typography from '@mui/material/Typography'

export default function Landing() {
  return (
    <Layout title='Privacy Policy'>
      <Typography variant="h2" component="h2" mt={'50px'} mb={'50px'} sx={{textAlign: 'center'}}>
        Privacy Policy
      </Typography>
    </Layout>
  )
}
