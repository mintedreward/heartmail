import MoneyButton from '@moneybutton/react-money-button'

export default function MB () {
  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 300, height: 70 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 10, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <MoneyButton
            to='heartmail@moneybutton.com'
            amount='1'
            currency='USD'
            label='Buy Early'
            clientIdentifier='c3a2ca70156b6cdf2ce3e860ba2bef13'
            buttonId='1652432564118'
            buttonData='{}'
            onPayment={(payment) => { console.log(payment); console.log(payment.amountUsd, payment.id, payment.userId, payment.senderPaymail, payment.user.email, payment.user.emailVerified) }}
          />
        </div>
      </div>
    </div>
  )
}