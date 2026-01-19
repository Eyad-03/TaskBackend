import mongoose from 'mongoose'

const connectDB = async () =>
{

try
{

const conn = await mongoose.connect(process.env.MONGO_URL)
console.log(`connection successfully ${conn.connection.host}`)
}

catch(error)
{
console.log(`faild connection ${error.message}`)
process.exit(1);
}

}

export default connectDB;