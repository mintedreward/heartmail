var fs=require('fs');
var jh=require('json-header');
var ejs=require('ejs');

var documents=[];
fs.readdir('./documents', function(err, files) {
  for (var i=0; i<files.length; i++) {
    var docsloaded=0;
    (function(){
      var j=i;
      fs.readFile('./documents/'+files[j], function(err, content) {
        docsloaded++;
        var str=content.toString();
        var newdoc=jh.parseStr(str,jh.dateReviver);
        newdoc.filename=files[j];
        if (newdoc.header.title!=undefined) {
          documents.push(newdoc);
        };
        if (docsloaded==files.length) {
          documents.sort(function(a,b){
            if (a.header.date>b.header.date) {
              return -1;
            } else if (a.header.date==b.header.date) {
              return 0;
            } else {
              return 1;
            };
          });
          renderPages();
        };
      });
    })();
  };
});

var renderPages=function() {
  renderPage('./layouts/index.ejs',
             {documents:documents},
             './rendered/index.html',
             './rendered');
  renderPage('./layouts/rss.ejs',
             {documents:documents},
             './rendered/rss.xml',
             './rendered');
  renderPage('./layouts/archive.ejs',
             {documents:documents},
             './rendered/archive/index.html',
             './rendered/archive');
  renderPage('./layouts/about.ejs',
             {documents:documents},
             './rendered/about/index.html',
             './rendered/about');
  for (var i=0; i<documents.length; i++) {
    renderPage('./layouts/document.ejs',
               {documents:documents,thisdocindex:i},
               './rendered/archive/' + documents[i].filename + '/index.html',
               './rendered/archive/' + documents[i].filename);
  };
};

var renderPage=function(layoutfile,context,outfilename,outdir) {
  if (outdir!==undefined)
  {
    try {
      fs.mkdirSync(outdir);
    } catch (e) {
      //folder probably exists... ignore
    };
  }
  fs.readFile(layoutfile, function(err, content) {
    console.log("Rendering " + outfilename);
    var rendered=ejs.render(content.toString(), context);
    fs.writeFile(outfilename, rendered);
  });
};

