import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../../actions/postAction'
import * as imageListAction from '../../actions/imageAction'

// Riek
import { RIEInput, RIETextArea } from 'riek'

// React Semantic UI
import { Popup, Form, Dimmer, Loader, Segment } from 'semantic-ui-react'

// Image Upload Multiple Component
import ImageUploadMultiple from '../imageUploadMultiple'

class MainPageAbout extends Component {
	constructor (props) {
		super (props)
		this.state = {
			changingInput: {
				aboutUsTitle: '',
				aboutUsContent: '',
				visionTitle: '',
				visionContent: '',
				missionTitle: '',
				missionContent: ''
			},
			isLoaded: false
		}
	}


	getImages = async () => {
		await this.props.fetchImageTitle('mainPageAbout')
		let objLoaded = {
			isLoaded: true
		}
		let objState = Object.assign(this.state, objLoaded)
		this.setState({
			objState
		})
	}

	getContent = () => {
		this.props.posts.forEach((dataPosts) => {
			if (dataPosts.sectionName === 'mainPageAbout') {
				if (dataPosts.section === 'aboutUs') {
					let objAboutUs = {
						aboutUsTitle: dataPosts.title,
						aboutUsContent: dataPosts.content
					}
					let newObjChangingInput = Object.assign(this.state.changingInput, objAboutUs)
					this.setState({
						changingInput: newObjChangingInput
					})
				} else if (dataPosts.section === 'vision') {
						let objVision = {
							visionTitle: dataPosts.title,
							visionContent: dataPosts.content
						}
						let newObjChangingInput = Object.assign(this.state.changingInput, objVision)
						this.setState({
							changingInput: newObjChangingInput
						})
					} else if (dataPosts.section === 'mission') {
						let objMission = {
							missionTitle: dataPosts.title,
							missionContent: dataPosts.content
						}
						let newObjChangingInput = Object.assign(this.state.changingInput, objMission)
						this.setState({
							changingInput: newObjChangingInput
						})
					}
				}
			}
		)
	}

	componentWillMount = () => {
		setTimeout( async () => {
			await this.getContent()
			this.getImages()
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
				if (dataPosts.section === 'aboutUs') {
					let objAboutUs = {
						title: this.state.changingInput.aboutUsTitle || 'Title',
						content: this.state.changingInput.aboutUsContent || 'Content'
					}
					let newObjChangingInput = Object.assign(dataPosts, objAboutUs)
					this.props.requestEditPost(newObjChangingInput)
				} else if (dataPosts.section === 'vision') {
					let objVision = {
						title: this.state.changingInput.visionTitle,
						content: this.state.changingInput.visionContent
					}
					let newObjChangingInput = Object.assign(dataPosts, objVision)
					this.props.requestEditPost(newObjChangingInput)
				} else if (dataPosts.section === 'mission') {
					let objMission = {
						title: this.state.changingInput.missionTitle,
						content: this.state.changingInput.missionContent
					}
					let newObjChangingInput = Object.assign(dataPosts, objMission)
					this.props.requestEditPost(newObjChangingInput)
				} 
			}
		)
	}

	handleSubmit = async () => {
		await this.getMatchWithRedux()
		alert('Saved')
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
				<section id="about" className="section-small">
	          <div className="container">
	            <div className="row">
	              <div className="col-lg-6">
	                <h3>
	                	<RIEInput
	        						value={(() => {
	        							return this.state.changingInput.aboutUsTitle !== '' ? this.state.changingInput.aboutUsTitle : 'About Us Title'
	        						})()}
	        						change={this.handleFormChange}
	        						propName='aboutUsTitle'
	        					/>
	                </h3>
	                <p className="no-pad">
	                	<RIETextArea
	        						value={(() => {
	        							return this.state.changingInput.aboutUsContent !== '' ? this.state.changingInput.aboutUsContent : 'About Us Content'
	        						})()}
	        						change={this.handleFormChange}
	        						propName='aboutUsContent'
	        					/>
	                </p>
	                <br />
	                <h3>
	                	<RIEInput
	        						value={(() => {
	        							return this.state.changingInput.visionTitle !== '' ? this.state.changingInput.visionTitle : 'Vision Title'
	        						})()}
	        						change={this.handleFormChange}
	        						propName='visionTitle'
	        					/>
	                </h3>
	                <p className="no-pad">
	                	<RIETextArea
	        						value={(() => {
	        							return this.state.changingInput.visionContent !== '' ? this.state.changingInput.visionContent : 'Vision Content'
	        						})()}
	        						change={this.handleFormChange}
	        						propName='visionContent'
	        					/>
	                </p>
	                <br />
	                <h3>
	                	<RIEInput
	        						value={(() => {
	        							return this.state.changingInput.missionTitle !== '' ? this.state.changingInput.missionTitle : 'Mission Title'
	        						})()}
	        						change={this.handleFormChange}
	        						propName='missionTitle'
	        					/>
	                </h3>
	                <p className="no-pad">
	                	<RIETextArea
	        						value={(() => {
	        							return this.state.changingInput.missionContent !== '' ? this.state.changingInput.missionContent : 'Mission Content'
	        						})()}
	        						change={this.handleFormChange}
	        						propName='missionContent'
	        					/>
	                </p>
	              </div>
	              <div data-wow-duration="2s" data-wow-delay=".2s" className="col-lg-5 col-lg-offset-1 wow zoomIn">
	                <div id="carousel-light2" className="carousel slide carousel-fade">
	                  <ol className="carousel-indicators">
	                    <li data-target="#carousel-light2" data-slide-to="0" className="active"></li>
	                    <li data-target="#carousel-light2" data-slide-to="1"></li>
	                  </ol>
	                  <div role="listbox" className="carousel-inner">
	                  	{this.props.images.map((dataImages) => {
	                  		return (
	                  			<div className="item active" key={dataImages.imageKey}>
				                    <Popup
													    trigger={<img src={dataImages.url} alt="" className="img-responsive center-block" />}
													    content={
													    	<Form>
													    		<ImageUploadMultiple sendImageDataToUploader={'mainPageAbout'} sendEditImageAction={dataImages.imageKey} />
													    	</Form>
													    }
													    on='click'
													    position='top right'
													  />
			                    </div>
	                  		)
	                  	})}
	                </div>
	              </div>
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
    requestRemoveImage: imageKey => dispatch (imageListAction.requestRemoveImage(imageKey))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (MainPageAbout)