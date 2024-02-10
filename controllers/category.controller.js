import Category from "../models/category.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { deleteDocumentById } from "./controllerFactory.js";


export const getAllCategories = catchAsync( async(req,res,next)=>{
    let categories = await Category.find({}).select('-__v')
    res.status(200).json({
        status: 'success',
        data: categories
    })
})


export const createCategory = catchAsync(async(req, res, next)=>{
    
    let newCategory = await Category.create(req.body)
    res.status(200).json({
        status: 'success',
        data: newCategory
    })
})

export const deleteCategory  = deleteDocumentById(Category)