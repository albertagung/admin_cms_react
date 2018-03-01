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
				missionContent: '',
				images: []
			},
			isLoaded: false,
			imageClicked: ''
		}
	}


	getImages = () => {
		if (this.state.changingInput.images.length === 0) {
			this.props.images.forEach((dataImages) => {
				if (dataImages.imageTitle === 'mainPageAbout') {
					this.state.changingInput.images.push(dataImages)
				}
			})
		} else {
			console.log('masuk else')
			let objImages = {
				images: this.props.images
			}
			let newObjChangingInput = Object.assign(this.state.changingInput, objImages)
			this.setState({
				changingInput: newObjChangingInput
			})
		}
		let objState = {
			isLoaded: true,
			imageClicked: this.state.changingInput.images.length !== 0 ? this.state.changingInput.images[0].imageKey : ''
		}
		let newObjState = Object.assign(this.state, objState)
		this.setState({
			newObjState
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
			await this.getImages()
			this.getContent()
		}, 3000)
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
						title: this.state.changingInput.aboutUsTitle,
						content: this.state.changingInput.aboutUsContent
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

	carouselIndicatorClick = (imageKey) => {
		let objCarouselIndicator = {
			imageClicked: imageKey
		}
		let newObjState = Object.assign(this.state, objCarouselIndicator)
		this.setState({
			newObjState
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
	                  	{this.state.changingInput.images.map((dataImages, index) => {
	                  		return (
	                  			<li 
	                  				data-target="#carousel-light2" 
	                  				data-slide-to={index}  
	                  				onClick={() => this.carouselIndicatorClick(dataImages.imageKey)} 
	                  				key={dataImages.imageKey}>
	                  			</li>
	                  		)
	                  	})}
	                  </ol>
	                  <div role="listbox" className="carousel-inner">
	                  	{this.state.changingInput.images.map((dataImages) => {
	                  		return (
	                  			<div 
	                  				className={`item ${this.state.imageClicked === dataImages.imageKey ? 'active' : ''}`} 
	                  				key={dataImages.imageKey}
	                  			>
				                    <Popup
													    trigger={<img src={dataImages.url} alt="" className="img-responsive center-block" />}
													    content={
													    	<Form>
													    		<ImageEditUploadMultiple 
													    			sendImageDataToUploader={'mainPageAbout'}
													    			sendImageKeyToUploader={dataImages.imageKey} 
													    			sendEditImageAction={this.props.requestRemoveImage}
													    			sendFetchAfterUpdateImage={this.getImages}
													    			sendConfirmation={this.getConfirmationFromUploader}
													    		/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    requestEditPost: editedPost => dispatch (postListAction.requestEditPost(editedPost)),
    // Get images based on product id
    fetchImageTitle: imageTitle => dispatch (imageListAction.fetchImageTitle(imageTitle)),
    requestRemoveImage: (imageKey, imageTitle) => dispatch (imageListAction.requestRemoveImage(imageKey, imageTitle))
  }
}

export default connect (null, mapDispatchToProps) (MainPageAbout)