import express from "express";
import { getToken, login, register } from "../controllers/UsersControllers.js";
import { addProduct, deleteProduct, getproduct } from "../controllers/ProductControllers.js";
import { AddProductModdleware, deleteProductMiddleware, getproductModdleware } from "../middlewares/authMiddleware.js";


 const router = express.Router();

 router.post('/register',register)
 router.post('/login',login)
 router.get('/getToken',getToken)
 router.post('/addProduct',AddProductModdleware,addProduct)
 router.get('/getproduct',getproductModdleware,getproduct)
 router.delete('/deleteProduct',deleteProductMiddleware,deleteProduct)








 export default router;