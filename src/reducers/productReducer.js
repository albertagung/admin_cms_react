let initialState = {
  products: []
}

const productList = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT':
      state.products = action.product
      return {
        ...state
      }
    case 'EDIT_PRODUCT':
      state.products = action.product
      return {
        ...state
      }
    default:
      return state
  }
}

export default productList
