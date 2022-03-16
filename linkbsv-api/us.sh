# !/bin/bash 

rsync -r -a -v -e "ssh -i $HOME/.ssh/id_rsa_linkBsv" --exclude='node_modules/' --delete $PWD/ root@linkbsv.com:/home/linkbsv.com/backend/;




