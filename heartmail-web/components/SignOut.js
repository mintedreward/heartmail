import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

export default function SignOut () {
  const router = useRouter()

  async function handleClick () {
    const res = await fetch('/api/sign-out', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    const val = await res.json()
    if (val) {
      router.push(`/`)
    }
  }

  return (
    <Button variant='contained' onClick={handleClick}>Sign out</Button>
  )
}
