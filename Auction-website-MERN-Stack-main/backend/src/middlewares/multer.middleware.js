//upload middleware
import multer from "multer";

// Use memory storage instead of disk storage for better cloud deployment compatibility
const storage = multer.memoryStorage();

export const upload = multer({ 
    storage,
    limits: {
        fileSize: 1024 * 1024 // 1MB limit
    }
});