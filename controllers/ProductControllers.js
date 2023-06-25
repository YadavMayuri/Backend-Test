import Products from "../modals/ProductModal.js"


export const addProduct = async (req,res)=>{
    try{
        const{pname, price, category,color,email,pin,role}=req.body;

        const product = new Products({
            pname,
            price,
            category,
            color
        })
        await product.save();
        res.send({"product is added to DB":product})
    }catch(error){
        res.send(error)
    }
}



//get product

export const getproduct = async(req,res)=>{
    try{

        const{email}=req.body
        if(!email) return res.send("email required")
        const product = await Products.find({})
        if(product.length){
            res.send(product)
        }else{
            res.send("no products")
        }


    }catch(error){
        res.send(error)
    }
}


//delete product

export const deleteProduct = async(req,res)=>{
    try{
        const{email,pID}=req.body;
        if(!pID)return res.send("product Id is required.")
        const product = await Products.findOneAndDelete({_id:pID})
        res.send("Product is deleted.")

    }catch(error){
        return res.send(error)
    }
}