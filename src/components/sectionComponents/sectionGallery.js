import React, { Component } from 'react'
import { connect } from 'react-redux'

// Image Actions
import * as imageListAction from '../../actions/imageAction'

// Semantic UI
import { Segment, Button, Grid, Image, Reveal, Dimmer } from 'semantic-ui-react'

// Multiple Dropzone
import ImageUploadMultiple from '../imageUploadMultiple'

class SectionGallery extends Component {
	constructor (props) {
		super (props)
		this.state = {
			sectionImages: []
		}
	}
	
	getImages = async () => {
		let sectionImageArr = []
		await this.props.fetchImageTitle('sectionGallery')
		await this.props.images.forEach((dataImages) => {
			if (dataImages.imageTitle === 'sectionGallery') {
				sectionImageArr.push(dataImages)
			}
		})
		this.setState({
			sectionImages: sectionImageArr
		})
	}

	componentWillMount = () => {
		setTimeout(() => {
			this.getImages()
		}, 2000)
	}

	render () {
		return (
			<div>
				<Segment>
					<Grid divided='vertically' style={{'margin': '1em'}}>
						<Grid.Row columns={4}>
							{this.state.sectionImages.map((dataImages) => {
								return (
									<Grid.Column key={dataImages.imageKey} style={{'padding': '0px', 'margin': '0px'}}>
										<Image size='medium' src={dataImages.url} />
									</Grid.Column>
								)
							})}
						</Grid.Row>
					</Grid>
				</Segment>
				<Segment>
					<ImageUploadMultiple sendImageDataToUploader={'sectionGallery'} />
				</Segment>
			</div>
		)
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
