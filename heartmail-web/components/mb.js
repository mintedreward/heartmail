import MoneyButton from '@moneybutton/react-money-button'

export default function MB () {
  return (
    <div style={{width: 300, height: 70}}>
      <div style={{width: 290, height: 60, padding: 4, margin: 5, backgroundColor: '#f6f6f6', borderRadius: 30, border: '1px solid #66ACE2'}}>
        <MoneyButton
          to='heartmail@moneybutton.com'
          amount='1'
          currency='USD'
          label='Like'
          onPayment={(payment) => {console.log(payment); console.log(payment.amountUsd, payment.id, payment.userId, payment.senderPaymail, payment.user.email, payment.user.emailVerified)}}
        />
      </div>
    </div>
  )
}
