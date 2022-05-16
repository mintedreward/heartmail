// import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Invoice } from './model/invoice.model';
import { CassandraService } from './cassandra/cassandra.service';

// @Injectable()
//implements OnModuleInit
export class InvoiceRepository {
    invoiceMapper?: mapping.ModelMapper<Invoice>;

    constructor(private cassandraService: CassandraService) { }

    onModuleInit() {
        const mappingOptions: mapping.MappingOptions = {
            models: {
                'Invoice': {
                    tables: ['invoices'],
                    mappings: new mapping.UnderscoreCqlToCamelCaseMappings
                }
            }
        }
        this.invoiceMapper = this.cassandraService.createMapper(mappingOptions)?.forModel('Invoice');
    }

    async getInvoices() {
        if (!this.invoiceMapper) throw new Error(`No mapper. Call onModuleInit`);
        return (await this.invoiceMapper.findAll()).toArray();
    }

    async getInvoiceById(id: number) {
        if (!this.invoiceMapper) throw new Error(`No mapper. Call onModuleInit`);
        return (await this.invoiceMapper.find({ empId: id})).toArray();
    }

    async createInvoice(invoice: Invoice) {
        if (!this.invoiceMapper) throw new Error(`No mapper. Call onModuleInit`);
        return (await this.invoiceMapper.insert(invoice)).toArray();
    }

}