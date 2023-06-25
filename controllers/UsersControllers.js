import Users from "../modals/UsersModal.js"
import encrypt from "encryptjs";

export const register = async (req,res)=>{
    try{
        const{name,email,password,number,role,pin}=req.body;
        if(!name)return res.send("Name is required")
        if(!email)return res.send("email is required")
        if(!password)return res.send("password is required")
        if(!number)return res.send("number is required")
        if(!role)return res.send("role is required")
        if(!pin)return res.send("pin is required")

        if(password.length <8){
            return res.send("Password should include atleast 8 characters")

        }
        const response= await Users.find({email})
        if(response.length){
            return res.send("email already exist")

        }
        var secretkey= 'ios';
        var plainPassword = password;
        var plainpin =pin;
        var cipherpassword = encrypt.encrypt(plainPassword,secretkey,256);
        var cipherpin = encrypt.encrypt(plainpin,secretkey,256)
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
       

        const user = new Users({
            name,
            email,
            password:cipherpassword,
            number,
            role,
            pin:cipherpin,
            access_token:accessToken
        })
        await user.save();
        return res.send("Registration successfull")

    }catch(error){
        res.send(error)
    }
}


//logiin

export const login = async(req,res)=>{
    try{

        const {email,password}= req.body;
        if(!email)return res.send("Email is required")
        if(!password)return res.send("password is required")

        const response = await Users.find({email})
        
        var secretkey='ios';
        var decipherpassword = encrypt.decrypt(response[0].password,secretkey,256);
        

        if(decipherpassword == password){
            res.send("You are logged in.")
        }else{
            res.send("incorrect password")
        }


    }catch(error){
        res.send(error)
    }
}


//regenerate access token

export const regrnerateToken = async(req,res)=>{
    try{
        const{email}=req.body;
        if(!email)return res.send("email is required")

        const user = await Users.find({email});

        if(user.length){
            if(user[0].access_token){
                return res.send("Token alredy generated")
            }else{
                await Users.findOneAndUpdate({email},{$unset:{access_token:1}})
                setTimeout(async()=> {
                   await Users.updateOne({_id:user._id},{$unset: {access_token:1}})
               },60 *1000)
               res.send("key generated")
            }


        }

    }catch(error){
        res.send(error)
    }
}



//get token 
export const getToken = async(req,res)=>{
    try{
        const{email}=req.body;
        if(!email)return res.send("email is required");

        const response = await Users.find({email,access_token})
        if(response[0]){
            return res.send(response)
        }else{
            res.send("data not found")
        }
    }catch(error){
        res.send(error)
    }
}