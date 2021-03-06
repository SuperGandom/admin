const multer = require('multer');
const fs = require("fs");/* API to create new Item */
//for avatar variables
var storageAvatar = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/avatar');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.originalname);
  }
});
var avatar = multer({ //multer settings
  storage: storageAvatar
}).single('file');

let uploadAvatar =  function(req, res){//upload avatar
    avatar(req,res,function(err){
        if(err){
            res.status(401).json(err)
            return;
        }
        // res.status(200).json({path:req.file.path})
    });
  };  
let deleteItem =  (path) => {//delete file
    const samplelist=['sample-0.jpg','sample-1.jpg','sample-2.jpg','sample-3.jpg','sample-4.jpg','sample-5.jpg','sample-6.jpg','sample-7.jpg','sample-8.jpg','sample-9.jpg'];
    for(var i =0; i<samplelist.length;i++){
      if(path==('uploads/avatar/'+samplelist[i])){
        return
      }
    }
    fs.unlink(__dirname+'\\'+path, (err) => {
        if (err) {
          return
        }
        //file removed
      })
};
module.exports = {
    deleteItem:deleteItem,
    uploadAvatar:uploadAvatar,
}
