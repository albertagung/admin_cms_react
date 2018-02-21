import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../../actions/postAction'

// Semantic UI
import { Form, Segment, Button, Grid, Dimmer, Loader, Input, TextArea } from 'semantic-ui-react'

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
		}, 2000)
	}

  render () {
    return (
      <div>
        <h1>Section With Counter</h1>
        <Segment>
        	<Grid divided='vertically' style={{'margin': '1em'}}>
        		<Grid.Row columns={4} style={{'height': '150px'}}>
        			<Grid.Column>
        				<h1>{this.state.changingInput.counter1Title}</h1>
        				<p>{this.state.changingInput.counter1Content}</p>
        			</Grid.Column>
        			<Grid.Column>
        				<h1>{this.state.changingInput.counter2Title}</h1>
        				<p>{this.state.changingInput.counter2Content}</p>
        			</Grid.Column>
        			<Grid.Column>
        				<h1>{this.state.changingInput.counter3Title}</h1>
        				<p>{this.state.changingInput.counter3Content}</p>
        			</Grid.Column>
        			<Grid.Column>
        				<h1>{this.state.changingInput.counter4Title}</h1>
        				<p>{this.state.changingInput.counter4Content}</p>
        			</Grid.Column>
        		</Grid.Row>
        	</Grid>
        </Segment>
      	<Form>
      		<Grid style={{'margin': '1em'}}>
      			<Grid.Row columns={4} style={{'height': '150px'}}>
      				<Grid.Column>
      					<Form.Field 
		      				control={Input}
		      				label='Title for Counter 1'
		      				value={this.state.changingInput.counter1Title}
		      			/>
		      			<Form.Field 
		      				control={TextArea}
		      				label='Content for Counter 2'
		      				value={this.state.changingInput.counter2Content}
		      			/>
      				</Grid.Column>
      				<Grid.Column>
      					<Form.Field 
		      				control={Input}
		      				label='Title for Counter 2'
		      				value={this.state.changingInput.counter2Title}
		      			/>
		      			<Form.Field 
		      				control={TextArea}
		      				label='Content for Counter 2'
		      				value={this.state.changingInput.counter2Content}
		      			/>
      				</Grid.Column>
      				<Grid.Column>
      					<Form.Field 
		      				control={Input}
		      				label='Title for Counter 3'
		      				value={this.state.changingInput.counter3Title}
		      			/>
		      			<Form.Field 
		      				control={TextArea}
		      				label='Content for Counter 3'
		      				value={this.state.changingInput.counter3Content}
		      			/>
      				</Grid.Column>
      				<Grid.Column>
      					<Form.Field 
		      				control={Input}
		      				label='Title for Counter 4'
		      				value={this.state.changingInput.counter4Title}
		      			/>
		      			<Form.Field 
		      				control={TextArea}
		      				label='Content for Counter 4'
		      				value={this.state.changingInput.counter4Content}
		      			/>
      				</Grid.Column>
      			</Grid.Row>
      		</Grid>
      	</Form>
      </div>
    )
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