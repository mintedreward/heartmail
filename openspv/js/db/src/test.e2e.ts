// a demo to insert a record into sbw invoice table
// follow setup instructions in readme
// run with `yarn start`

import { CassandraService } from "./cassandra/cassandra.service";
import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "./model/invoice.model";
import { v4 as uuid } from 'uuid';
import 'dotenv/config'

const cassandraService = new CassandraService()
const repo = new InvoiceRepository(cassandraService)
repo.onModuleInit()

const now = new Date()
const invoice:Invoice = {
  id: uuid(),
  userid: "someuser",
  receivingpaymail: "someone@sbw.com",
  sendingpaymail: "from@catn8.net",
  conversiontime: now.toISOString(),
  amountsatoshis: 1000,
  amountusd: null,
  txouts:null,
  createdtime:null,
  expiredtime:null,
  paidtime: now.toISOString(),
  paidtxids: null
};

(async () => {
    // add a test invoice to the db
    await repo.createInvoice( invoice )
    // show all the invoices
    const allInvoices = await repo.getInvoices()
    console.log(`ALL INVOICES`, allInvoices)
    console.log(`LATEST INVOICE COUNT`, allInvoices.length)
})()

