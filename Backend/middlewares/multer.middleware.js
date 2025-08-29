import multer from "multer";

// store files in memory instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });
export {upload}


// if dont want to deploy

// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
  
// export const upload = multer({ 
//     storage, 
// })