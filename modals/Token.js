import mongoose from "mongoose";
import { Schema } from "mongoose";

const token = new Schema({
    access_token: String
})

export default mongoose.model("AwdizToken",token);

