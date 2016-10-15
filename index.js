/**
 * Created by maxislav on 15.10.16.
 */
var fs = require('fs');
let history = [];
let path = '';
  process.argv.forEach((val, index, array)=> {
    if (2 <= index) {
      path += val + ' '
    }
  });
path = path.replace(/\s+$/g, "");
  console.log(path);

fs.watchFile(path, function (e) {
  //console.log(e)
  let fileNameBackUp = "autobackup_"+history.length+"_"+path;
  history.push(fileNameBackUp);
  console.log(fileNameBackUp);
});

