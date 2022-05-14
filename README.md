# HeartMail

<img src='./heartmail-landscape.png' alt='BeTheBroadcast' width='800'>

HeartMail master repo.

## Database

Keys
id | address | pubkey | privkey | type ("account") | created_date

Accounts
key_id | access_granted_date | external_email | external_paymail | affiliate_key_id

ExternalEmails
email | verified_date

ExternalPaymails
paymail | verified_date

MbInvoices
key_id | mb_client_identifier | mb_button_id | mb_button_data | mb_amount_usd | mb_to_heartmail_paymail | mb_to_heartmail_amount | mb_to_heartmail_currency | mb_to_affiliate_paymail | mb_to_affiliate_amount | mb_to_affiliate_currency | mb_user_email | mb_user_email_verified | mb_user_paymail | mb_user_id | mb_txid | mb_payment_id | mb_payment

## Redirects: www and HTTPS

Our redirect policy is:

- [name].com redirects to www.[name].com
- http://[name].com redirects to https://[name].com

This works by:

- AWS instances ([name]-redirect) are used to add www
- An AWS load balancer rewrites http traffic to https

## Central Points of Failure

All central points of failure should be eliminated over time, including
ourselves. We do not want the failure of one part of the system to create
cascading failures. Any part should be able to be removed and the system should
keep functioning.

* Domain names (AWS)
* Cloud (AWS)
* Email (Google)
* Docker Registry (Docker Hub)
* NPM Registry (NPM)

Copyright (c) 2022 HeartMail Inc. All rights reserved.
