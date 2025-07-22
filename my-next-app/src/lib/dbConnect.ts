import mongoose from "mongoose";


type ConncetionObject={

    isConnected?:number
}

const connection:ConncetionObject={}

async function dbConnect():Promise<void> {
    
    if (connection.isConnected) {
        console.log("Already Connected to Database.");
        return
    }

    try{
        const db =await mongoose.connect(process.env.MONGODB_URI || '',{})
        
       connection.isConnected= db.connections[0].readyState

       console.log("DB Connected Sucessfully.");
       
    }
    catch(error){
        console.log("Database connection failed",error);
        
        process.exit(1)
    }
}

export default dbConnect;