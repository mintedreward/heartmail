import MoneyButton from '@moneybutton/react-money-button'

export default function MB () {
  const signInStatement = JSON.stringify({
    message: 'Sign into HeartMail',
    date: new Date().toJSON()
  })

  return (
    <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16, marginBottom: 16 }}>
      <div style={{ width: 280, height: 50 }}>
        <div style={{ width: 280, height: 50, padding: 0, margin: 0, backgroundColor: '#f6f6f6', borderRadius: 25 }}>
          <MoneyButton
            label='Sign in'
            clientIdentifier={process.env.NEXT_PUBLIC_MB_CLIENT_IDENTIFIER}
            buttonId='Sign in'
            buttonData='Sign in'
            cryptoOperations={[
              {
                name: 'mySignature',
                method: 'sign',
                data: signInStatement,
                encoding: 'utf8',
                key: 'identity',
                algorithm: 'bitcoin-signed-message'
              },
              {
                name: 'myPubKey',
                method: 'public-key',
                key: 'identity'
              },
              {
                name: 'myPaymail',
                method: 'paymail'
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}
