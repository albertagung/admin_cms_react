let initialState = {
  productTypes: []
}

const productTypeList = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_TYPES':
      state.productTypes = action.productType
      return {
        ...state
      }
    case 'CREATE_TYPES':
      state.productTypes.push(action.productType)
      return {
        ...state
      }
    default:
      return state
  }
}

export default productTypeList
