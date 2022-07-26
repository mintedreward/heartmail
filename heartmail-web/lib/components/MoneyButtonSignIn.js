import MoneyButton from '@moneybutton/react-money-button'
import { useRouter } from 'next/router'
import Client from '../client'

export default function MoneyButtonSignIn (props) {
  const router = useRouter()

  const handlePayment = async (payment) => {
    const success = await Client.signIn(payment)
    if (success) {
      router.push('/accounts')
    }
  }

  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
      <div style={{ width: 280, height: 50 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 0, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <MoneyButton
            label='Sign In'
            clientIdentifier={process.env.NEXT_PUBLIC_MB_CLIENT_IDENTIFIER}
            buttonId='Sign In'
            buttonData='Sign In'
            to={process.env.NEXT_PUBLIC_HEARTMAIL_PAYMAIL}
            amount='0.01'
            currency='USD'
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  )
}
