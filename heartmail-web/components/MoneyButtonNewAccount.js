import MoneyButton from '@moneybutton/react-money-button'
// import MoneyButtonReferralNeeded from '../components/MoneyButtonReferralNeeded'

export default function MoneyButtonNewAccount (props) {
  const onPayment = props.onPayment || function () {}
  const affiliate = props.affiliate
  let outputs = []

  if (affiliate && affiliate.hasAffiliate) {
    outputs = [
      {
        to: 'heartmail@moneybutton.com',
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
        to: 'heartmail@moneybutton.com',
        amount: '10',
        currency: 'USD'
      }
    ]
  }

  const handlePayment = (payment) => {
    onPayment(payment)
  }

  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 300, height: 70 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 10, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <MoneyButton
            outputs={outputs}
            label='New Account'
            clientIdentifier='c3a2ca70156b6cdf2ce3e860ba2bef13'
            buttonId='New Account'
            buttonData='New Account'
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  )
}
