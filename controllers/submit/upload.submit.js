const { AsyncCatch } = require("../../helpers/utils.helper");
const { BadRequest, DefaultError } = require("../../helpers/errors.helper");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");

AWS.config.update({
    accessKeyId: process.env.AWS_IAM_USER_KEY,
    secretAccessKey: process.env.AWS_IAM_USER_SECRET,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        },
        // fileFilter: function (req, file, cb) {
        //     checkFileType(file, cb);
        // },
    }),
}).single("myImage");

// function checkFileType(file, cb) {
//     const fileTypes = jpeg | jpg | png | gif;

//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

//     const mineType = fileTypes.test(file.mineType);

//     if (mineType && extname) {
//         return cb(null, true);
//     } else {
//         cb("error: Images only!");
//     }
// }

module.exports = AsyncCatch(async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(err);
        } else {
            console.log(req.file);
            if (req.file == undefined) {
                res.send("No file");
            } else {
                res.send("ahihi");
            }
        }
    });
});
