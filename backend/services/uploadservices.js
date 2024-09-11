const connections = require("../config/dbConnection");

// Function to store file details in the database
const storeFileDetails = (filename, filepath, userid, callback) => {
  const sql =
    "INSERT INTO files ( filename, filepath, userid ) VALUES (?, ?, ?)";
  connections.query(sql, [filename, filepath, userid], callback);
  
};



const ProfileServices = (req, res) => {
  const userid = req.params.userid;
  console.log(userid)


 const sql = "SELECT filepath FROM `files` WHERE userid = ?";
   connections.query(sql,[userid],(err,result)=>{
    if(err){
        console.log(err)
        res.status(500).json({ message: "Server error" });
       return;
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Image not found for this student" });
    }
    console.log("run successfully yeah",result)
    
    res.json({ filePath: result[0].filepath });
   });


  }


module.exports = {
  storeFileDetails,
  ProfileServices
};
