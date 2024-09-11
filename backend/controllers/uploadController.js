const path = require("path");
const multer = require("multer");
const fileService = require("../services/uploadservices");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp for unique filename
  },
});

const upload = multer({ storage: storage }).single("file");

// Handle file upload
const uploadcontroller = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send("Error uploading file");
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const filePath = `/uploads/${req.file.filename}`;
    console.log("this is user", req.body.userid)
    // Store file details in the database
    fileService.storeFileDetails(
      req.file.originalname,
      filePath,
      req.body.userid,
      (err, result) => {
        if (err) {
          return res.status(500).send("Error storing file details");
        }

        return res.status(200).send({
          message: "File uploaded successfully",
          filePath: filePath,
        });
      }
    );
  });
};


const getProfileImage = (req,res)=>{

fileService.ProfileServices(req,res)

}





module.exports = {
  uploadcontroller,
  getProfileImage
};
