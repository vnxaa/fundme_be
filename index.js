const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const nftsRouter = require('./routes/nfts')
const campaignRouter = require('./routes/campaign')
const fundRouter = require('./routes/fund')
const rwRouter = require('./routes/rewards')
require('dotenv').config();

const connectDB = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fundme.dsysqtt.mongodb.net/?retryWrites=true&w=majority`)
        console.log("Mongoo connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

connectDB();

const app = express();
app.use(express.json());
app.use(cors())


app.use('/api/auth',authRouter)
app.use('/api/profile',profileRouter)
app.use('/api/nfts',nftsRouter)
app.use('/api/campaign',campaignRouter)
app.use('/api/fund',fundRouter)
app.use('/api/rewards',rwRouter)


const PORT=5000
app.listen(PORT)