let initialState = {
  productCategories: []
}

const productCategoryList = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_CATEGORIES':
      state.productCategories = action.productCategory    
      return {
        ...state
      }
    case 'CREATE_CATEGORIES':
      state.productCategories.push(action.productCategory)
      return {
        ...state
      }
    default:
      return state
  }
}

export default productCategoryList
