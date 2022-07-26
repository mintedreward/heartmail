export default class Client {
  static async switchAccount (accountId) {
    const res = await fetch('/api/switch-account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountId })
    })
    const email = await res.json()
    return email
  }

  static async registerMbPaymail (heartmail) {
    const res = await fetch('/api/register-mb-paymail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heartmail
      })
    })
    const status = res.status
    return status === 200
  }

  static async setPrimaryHeartmail (heartmail) {
    const res = await fetch('/api/set-primary-heartmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heartmail
      })
    })
    const status = res.status
    return status === 200
  }

  static async updateAccount (account) {
    const res = await fetch('/api/update-account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account
      })
    })
    const id = await res.json()
    return id
  }

  static async buyAccount (affiliate, contactFeeUsd, payment) {
    const res = await fetch('/api/buy-account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        affiliate,
        contactFeeUsd,
        payment
      })
    })
    const status = await res.status
    return status === 200
  }

  static async signIn (payment) {
    const res = await fetch('/api/sign-in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ payment })
    })
    const status = await res.status
    return status === 200
  }

  static async signOut () {
    const res = await fetch('/api/sign-out', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    const status = await res.status
    return status === 200
  }
}
