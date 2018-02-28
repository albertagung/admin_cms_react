import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../../actions/postAction'
import * as imageListAction from '../../actions/imageAction'

// Riek
import { RIEInput, RIETextArea } from 'riek'

// React Semantic UI
import { Popup, Form, Dimmer, Loader, Segment } from 'semantic-ui-react'

// Image Upload Multiple Component
import ImageEditUploadMultiple from '../imageEditUploadMultiple'

class MainPageWhyChooseUs extends Component {
	constructor (props) {
		super (props)
		this.state = {
			changingInput: {
				sectionTitle: '',
				column1Title: '',
				column1Content: '',
				column2Title: '',
				column2Content: '',
				column3Title: '',
				column3Content: '',
				column4Title: '',
				column4Content: ''
			},
			isLoaded: false,
			imageClicked: ''
		}
	}

	getImages = async () => {
		await this.props.fetchImageTitle('mainPageWhyChooseUs')
		let objState = {
			isLoaded: true,
			imageClicked: this.props.images.length !== 0 ? this.props.images[0].imageKey : ''
		}
		let newObjState = Object.assign(this.state, objState)
		this.setState({
			newObjState
		})
	}

	getContent = async () => {
		await this.props.posts.forEach( async (dataPosts) => {
			if (dataPosts.sectionName === 'mainPageWhyChooseUs') {
				let objSectionTitle = {
					sectionTitle: dataPosts.sectionTitle
				}
				let newObjChangingInput = Object.assign(this.state.changingInput, objSectionTitle)
				this.setState({
					changingInput: newObjChangingInput
				})
				if (dataPosts.section === 'column1') {
					let objColumn1 = {
						column1Title: dataPosts.title,
						column1Content: dataPosts.content
					}
					let newObjChangingInput = Object.assign(this.state.changingInput, objColumn1)
					this.setState({
						changingInput: newObjChangingInput
					})
				} else if (dataPosts.section === 'column2') {
						let objColumn2 = {
							column2Title: dataPosts.title,
							column2Content: dataPosts.content
						}
						let newObjChangingInput = Object.assign(this.state.changingInput, objColumn2)
						this.setState({
							changingInput: newObjChangingInput
						})
					} else if (dataPosts.section === 'column3') {
						let objColumn3 = {
							column3Title: dataPosts.title,
							column3Content: dataPosts.content
						}
						let newObjChangingInput = Object.assign(this.state.changingInput, objColumn3)
						this.setState({
							changingInput: newObjChangingInput
						})
					} else if (dataPosts.section === 'column4') {
						let objColumn4 = {
							column4Title: dataPosts.title,
							column4Content: dataPosts.content
						}
						let newObjChangingInput = Object.assign(this.state.changingInput, objColumn4)
						this.setState({
							changingInput: newObjChangingInput
						})
					}
				}
			}
		)
		let objState = {
			isLoaded: true
		}
		let newObjState = Object.assign(this.state, objState)
		this.setState({
			newObjState
		})
		console.log(this.state.isLoaded)
	}

	componentWillMount = () => {
		setTimeout( async () => {
			this.getContent()
		}, 2000)
	}

	handleFormChange = (task) => {
		let objNewState = Object.assign(this.state.changingInput, task)
		this.setState({
			changingInput: objNewState
		})
	}

	getMatchWithRedux = () => {
		this.props.posts.forEach((dataPosts) => {
				if (dataPosts.section === 'column1') {
					let objcolumn1 = {
						title: this.state.changingInput.column1Title,
						content: this.state.changingInput.column1Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objcolumn1)
					this.props.requestEditPost(newObjChangingInput)
				} else if (dataPosts.section === 'column2') {
					let objcolumn2 = {
						title: this.state.changingInput.column2Title,
						content: this.state.changingInput.column2Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objcolumn2)
					this.props.requestEditPost(newObjChangingInput)
				} else if (dataPosts.section === 'column3') {
					let objcolumn3 = {
						title: this.state.changingInput.column3Title,
						content: this.state.changingInput.column3Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objcolumn3)
					this.props.requestEditPost(newObjChangingInput)
				}	else if (dataPosts.section === 'column4') {
					let objColumn4 = {
						title: this.state.changingInput.column4Title,
						content: this.state.changingInput.column4Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objColumn4)
					this.props.requestEditPost(newObjChangingInput)
				}
			}
		)
	}

	handleSectionTitleChange = () => {
    this.props.posts.forEach((dataPosts) => {
      if (dataPosts.sectionName === 'mainPageWhyChooseUs') {
        dataPosts.sectionTitle = this.state.changingInput.sectionTitle
        this.props.requestEditPost(dataPosts)
      }
    })
  }

	getConfirmationFromUploader = (confirmation) => {
		let objConfirmation = {
			isLoaded: confirmation
		}
		let newObjState = Object.assign(this.state, objConfirmation)
		this.setState({
			newObjState
		})
	}

	render () {
		if (this.state.isLoaded === false) {
			return (
				<Segment>
  				<Dimmer active page>
  					<Loader>Loading</Loader>
  				</Dimmer>
  			</Segment>
			)
		} else {
			return (
				<section>
			    <div className="container text-center">
			      <div className="row">
			        <div className="col-lg-8 col-lg-offset-2">
			          <h3>
			          	<RIEInput
	        						value={(() => {
	        							return this.state.changingInput.sectionTitle !== '' ? this.state.changingInput.sectionTitle : 'Section Title'
	        						})()}
	        						change={this.handleFormChange}
	        						propName='sectionTitle'
	        					/>
			          </h3>
			        </div>
			      </div>
			      <div className="row">
			        <div data-wow-delay=".2s" className="col-lg-3 col-sm-6 wow fadeIn">
			          <h4>
			            <i className="icon-big ion-ios-infinite-outline"></i> 
			            <RIEInput
      							value={(() => {
        							return this.state.changingInput.column1Title !== '' ? this.state.changingInput.column1Title : 'Column 1 Title'
        						})()}
        						change={this.handleFormChange}
        						propName='column1Title'
	        				/>
			          </h4>
			          <p>
			          	<RIETextArea
        						value={(() => {
        							return this.state.changingInput.column1Content !== '' ? this.state.changingInput.column1Content : 'Column 1 Content'
        						})()}
        						change={this.handleFormChange}
        						propName='column1Content'
        					/>
			          </p>
			        </div>
			        <div data-wow-delay=".4s" className="col-lg-3 col-sm-6 wow fadeIn">
			          <h4>
			            <i className="icon-big ion-ios-sunny-outline"></i>
            			<RIEInput
        						value={(() => {
        							return this.state.changingInput.column2Title !== '' ? this.state.changingInput.column2Title : 'Column 2 Title'
        						})()}
        						change={this.handleFormChange}
        						propName='column2Title'
        					/>
			          </h4>
			          <p>
			          	<RIETextArea
        						value={(() => {
        							return this.state.changingInput.column2Content !== '' ? this.state.changingInput.column2Content : 'Column 2 Content'
        						})()}
        						change={this.handleFormChange}
        						propName='column2Content'
        					/>
			          </p>
			        </div>
			        <div data-wow-delay=".6s" className="col-lg-3 col-sm-6 wow fadeIn">
			          <h4>
			            <i className="icon-big ion-ios-glasses-outline"></i>
			            <RIEInput
        						value={(() => {
        							return this.state.changingInput.column3Title !== '' ? this.state.changingInput.column3Title : 'Column 3 Title'
        						})()}
        						change={this.handleFormChange}
        						propName='column3Title'
        					/>
			          </h4>
			          <p>
			          	<RIETextArea
        						value={(() => {
        							return this.state.changingInput.column3Content !== '' ? this.state.changingInput.column3Content : 'Column 3 Content'
        						})()}
        						change={this.handleFormChange}
        						propName='column3Content'
        					/>
			          </p>
			        </div>
			        <div data-wow-delay=".8s" className="col-lg-3 col-sm-6 wow fadeIn">
			          <h4>
			            <i className="icon-big ion-ios-pulse"></i>
			            <RIEInput
        						value={(() => {
        							return this.state.changingInput.column4Title !== '' ? this.state.changingInput.column4Title : 'Column 4 Title'
        						})()}
        						change={this.handleFormChange}
        						propName='column4Title'
        					/>
			          </h4>
			          <p>
			          	<RIETextArea
        						value={(() => {
        							return this.state.changingInput.column4Content !== '' ? this.state.changingInput.column4Content : 'Column 4 Content'
        						})()}
        						change={this.handleFormChange}
        						propName='column4Content'
        					/>
			          </p>
			        </div>
			      </div>
			    </div>
			  </section>
			)
		}
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

export default connect (mapStateToProps, mapDispatchToProps) (MainPageWhyChooseUs)