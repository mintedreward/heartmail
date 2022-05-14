// import { Injectable } from '@nestjs/common';
import { Client, mapping, auth, types } from 'cassandra-driver';
import {readFileSync} from 'fs'

// @Injectable()
export class CassandraService {
    client?: Client;
    mapper?: mapping.Mapper;
    useLogging:boolean = true
    private createClient() {
        const cassauth = new auth.PlainTextAuthProvider(
            process.env.AWS_SERVICEUSER||'',
            process.env.AWS_SERVICEPASSWORD||''
        );
        const sslAWS = {
            ca: [readFileSync(process.env.CERTFILE||'certs/sf-class2-root.crt', 'utf-8')],
                host: process.env.AWS_CASSANDRA,
                rejectUnauthorized: true
           };
        this.client = new Client({
            contactPoints: [process.env.AWS_CASSANDRA||'0.0.0.0'],
            keyspace: process.env.AWS_KEYSPACE,
            localDataCenter: process.env.AWS_REGION,
            authProvider: cassauth,
            sslOptions: sslAWS,
            protocolOptions: { port: 9142 },
            queryOptions: { consistency: types.consistencies.localQuorum }
        })
        if (this.useLogging) {
            this.client.on('log', (level, loggerName, message) => {
                console.log(`CASSANDRA LOG`, `${level} - ${loggerName}: ${message}`)
            })
        }
    }
    
    createMapper(mappingOptions: mapping.MappingOptions) {
     if(this.client == undefined) {
         this.createClient();
     }
     if (!this.client) return;
     return new mapping.Mapper(this.client, mappingOptions);
    }
}