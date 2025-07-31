
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary=async(fileBuffer)=>{
    try {
        if(!fileBuffer) return null;
        
        // Convert buffer to base64 string
        const base64String = fileBuffer.toString('base64');
        const dataURI = `data:image/jpeg;base64,${base64String}`;
        
        const response = await cloudinary.uploader.upload(dataURI, { resource_type: "auto" });

        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null;
    }
}



export {uploadOnCloudinary}