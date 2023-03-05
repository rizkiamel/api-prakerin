//dependency multer
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if(file.fieldname === "dokumen_validasi"){
    if(file.mimetype === 'application/pdf'){
      cb(null, true)
    }else{
      cb(null, false)
      return cb(new Error('Tidak boleh kosong dan hanya menerima file pdf'))
    }
  }else{
    if(file.mimetype === 'application/pdf'){
      cb(null, true)
    }else{
      cb(null, false)
    }
  }
}

//configure multer to storage engine
var storage = multer.diskStorage({
    //folder to store image
    destination: function (req, file, cb) {
      if(file.fieldname === "dokumen_validasi"){
        cb(null, "public/uploads/dokumen_validasi");
      }else if(file.fieldname === "curriculum_vitae"){
        cb(null, "public/uploads/curriculum_vitae");
      }else{
        cb(null, "public/uploads");
      }    
    },
    filename: function (req, file, cb) {
      if(file.fieldname === "dokumen_validasi"){
        cb(null, file.fieldname+Date.now()+file.originalname)
        //cb(null, `${Date.now()}-${file.originalname}`);
      }else if(file.fieldname === "curriculum_vitae"){
        cb(null, file.fieldname+Date.now()+file.originalname)
      }else{
        cb(null, Date.now()+file.originalname)
      }  
        //fielname : name file inside destination folder
    },
});

var upload = multer({ storage: storage, limits: {fileSize:'2mb'}, fileFilter: fileFilter })
module.exports = upload