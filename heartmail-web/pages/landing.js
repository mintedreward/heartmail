import MB from '../components/MB.js'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Layout from '../components/Layout.js'

export default function Landing () {
  return (
    <Layout>
      <Typography variant="h2" component="h2" mt={'50px'} mb={'50px'} sx={{textAlign: 'center'}}>
        Get paid
      </Typography>
      <TextField id="outlined-basic" label="Contact Fee" defaultValue="$1.00" variant="outlined" sx={{width: '100%', marginBottom: '50px', '& .MuiOutlinedInput-input': {fontSize: 60, textAlign: 'center', fontWeight: 300} }} />
      <Typography variant="h2" component="h2" mb={'50px'} sx={{textAlign: 'center'}}>
        per email
      </Typography>
      <Typography variant="p" component="p" mb="1em">
        HeartMail is email with a pay wall. Charge advertisers a contact fee to send you an email. Whitelist your friends so they don’t have to pay.
      </Typography>
      <Typography variant="p" component="p" mb="1em">
        Random heartmails are free. Custom heartmails, such as [name]@heartmail.com, cost $1.00. You can have as many heartmails as you want and you can resell heartmails for any amount of money.
      </Typography>
      <Typography variant="p" component="p" mb="1em">
        HeartMail launches July 15, 2022. An early access version will launch June 15, 2022.
        Join early to get privileged access to your custom heartmails.
        Early access users will be invited in the order they register.
      </Typography>
      <Typography variant="p" component="p" mb="1em">
        By buying early access, you agree to the Terms of Service.
      </Typography>
      <MB />
    </Layout>
  )
}
