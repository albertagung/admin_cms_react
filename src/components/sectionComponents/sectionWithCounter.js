import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../../actions/postAction'

// Semantic UI
import { Form, Segment, Button, Grid, Dimmer, Loader, Input, TextArea } from 'semantic-ui-react'

// Riek inline edit
import { RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect } from 'riek'

class SectionWithCounter extends Component {
	constructor (props) {
		super (props)
		this.state = {
			changingInput: {
				counter1Title: '',
				counter1Content: '',
				counter2Title: '',
				counter2Content: '',
				counter3Title: '',
				counter3Content: '',
				counter4Title: '',
				counter4Content: ''
			}
		}
	}

	getContent = () => {
		this.props.posts.forEach((dataPosts) => {
			if (dataPosts.sectionName === 'sectionWithCounter') {
				if (dataPosts.section === 'counter1') {
					let objDataPost1 = {
						counter1Title: dataPosts.title,
						counter1Content: dataPosts.content
					}
					let newObjChangingInput = Object.assign(this.state.changingInput, objDataPost1)
					this.setState({
						changingInput: newObjChangingInput
					})
				} else if (dataPosts.section === 'counter2') {
					let objDataPost2 = {
						counter2Title: dataPosts.title,
						counter2Content: dataPosts.content
					}
					let newObjChangingInput = Object.assign(this.state.changingInput, objDataPost2)
					this.setState({
						changingInput: newObjChangingInput
					})
				} else if (dataPosts.section === 'counter3') {
					let objDataPost3 = {
						counter3Title: dataPosts.title,
						counter3Content: dataPosts.content
					}
					let newObjChangingInput = Object.assign(this.state.changingInput, objDataPost3)
					this.setState({
						changingInput: newObjChangingInput
					})
				} else if (dataPosts.section === 'counter4') {
					let objDataPost4 = {
						counter4Title: dataPosts.title,
						counter4Content: dataPosts.content
					}
					let newObjChangingInput = Object.assign(this.state.changingInput, objDataPost4)
					this.setState({
						changingInput: newObjChangingInput
					})
				}
			}
		})
	}

	componentWillMount = () => {
		setTimeout(() => {
			this.getContent()
		}, 1000)
	}

	handleFormChange = (task) => {
		let objNewState = Object.assign(this.state.changingInput, task)
		this.setState({
			changingInput: objNewState
		})
	}

	getMatchWithRedux = () => {
		this.props.posts.forEach((dataPosts) => {
				if (dataPosts.section === 'counter1') {
					let objCounter1 = {
						title: this.state.changingInput.counter1Title,
						content: this.state.changingInput.counter1Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objCounter1)
					this.props.requestEditPost(newObjChangingInput)
				} else if (dataPosts.section === 'counter2') {
					let objCounter2 = {
						title: this.state.changingInput.counter2Title,
						content: this.state.changingInput.counter2Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objCounter2)
					this.props.requestEditPost(newObjChangingInput)
				} else if (dataPosts.section === 'counter3') {
					let objCounter3 = {
						title: this.state.changingInput.counter3Title,
						content: this.state.changingInput.counter3Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objCounter3)
					this.props.requestEditPost(newObjChangingInput)
				} else if (dataPosts.section === 'counter4') {
					let objCounter4 = {
						title: this.state.changingInput.counter4Title,
						content: this.state.changingInput.counter4Content
					}
					let newObjChangingInput = Object.assign(dataPosts, objCounter4)
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
  	if (this.state.changingInput.counter1Title === '') {
  		return (
  			<Segment>
  				<Dimmer active page>
  					<Loader>Loading</Loader>
  				</Dimmer>
  			</Segment>
  		)
  	} else {
  		return (
	      <div>
	        <h1>Section With Counter</h1>
	        <Segment>
	        	<Grid divided='vertically' style={{'margin': '1em'}}>
	        		<Grid.Row columns={4} style={{'height': '100px'}}>
	        			<Grid.Column>
	        				<h1>
	        					<RIEInput
	        						value={this.state.changingInput.counter1Title}
	        						change={this.handleFormChange}
	        						propName='counter1Title'
	        					/>
	        				</h1>
	        				<p>
	        					<RIEInput
	        						value={this.state.changingInput.counter1Content}
	        						change={this.handleFormChange}
	        						propName='counter1Content'
	        					/>
	        				</p>
	        			</Grid.Column>
	        			<Grid.Column>
	        				<h1>
	        					<RIEInput
	        						value={this.state.changingInput.counter2Title}
	        						change={this.handleFormChange}
	        						propName='counter2Title'
	        					/>
	        				</h1>
	        				<p>
	        					<RIEInput
	        						value={this.state.changingInput.counter2Content}
	        						change={this.handleFormChange}
	        						propName='counter2Content'
	        					/>
	        				</p>
	        			</Grid.Column>
	        			<Grid.Column>
	        				<h1>
	        					<RIEInput
	        						value={this.state.changingInput.counter3Title}
	        						change={this.handleFormChange}
	        						propName='counter3Title'
	        					/>
	        				</h1>
	        				<p>
	        					<RIEInput
	        						value={this.state.changingInput.counter3Content}
	        						change={this.handleFormChange}
	        						propName='counter3Content'
	        					/>
	        				</p>
	        			</Grid.Column>
	        			<Grid.Column>
	        				<h1>
	        					<RIEInput
	        						value={this.state.changingInput.counter4Title}
	        						change={this.handleFormChange}
	        						propName='counter4Title'
	        					/>
	        				</h1>
	        				<p>
	        					<RIEInput
	        						value={this.state.changingInput.counter4Content}
	        						change={this.handleFormChange}
	        						propName='counter4Content'
	        					/>
	        				</p>
	        			</Grid.Column>
	        		</Grid.Row>
	        	</Grid>
	        </Segment>
	      	<Button content='Submit' onClick={this.handleSubmit}/>
	      </div>
    	)
  	}
  }
}

const mapStateToProps = (state) => {
  if (state.postList.posts !== undefined) {
    return {
      posts: state.postList.posts
    }
  } else {
    return {
      posts: []
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: post => dispatch (postListAction.getPosts(post)),
    requestEditPost: editedPost => dispatch (postListAction.requestEditPost(editedPost))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (SectionWithCounter)