import express from 'express';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null , "image/");
    },
    filename : (req , file , callback) => {
        callback(null , Math.random(0,9999) + "-" + file.originalname);
    }
});

const upload = multer({
    storage : storage
});
//image1.jpg
app.post("/uploads" , upload.single('fileName') ,(req,res) => {
    const file = req.file;
    res.status(200).json({
        message : "Upload Successfully",
        imageName : file.filename
    })
});




app.listen(3000 , () => {
    console.log(`Server running on http://localhost:3000`);
})