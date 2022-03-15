# linkbsv.com

Created by Casey Hamilton & Greg Ward. Purchased from Greg Ward in March, 2022.

Ryan X. Charles has root access to the server to facilitate migration.

## Cloning their DB to our DB from our server

Use the clone-db.sh tool from our server.

## Basic Server Info

* front-end served as static HTML with "pm2 serve" command
* front-end available on port 3000
* back-end is served as index.js with "pm2 start" command
* back-end is an app available on port 5050
* https://www.linkbsv.com is the front-end
* https://linkbsv.com is also the front-end
* https://api.linkbsv.com is the API
* http://www.linkbsv.com redirects to https://linkbsv.com
* http://linkbsv.com redirects to https://linkbsv.com

Example pm2 status output:

<code>
root@ubuntu-s-1vcpu-1gb-nyc3-01:~# pm2 status
┌─────┬───────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name              │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1   │ linkBsv Client    │ default     │ 4.5.6   │ fork    │ 59012    │ 10M    │ 0    │ online    │ 0%       │ 42.0mb   │ root     │ disabled │
│ 0   │ linkBsv Server    │ default     │ 1.0.0   │ fork    │ 3000936  │ 3D     │ 114  │ online    │ 0%       │ 68.3mb   │ root     │ enabled  │
└─────┴───────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
</code>