/**
 * Created by maxislav on 15.10.16.
 */
var fs = require('fs');
let history = [];
let srcPath = '';
  process.argv.forEach((val, index, array)=> {
    if (2 <= index) {
      srcPath += val + ' '
    }
  });
srcPath = srcPath.replace(/\s+$/g, "");
  console.log(srcPath);

fs.watchFile(srcPath, function (e) {
  //console.log(e)
  let fileNameBackUp = "autobackup_"+history.length+"_"+srcPath;
  history.push(fileNameBackUp);
  console.log(fileNameBackUp);
});

