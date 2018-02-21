let initialState = {
  posts: []
}

const postList = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POST':
      state.posts = action.post
      return {
        ...state
      }
      case 'CREATE_POST':
        state.posts.push(action.post)
        return {
          ...state
        }
      case 'EDIT_POST':
        state.posts = action.post
        return {
          ...state
        }
    default:
      return state
  }
}

export default postList
