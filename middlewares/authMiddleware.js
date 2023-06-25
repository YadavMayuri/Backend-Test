import { log } from "console";
import Users from "../modals/UsersModal.js"

import encrypt from "encryptjs"


export const AddProductModdleware = async (req, res, next) => {
    try {
        const { pname, price, category, color, email, pin, role } = req.body;
        if (!pname) return res.send("Prolduct name is required")
        if (!price) return res.send("price is required")
        if (!category) return res.send("category is required")
        if (!color) return res.send("color is required")
        if (!email) return res.send("email is required")
        if (!role) return res.send("role is required")



        const user = await Users.find({ email })
        console.log(user);
        var secretkey = 'ios'
        var decipherpin = encrypt.decrypt(user[0].pin, secretkey, 256);

        if (decipherpin == pin) {
            if (user[0].role == "seller" || user[0].role == "admin") {
                next();
            } else {
                res.send("Only sellers and admins can add products.")
            }
        } else {
            res.send("imcorrect pin")
        }






    } catch (error) {
        res.send(error)
    }
}


export const getproductModdleware = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.send("email required -middleware")

        const user = await Users.find({ email })
        console.log(user, "userhere");


        if (user[0].role == "buyer" || user[0].role == "admin") {
            next()
        } else {
            res.send("Only buyers and admins can access this API.")
        }


    } catch (error) {
        res.send(error)
    }
}





export const deleteProductMiddleware = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.send("email required -middleware")

        const user = await Users.find({ email })
        console.log(user, "userhere");


        if ( user[0].role == "admin") {
            next()
        } else {
            res.send("Only admins can delete products.")
        }


    } catch (error) {
        res.send(error)
    }
}