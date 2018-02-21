import Axios from 'axios'

const productUrl = 'http://localhost:3025/products'

export const getProducts = (product) => {
  return {
    type: 'FETCH_PRODUCT',
    product: product
  }
}

export const editProduct = (product) => {
  return {
    type: 'EDIT_PRODUCT',
    product: product
  }
}

export const fetchProducts = () => {
  return (dispatch) => {
    return Axios.get(productUrl).then((response) => {
      dispatch(getProducts(response.data))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const requestEditProduct = (editedProduct) => {
  return (dispatch) => {
    return Axios.put(`${productUrl}/${editedProduct._id}`, editedProduct).then((response) => {
      Axios.get(productUrl).then((responseGet) => {
        dispatch(editProduct(responseGet.data))
      })
    })
  }
}
