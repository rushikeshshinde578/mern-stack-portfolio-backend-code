import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PORTFOLIO"
    }).then(()=>{
        console.log("DB is connected");
    }).catch((error)=>{
        console.log(`DB is not connected ${error}`);
    });
};

export default dbConnection;