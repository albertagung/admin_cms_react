import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../../actions/postAction'
import * as imageListAction from '../../actions/imageAction'

// Main Page About Component
import MainPageAbout from './mainPageAbout'
// Main Page Why Choose Us Component
import MainPageWhyChooseUs from './mainPageWhyChooseUs'
// Main Page Counter
import MainPageCounter from './mainPageCounter'

class MainPage extends Component {

	render () {
		console.log(this.props.images)
		return (
			<div>
				<MainPageAbout posts={this.props.posts} images={this.props.images}/>
				<MainPageWhyChooseUs />
				<MainPageCounter />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  if (state.postList.posts !== undefined) {
    return {
      posts: state.postList.posts,
      images: state.imageList.images
    }
  } else {
    return {
      posts: [],
      images: state.imageList.images
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: post => dispatch (postListAction.getPosts(post)),
    requestEditPost: editedPost => dispatch (postListAction.requestEditPost(editedPost)),
    // Get images based on product id
    fetchImageTitle: imageTitle => dispatch (imageListAction.fetchImageTitle(imageTitle)),
    requestRemoveImage: (imageKey, imageTitle) => dispatch (imageListAction.requestRemoveImage(imageKey, imageTitle))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (MainPage)