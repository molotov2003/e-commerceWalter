const multer=require("multer")

const configurarMulter = (multer) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './images'); // Carpeta donde se almacenarán las imágenes
      },
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
      },
    });
  
    return multer({ storage: storage }).single('img');
  };

  module.exports=configurarMulter