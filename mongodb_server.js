import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

const mongooseClient = mongoose.connect(uri)
.then(() => console.log(`⛁   Mongo DB Connected!`))
.catch(err => console.log(err));

export default mongooseClient;