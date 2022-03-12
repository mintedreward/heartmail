# !/bin/bash 
npm run build;

rsync -r -a -v -e "ssh -i $HOME/.ssh/id_rsa_linkBsv" --delete $PWD/build/ root@linkbsv.com:/home/linkbsv.com/frontend/;



