import mongoose from "mongoose"

const connect_db=async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to the db sucessfully`)
    }
    catch(error){
        console.log(error)
    }
}

export default connect_db;