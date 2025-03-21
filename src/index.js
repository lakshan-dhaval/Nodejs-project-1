// require('dotenv').config({path: './env'}) ;

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express";

const app=express();

connectDB()

.then (() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch(() => {
    console.log("MOngo Db connection  failed");
    
})
 
// app.listen(8080,async () => {
//     try {    
//         await connectDB();
//         console.log("App is listing on port 8080");
//     } catch (error) {
//        console.log(error);                    
//     }
// })























// import express from "express";
// const app = express()(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_Name}`);
//     app.on("ERROR", (error) => {
//       console.log("ERROr");  
//       throw error               
//     });

//     app.listen(process.env.PORT, () => {
//         console.log(`App is listing on port ${process.env.PORT}`);
        
//     })

//   } catch (error) {
//     console.error(error, "Error");
//     throw error;
//   }
// })();
