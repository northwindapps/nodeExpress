var express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

// Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myImage');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    // if(mimetype && extname){
    if(extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
      console.log("Images Only");
    }
  }
  

//Init app
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/', (req,res)=> {res.send("You have got promoted.")
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.send("Error");
        console.log("err");
      } else {
        if(req.file == undefined){
          res.send('Error');
          console.log("undefined Error");
        } else {
          res.send(res);
          console.log(res);
        }
      }
    });
  });

  
var port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log("Server running on port 3000");
});