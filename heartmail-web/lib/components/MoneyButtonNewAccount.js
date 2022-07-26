import MoneyButton from '@moneybutton/react-money-button'
import { useRouter } from 'next/router'
import Client from '../client'

export default function MoneyButtonNewAccount (props) {
  const router = useRouter()
  const affiliate = props.affiliate || null
  const contactFeeUsd = props.contactFeeUsd || 1.00
  let outputs = []

  if (affiliate?.hasAffiliate) {
    outputs = [
      {
        to: process.env.NEXT_PUBLIC_HEARTMAIL_PAYMAIL,
        amount: '8',
        currency: 'USD'
      },
      {
        to: affiliate.mbPaymail,
        amount: '2',
        currency: 'USD'
      }
    ]
  } else {
    outputs = [
      {
        to: process.env.NEXT_PUBLIC_HEARTMAIL_PAYMAIL,
        amount: '10',
        currency: 'USD'
      }
    ]
  }

  const handlePayment = async (payment) => {
    const success = await Client.buyAccount(affiliate, contactFeeUsd, payment)
    if (success) {
      router.push('/accounts')
    }
    props.onPayment?.(payment)
  }

  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
      <div style={{ width: 280, height: 50 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 0, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <MoneyButton
            outputs={outputs}
            label='New Account'
            clientIdentifier={process.env.NEXT_PUBLIC_MB_CLIENT_IDENTIFIER}
            buttonId='New Account'
            buttonData='New Account'
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  )
}
