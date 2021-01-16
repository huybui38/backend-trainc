const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/submits/",
    filename: function (req, file, cb) {
        cb(null, req.user.code + "-" + req.params.id + "-" + Date.now() + path.extname(file.originalname));
    },
});

const storageUpload = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, req.user.code + "-" + req.params.id + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storageUpload,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("submit");

const submit = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("submit");

function checkFileType(file, cb) {
  
    const fileTypes = /c/;
    const mimeTypes = ["text/x-c","text/plain"];
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeTypes.includes(file.mimetype) && extname) {
        return cb(null, true);
    } else {
        cb("File c or cpp is required!");
    }
}

module.exports = { upload, checkFileType, submit };
