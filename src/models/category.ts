/**
 * Category model
 * 
 * @since 1.0.0
 * @version 1.0.0
 * @package main/Models/Category
 */

import mongoose from 'mongoose';

interface CategoryInterface {
    name: string;
}

const categorySchema = new mongoose.Schema({
    name: String
});

categorySchema.statics.build = (attr: CategoryInterface) => {
    return new Category(attr);
}

const Category = mongoose.model('Category', categorySchema);


export { Category, CategoryInterface };

