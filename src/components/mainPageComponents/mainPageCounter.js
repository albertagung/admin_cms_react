import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../../actions/postAction'
import * as imageListAction from '../../actions/imageAction'

// Riek
import { RIEInput, RIETextArea } from 'riek'

// React Semantic UI
import { Dimmer, Loader, Segment, Popup } from 'semantic-ui-react'

// Image Upload Multiple Component
import ImageEditUploadMultiple from '../imageEditUploadMultiple'

class MainPageCounter extends Component {
	constructor (props) {
		super (props)
		this.state = {
			changingInput: {
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
		await this.props.fetchImageTitle('mainPageCounter')
		let objState = {
			isLoaded: true,
			imageClicked: this.props.images.length !== 0 ? this.props.images[0].imageKey : ''
		}
		let newObjState = Object.assign(this.state, objState)
		this.setState({
			newObjState
		})
	}

	getContent = () => {
		this.props.posts.forEach( async (dataPosts) => {
			if (dataPosts.sectionName === 'mainPageCounter') {
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
	}

	componentWillMount = () => {
		setTimeout(() => {
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
		const riekStyle = {
			color: 'black'
		}
		return (
			<section className="facts section-small bg-img">
        <div className="overlay"></div>
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-3">
              <span data-min="0" data-delay="5" data-increment="10" className="numscroller">
              <RIEInput
  							value={(() => {
    							return this.state.changingInput.column1Title !== '' ? this.state.changingInput.column1Title : 0
    						})()}
    						change={this.handleFormChange}
    						propName='column1Title'
    						editProps={{'style': riekStyle}}
      				/>
              </span>
              <h5 className="no-pad">
              	<RIEInput
    							value={(() => {
      							return this.state.changingInput.column1Content !== '' ? this.state.changingInput.column1Content : 'Column 1 Content'
      						})()}
      						change={this.handleFormChange}
      						propName='column1Content'
      						editProps={{'style': riekStyle}}
        				/>
              </h5>
            </div>
            <div className="col-sm-3">
              <span data-min="0" data-delay="5" data-increment="5" className="numscroller">
	              <RIEInput
	  							value={(() => {
	    							return this.state.changingInput.column2Title !== '' ? this.state.changingInput.column2Title : 0
	    						})()}
	    						change={this.handleFormChange}
	    						propName='column2Title'
	    						editProps={{'style': riekStyle}}
	      				/>
              </span>
              <h5 className="no-pad">
              	<RIEInput
    							value={(() => {
      							return this.state.changingInput.column2Content !== '' ? this.state.changingInput.column2Content : 'Column 2 Content'
      						})()}
      						change={this.handleFormChange}
      						propName='column2Content'
      						editProps={{'style': riekStyle}}
        				/>
              </h5>
            </div>
            <div className="col-sm-3">
              <span data-min="0" data-delay="5" data-increment="1" className="numscroller">
              	<RIEInput
	  							value={(() => {
	    							return this.state.changingInput.column3Title !== '' ? this.state.changingInput.column3Title : 0
	    						})()}
	    						change={this.handleFormChange}
	    						propName='column3Title'
	    						editProps={{'style': riekStyle}}
	      				/>
              </span>
              <h5 className="no-pad">
              	<RIEInput
    							value={(() => {
      							return this.state.changingInput.column3Content !== '' ? this.state.changingInput.column3Content : 'Column 3 Content'
      						})()}
      						change={this.handleFormChange}
      						propName='column3Content'
      						editProps={{'style': riekStyle}}
        				/>
              </h5>
            </div>
            <div className="col-sm-3">
              <span data-min="0" data-delay="5" data-increment="10" className="numscroller">
              	<RIEInput
	  							value={(() => {
	    							return this.state.changingInput.column4Title !== '' ? this.state.changingInput.column4Title : 0
	    						})()}
	    						change={this.handleFormChange}
	    						propName='column4Title'
	    						editProps={{'style': riekStyle}}
	      				/>
              </span>
              <h5 className="no-pad">
              	<RIEInput
    							value={(() => {
      							return this.state.changingInput.column4Content !== '' ? this.state.changingInput.column4Content : 'Column 4 Content'
      						})()}
      						change={this.handleFormChange}
      						propName='column4Content'
      						editProps={{'style': riekStyle}}
        				/>
              </h5>
            </div>
          </div>
        </div>
      </section>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestEditPost: editedPost => dispatch (postListAction.requestEditPost(editedPost)),
  }
}

export default connect (null, mapDispatchToProps) (MainPageCounter)