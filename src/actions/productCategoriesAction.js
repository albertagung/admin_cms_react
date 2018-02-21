import Axios from 'axios'

const productCategoryUrl = 'http://localhost:3025/product_categories'

export const getProductCategories = (productCategory) => {
  return {
    type: 'FETCH_PRODUCT_CATEGORIES',
    productCategory: productCategory
  }
}

export const createCategory = (productCategory) => {
  return {
    type: 'CREATE_CATEGORIES',
    productCategory: productCategory
  }
}

export const fetchProductCategories = () => {
  return (dispatch) => {
    return Axios.get(productCategoryUrl).then((response) => {
      dispatch(getProductCategories(response.data))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const requestNewProductCategories = (newCategory) => {
  return (dispatch) => {
    return Axios.post(productCategoryUrl, newCategory).then((response) => {
        dispatch(createCategory(response.data))
    }).catch((err) => {
      console.log(err)
    })
  }
}
