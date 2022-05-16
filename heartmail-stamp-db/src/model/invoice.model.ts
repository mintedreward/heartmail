// TODO: implement camel case to lower case in mapping
export class Invoice {
    id?: string //A randomly generated uuid for the invoice.
    userid?: string //The bitcoin address string of the user's first key.
    receivingemail2?: string //The email2 the user is using to receive this payment.
    sendingemail2?: string //The email2 of the sender.
    conversiontime?: string //The time at which the price quote was created.
    amountsatoshis?: number //The amount to send denominated in Satoshis.
    amountusd?: number|null //The USD amount of the amountSatoshis.
    txouts?: string|null //A list of txOuts in JSON.
    createdtime?: string|null //The time the invoice was created.
    expiredtime?: string|null //There needs to be an expired time because the price quote will no longer be valid after a few minutes. There is no reason why most payments shouldn't be instant. These are not long-term invoices - these are for the sender to ask to generate an invoice immediately before sending.
    paidtime?: string|null //The time when the payment was received.
    paidtxids?: string|null //A list of txIds of the received payments.

}