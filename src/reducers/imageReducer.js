let initialState = {
  images: []
}

const imageList = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_IMAGE':
      state.images = action.image
      return {
        ...state
      }
      case 'FETCH_IMAGE_TITLE':
        state.images = action.image
        return {
          ...state
        }
    default:
      return state
  }
}

export default imageList
