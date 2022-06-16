/**
 * print current date: new Date().toJSON()
 *
 * select all MbAccounts
 *
 * for each MbAccount:
 *
 * - query the identity key for the MB user
 * - query the name / avatar for the MB user
 * - query the userId fro the MB user
 * - download the avatar at 864px for the MB user
 * - download the avatar at 288px for the MB user
 * - download the avatar at 120px for the MB user
 * - confirm total size of avatars is under 900KB
 * - if MB paymail is [alias]@moneybutton.com:
 *   - create new heartmail [alias]@heartmail.com
 *   - set primary_heartmail to the new address
 * - else:
 *   - set primary_heartmail to the account id
 *
 * - insert account
 * - insert mb_paymail_account
 * - if custom heartmail:
 *   - insert heartmail
 *   - insert account_heartmail
 * - insert account_avatar
 */
