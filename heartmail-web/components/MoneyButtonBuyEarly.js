import MoneyButton from '@moneybutton/react-money-button'
// import MoneyButtonReferralNeeded from '../components/MoneyButtonReferralNeeded'

export default function MoneyButtonBuyEarly (props) {
  const affiliate = props.affiliate
  let outputs = []

  if (affiliate.hasAffiliate) {
    outputs = [
      {
        to: 'heartmail@moneybutton.com',
        amount: '8',
        currency: 'USD'
      },
      {
        to: affiliate.externalPaymail,
        amount: '2',
        currency: 'USD'
      }
    ]
  } else {
    outputs = [
      {
        to: 'heartmail@moneybutton.com',
        amount: '10',
        currency: 'USD'
      }
    ]
  }

  const handlePayment = (payment) => {
    console.log(payment); console.log(payment.amountUsd, payment.id, payment.userId, payment.senderEmail2, payment.user.email, payment.user.emailVerified)
  }

  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 300, height: 70 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 10, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <MoneyButton
            outputs={outputs}
            label='Buy Early'
            clientIdentifier='c3a2ca70156b6cdf2ce3e860ba2bef13'
            buttonId='Buy Early'
            buttonData='Buy Early'
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  )
}
