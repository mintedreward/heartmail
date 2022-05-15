import { Email2 } from 'stamps-email2'

export default function Email2Page() {
  const email2 = new Email2('user@example.com')

  return (
    <>
      {JSON.stringify(email2)}
    </>
  )
}
