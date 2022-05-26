import MoneyButton from '@moneybutton/react-money-button'

export default function MB () {
  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 300, height: 70 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 10, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <MoneyButton
            to='heartmail@moneybutton.com'
            amount='100'
            currency='USD'
            label='Tip'
            buttonData='MoneyButtonTip'
          />
        </div>
      </div>
    </div>
  )
}
