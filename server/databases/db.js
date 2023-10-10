import mongoose from "mongoose";


const Connection = (URL) => {
    try {
        mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database connected succesfully")

    } catch (e) {
        console.log(`Error occur while connecting to database: `, e);
    }
}


export default Connection;