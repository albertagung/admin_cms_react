import Axios from 'axios'

const postUrl = 'http://localhost:3025/posts'

export const getPosts = (post) => {
  return {
    type: 'FETCH_POST',
    post: post
  }
}

export const createPosts = (post) => {
  return {
    type: 'CREATE_POST',
    post: post
  }
}

export const editPost = (post) => {
  return {
    type: 'EDIT_POST',
    post: post
  }
}

export const fetchPost = () => {
  return (dispatch) => {
    return Axios.get(postUrl).then((response) => {
      dispatch(getPosts(response.data))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const requestNewPosts = (post) => {
  return (dispatch) => {
    return Axios.post(postUrl, post).then((response) => {
      dispatch(createPosts(response.data))
    })
  }
}

export const requestEditPost = (editedPost) => {
  return (dispatch) => {
    return Axios.put(`${postUrl}/${editedPost._id}`, editedPost).then((response) => {
      Axios.get(postUrl).then((responseGet) => {
        dispatch(editPost(responseGet.data))
      })
    })
  }
}
