import Axios from 'axios'

const imageUrl = 'http://localhost:3025/getImage'

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

export const fetchImageTitle = (imageTitle) => {
  return (dispatch) => {
    return Axios.get(`${imageUrl}/product-${imageTitle}`).then((response) => {
      dispatch(getImageByTitle(response.data))
    })
  }
}