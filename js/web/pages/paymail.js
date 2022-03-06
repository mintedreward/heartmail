import { Paymail } from '@openspv/paymail'

export default function PaymailPage() {
  const paymail = new Paymail('user@example.com')

  return (
    <>
      {JSON.stringify(paymail)}
    </>
  )
}
