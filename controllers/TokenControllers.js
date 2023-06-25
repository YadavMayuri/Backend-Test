import AwdizToken from "../modals/Token.js"
import UsersModal from "../modals/UsersModal.js";

export const createToken = async(req,res)=>{
    try{

        let random =""
        const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        const characterlength = characters.length;
        let length =100;
        for (var i=0; i<length; i++){
            random += characters.charAt(Math.floor(Math.random()*characterlength))
        }
        const accessToken = random;

        setTimeout(async()=> {
            await Users.updateOne({_id:user._id},{$unset: {access_token:1}})
        },60 *1000)
        await user.save();
        res.send("token generated")

    }catch(error){
        res.send(error)
    }
}

//regenerate token 

export const regenerateToken = async(req,res)=>{
    try{

        
        
    }catch(error){
        res.send(error)
    }
}