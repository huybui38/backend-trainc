const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
const s3 = new AWS.S3();

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, req.user.code + "-" + req.params.id + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("submit");

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(
//                 null,
//                 "WebTrainC/" + req.user.code + "-" + req.params.id + "-" + Date.now() + path.extname(file.originalname)
//             );
//         },
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//     }),
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     },
// }).single("submit");

function checkFileType(file, cb) {
    const fileTypes = /c|cpp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("File c or cpp is required!");
    }
}

module.exports = { upload, checkFileType };
