HeartMail Workers
=================

node.js has worker threads now:

https://nodejs.org/api/worker_threads.html

worker  copy buffers so they are intrinsically faster for computation vs child
process forks.threads