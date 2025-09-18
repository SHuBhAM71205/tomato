import multer from 'multer';
const destination='public/';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,destination)
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const uploadMulter=multer({storage:storage});

export default uploadMulter;
