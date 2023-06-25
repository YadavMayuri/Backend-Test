import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = new Schema({
    pname:String,
    price:Number,
    category:String,
    color:String
})

export default mongoose.model("Products",Product)

