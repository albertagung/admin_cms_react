import Axios from 'axios'

const imageUrl = 'http://localhost:3025/getImage'
const removeImageUrl = 'http://localhost:3025/deleteImage'

export const getImages = (image) => {
  return {
    type: 'FETCH_IMAGE',
    image: image
  }
}

export const getImageByTitle = (image) => {
  return {
    type: 'FETCH_IMAGE_TITLE',
    image: image
  }
}

export const getRemoveImage = (image) => {
  return {
    type: 'FETCH_REMOVE_IMAGE',
    image: image
  }
}

export const uploadImage = (image) => {
  return {
    type: 'FETCH_UPLOAD_IMAGE',
    image: image
  }
}

export const fetchImage = () => {
  return (dispatch) => {
    return Axios.get(imageUrl).then((response) => {
      dispatch(getImages(response.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const requestUploadImage = (image) => {
  return (dispatch) => {
    return dispatch(uploadImage(image))
  }
}

export const requestRemoveImage = (imageKey, imageTitle) => {
  return (dispatch) => {
    return Axios.delete(`${removeImageUrl}/${imageKey}`).then((response) => {
      Axios.get(`${imageUrl}`).then((responseGet) => {
        console.log(responseGet.data)
        dispatch(getImages(responseGet.data))
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
}

export const fetchImageTitle = (imageTitle) => {
  return (dispatch) => {
    return Axios.get(`${imageUrl}/${imageTitle}`).then((response) => {
      dispatch(getImageByTitle(response.data))
    })
  }
}