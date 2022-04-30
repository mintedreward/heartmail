import MoneyButton from '@moneybutton/react-money-button'

export default function MB () {
  return (
    <div style={{width: 300, height: 70}}>
      <div style={{width: 290, height: 60, padding: 5, margin: 5, backgroundColor: '#66ace2', borderRadius: 30}}>
        <MoneyButton
          to='heartmail@moneybutton.com'
          amount='1'
          currency='USD'
          label='Early Access'
          onPayment={(payment) => {console.log(payment); console.log(payment.amountUsd, payment.id, payment.userId, payment.senderPaymail, payment.user.email, payment.user.emailVerified)}}
        />
      </div>
    </div>
  )
}
