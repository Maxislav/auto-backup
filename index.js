/**
 * Created by maxislav on 15.10.16.
 */
var fs = require('fs');
let history = [];
let srcPath = '';
let steps = 20;
let backUpDir = "./autobackup";

  process.argv.forEach((val, index, array)=> {
    if (2 <= index) {
      srcPath += val + ' '
    }
  });
srcPath = srcPath.replace(/\s+$/g, "");
  console.log(srcPath);

fs.watchFile(srcPath, function (e) {
  if (!fs.existsSync(backUpDir)){
    fs.mkdirSync(backUpDir);
  }

  let fileNameBackUp = "autobackup_"+0+"_"+srcPath;
  history = (fs.readdirSync(backUpDir ));


  if(history.length){
    let arrNewName = [];
    history.reverse();
    history.forEach(fileName=>{
      let newName =  fileName.replace(/_\d+_/, function(r){
        let n = parseInt(r.replace(/_/g, ""));
        n++;
        return "_"+n+"_"
      });
      fs.renameSync( backUpDir +"/"+fileName,  backUpDir +"/"+newName);
    });
  }
  fs.createReadStream(srcPath).pipe(fs.createWriteStream(backUpDir+"/"+fileNameBackUp));
  if(steps<history.length){
    fs.unlinkSync(backUpDir+"/"+history[history.length-1])
  }

});


