/**
 * print current date: new Date().toJSON()
 *
 * select all AccessKeys
 *
 * for each AccessKey:
 *
 * - query the identity key for the MB user
 * - query the name / avatar for the MB user
 * - download the avatar at 864px for the MB user
 * - download the avatar at 288px for the MB user
 * - download the avatar at 120px for the MB user
 * - confirm total size of avatars is under 900KB
 * - if MB paymail is [alias]@moneybutton.com:
 *   - create new heartmail_address [alias]@heartmail.com
 *   - set primary_heartmail_address to the new address
 * - else:
 *   - set primary_heartmail_address to the account id
 *
 * - insert account
 * - insert mb_paymail_account
 * - if custom heartmail_address:
 *   - insert heartmail_address
 *   - insert account_heartmail_address
 * - insert account_avatar
 */
