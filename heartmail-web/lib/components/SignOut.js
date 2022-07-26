import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Client from '../client'

export default function SignOut () {
  const router = useRouter()

  async function handleClick () {
    const success = await Client.signOut()
    if (success) {
      router.push('/')
    }
  }

  return (
    <Button variant='contained' onClick={handleClick}>Sign out</Button>
  )
}
