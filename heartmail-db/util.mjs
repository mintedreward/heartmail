import DbAccount from './models/db-account.mjs'

export async function getAffiliate (affiliateEmail = '') {
  if (affiliateEmail) {
    affiliateEmail = `${affiliateEmail}`
    const shortId = affiliateEmail.split('@')[0]
    const dbAccount = await DbAccount.findOneByShortId(shortId)
    if (dbAccount) {
      return {
        hasAffiliate: true,
        affiliateLongId: dbAccount.keyAlias.toLongId(),
        affiliatePaymail: dbAccount.externalPaymail
      }
    }
  }
  return {
    hasAffiliate: false,
    affiliateLongId: '',
    affiliatePaymail: ''
  }
}
