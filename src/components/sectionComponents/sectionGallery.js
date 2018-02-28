import React, { Component } from 'react'
import { connect } from 'react-redux'

// Image Actions
import * as imageListAction from '../../actions/imageAction'

// Semantic UI
import { Segment, Button, Grid, Image, Reveal, Dimmer, Dimmable, Form, Loader } from 'semantic-ui-react'

// Multiple Dropzone
import ImageUploadMultiple from '../imageUploadMultiple'

class SectionGallery extends Component {
	constructor (props) {
		super (props)
		this.state = {
			isLoaded: false
		}
	}
	
	getImages = async () => {
		// Fetching image by 'sectionGallery' title
		await this.props.fetchImageTitle('mainPageAbout')
		this.setState({isLoaded: true})
	}

	componentWillMount = () => {
		setTimeout(() => {
			this.getImages()
		}, 1000)
	}

	handleShow = () => {
		let objDimmer = {
			active: true
		}
		let objState = Object.assign(this.state, objDimmer)
		this.setState({
			objState
		})
	}

  handleHide = () => {
  	let objDimmer = {
			active: false
		}
		let objState = Object.assign(this.state, objDimmer)
		this.setState({
			objState
		})
  }

	render () {
		const { active } = this.state
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
				<div>
					<Segment>
						<Grid divided='vertically' style={{'margin': '1em'}}>
							<Grid.Row columns={4}>
								{this.props.images.map((dataImages) => {
									const content = (
										<div>
											<h6>{dataImages.imageHeader}</h6>
											<p>{dataImages.imageDescription}</p>
										</div>
									)
									return (
										<Grid.Column key={dataImages.imageKey} style={{'padding': '0px', 'margin': '0px'}}>
											<Dimmer.Dimmable
								        as={Image}
								        dimmed={active}
								        dimmer={{ active, content }}
								        onMouseEnter={this.handleShow}
								        onMouseLeave={this.handleHide}
								        size='medium'
								        src={dataImages.url}
								      />
										</Grid.Column>
									)
								})}
							</Grid.Row>
						</Grid>
					</Segment>
					<Segment>
						<Form>
							<ImageUploadMultiple sendImageDataToUploader={'mainPageAbout'} />
						</Form>
					</Segment>
				</div>
			)
		}
	}

}

const mapStateToProps = (state) => {
    return {
      images: state.imageList.images
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestRemoveImage: imageKey => dispatch (imageListAction.requestRemoveImage(imageKey)),
    // Get images based on section id
    fetchImageTitle: imageTitle => dispatch (imageListAction.fetchImageTitle(imageTitle))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (SectionGallery)
