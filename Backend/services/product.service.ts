import { deleteProduct } from "../controllers/product.controller.js";
import { categoryModel } from "../db/models/category.model.js";
import { productModel } from "../db/models/product.model.js";

interface addProduct{
    name : string ,
    description : string,
    price:number,
    stock:number,
    brand:string,
    image?:string,
    category : any
}

interface updateProduct{
    name ?: string ,
    description ?: string,
    price?:number,
    stock?:number,
    brand?:string,
    image?:string,
    category ?: any
}

export class productService {
    constructor(){}

    async addProduct(data : addProduct , image : string){
        return await productModel.create({...data , image});
    }

    async getProducts(){    
        return await productModel.find();
    }

    async deleteProduct(productId : string){
        const product = await productModel.findById({_id : productId});

        if(!product){
            throw new Error("Not Found");
        }

        return await productModel.deleteOne({_id : productId});
    }

    async updateProduct(productId : string , data : updateProduct){
        const product = await productModel.findById({_id : productId});

        if(!product){
            throw new Error("Not Found");
        }

        return
    }

    async createCategory(data : any){
        return await categoryModel.insertOne(data);
    }

    async getTrendingProducts (){
        return await productModel.find({isFeatured : true}).limit(8);
    }

    async searchProducts(query : any){
        const filter : any = {};

        if(query.name && typeof query.name === 'string' && query.name.trim() !== ''){
            filter.$or = [
            {
                name:{
                    $regex: query.name,
                    $options:"i"
                }
            },
            {
                brand:{
                    $regex: query.name,
                    $options:"i"
                }
            }
        ];
        }

        if(query.category){
            filter.category = query.category ;
        }

        if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) filter.price.$gte = Number(query.minPrice);
        if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
        }

        let sortOption : any = {createdAt : -1};

        if(query.sortBy==="newest"){
                sortOption={
                    createdAt:-1
                };
            }
        else if(query.sortBy === "price_asc"){
            sortOption = {price : 1};
        }
        else if(query.sortBy === "price_desc"){
            sortOption = {price : -1};
        }   
        return await productModel.find(filter).sort(sortOption);    
    }

    async getAllCategory(){
        return await categoryModel.find();
    }

    async getProductById(productId : string) {
        const product = await productModel.findOne({_id : productId}).populate("category") ;

        if(!product){
            throw new Error("Not Found");
        }

        return product ;
    }
}