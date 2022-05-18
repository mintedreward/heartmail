import DbKey from './db-key.mjs'

export default class DbAccount extends DbKey {
  constructor (...args) {
    super(...args)
    this.typeStr = 'account'
  }

  fromJSON (json) {
    super.fromObject(json)
  }

  fromProperties (accessGrantedAt, ownerEmailAddress, paymentEmailAddress, affiliateKeyAlias, contactFeeAmountUsd) {
    const obj = {
      accessGrantedAt,
      ownerEmailAddress,
      paymentEmailAddress,
      affiliateKeyAlias: affiliateKeyAlias.toString(),
      contactFeeAmountUsd
    }
    const objStr = JSON.stringify(obj)
    const objBuf = Buffer.from(objStr)
    this.dataBuf = objBuf
    return this
  }
}

/*
-create table if not exists heartmail.accounts (
-    keyAlias text,
-    accessGrantedAt timestamp,
-    ownerEmailAddress text,
-    paymentEmailAddress text,
-    affiliateKeyAlias text,
-    contactFeeAmountUsd float,
-    createdAt timestamp,
-    updatedAt timestamp,
-    primary key (keyAlias)
-);
*/
