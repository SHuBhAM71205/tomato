import{ v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload=async(filePath)=>{
    try{
        const result = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath)
        return result;
    }
    catch(error){
        fs.unlinkSync(filePath)
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
}

export default upload;
