import { combineReducers } from 'redux'
import postList from './postReducer'
import productList from './productReducer'
import productCategoryList from './productCategoriesReducer'
import productTypeList from './productTypesReducer'
import imageList from './imageReducer'

const postListApp = combineReducers(
  {
    postList,
    productList,
    productCategoryList,
    productTypeList,
    imageList
  }
)

export default postListApp
