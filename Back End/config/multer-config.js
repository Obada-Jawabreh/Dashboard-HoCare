// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Not an image! Please upload an image.'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5 // 5MB
//   }
// });

// module.exports = upload;
// --------------------------------------------------------------------
// هان اذا بدك ترفع كلشي يعني صور وفيديو وملفات يعني فش شرط عليها 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

// multer.diskStorage يقوم بإعداد كيفية تخزين الملفات.
// destination هو دالة تُحدد المجلد الذي سيتم تخزين الملفات فيه. في هذا المثال، يتم تخزين الملفات في مجلد uploads/.
// filename هو دالة تُحدد اسم الملف المخزن. يتم إنشاء اسم الملف بناءً على اسم الحقل (file.fieldname)، والوقت الحالي (لضمان أن الاسم فريد)، وامتداد الملف الأصلي (path.extname(file.originalname)).
// -------------------------------------------------------------
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type! Please upload an image or a PDF file.'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 10 // 10MB
//   }
// });

// module.exports = upload;
// -------------------------------------------------------------
// هون فش شرط انو يرفع صور او ملفات 
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Not a valid file! Please upload an image or PDF.'), false);
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5 
//   }
// });

// module.exports = upload;
