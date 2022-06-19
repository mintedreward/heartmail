import { getClient } from '../connect.mjs'
import { Struct } from 'heartmail-lib'
import MbPayment from '../structs/mb-payment.mjs'
import cassandra from 'cassandra-driver'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

export default class DbMbPayment extends Struct {
  constructor (mbPayment) {
    super({ mbPayment })
  }

  fromRandom () {
    this.mbPayment = MbPayment.fromRandom()
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  create (obj) {
    this.fromRandom()
    this.mbPayment.fromObject(obj)
    return this
  }

  static create (obj) {
    return new this().create(obj)
  }

  fromCassandraObject (obj) {
    this.mbPayment = MbPayment.fromObject({
      mbPaymentId: obj.mb_payment_id,
      mbPaymentStr: obj.mb_payment_str,
      createdAt: obj.created_at,
      updatedAt: obj.updated_at
    })
    return this
  }

  toCassandraObject () {
    return {
      mb_payment_id: this.mbPayment.mbPaymentId,
      mb_payment_str: this.mbPayment.mbPaymentStr,
      created_at: this.mbPayment.createdAt,
      updated_at: this.mbPayment.updatedAt
    }
  }

  static async findAll () {
    const query = `select * from ${keyspace}.mb_payments`
    const values = []

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const dbMbPayments = []

    for (const row of res) {
      const dbMbPayment = new this().fromCassandraObject(row)
      dbMbPayments.push(dbMbPayment)
    }

    return dbMbPayments
  }

  async findOne () {
    const query = `select * from ${keyspace}.mb_payments where mb_payment_id = ?`
    const values = [this.mbPayment.mbPaymentId]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = res.first()

    if (row) {
      this.fromCassandraObject(row)
    } else {
      this.mbPayment = null
    }

    return this
  }

  static async findOne (id) {
    return new this(new MbPayment(id)).findOne()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.mb_payments (mb_payment_id, mb_payment_str, created_at, updated_at) values (?, ?, ?, ?)`
    const values = [obj.mb_payment_id, obj.mb_payment_str, obj.created_at, obj.updated_at]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }
}
