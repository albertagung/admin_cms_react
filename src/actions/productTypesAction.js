import Axios from 'axios'

const productTypeUrl = 'http://localhost:3025/product_types'

export const getProductTypes = (productType) => {
  return {
    type: 'FETCH_PRODUCT_TYPES',
    productType: productType
  }
}

export const createTypes = (productType) => {
  return {
    type: 'CREATE_TYPES',
    productType: productType
  }
}

export const fetchProductTypes = () => {
  return (dispatch) => {
    return Axios.get(productTypeUrl).then((response) => {
      dispatch(getProductTypes(response.data))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const requestNewProductTypes = (newType) => {
  return (dispatch) => {
    return Axios.post(productTypeUrl, newType).then((response) => {
      dispatch(createTypes(response.data))
    }).catch((err) => {
      console.log(err)
    })
  }
}
