import mongoose from "mongoose";

const connectDb = async ()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch(err){
        console.error("db error",err.message);
    }
}
export default connectDb;