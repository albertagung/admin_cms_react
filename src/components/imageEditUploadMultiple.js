import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

// Semantic UI
import { Button, Popup, Form, Input } from 'semantic-ui-react'

class ImageUploadMultiple extends Component {
  constructor (props) {
    super (props)
    this.state = {
      preview: '',
      file: [],
      title: this.props.sendImageDataToUploader,
      imageKey: this.props.sendImageKeyToUploader,
      imageHeader: '',
      imageDescription: ''
    }
  }

  handleChangeImageData = (e, { value }) => {
    this.setState({
      [e.target.name]: value
    })
  }

  onDrop = (files) => {
    this.setState(
      {
        file: files
      }
    )
  }

  handleUpload = () => {
    return new Promise ( async (resolve, reject) => {
      const req = request.post('http://localhost:3025/image_multiple/upload')
      let images = this.state.file
      // Adding extra object to send the imageData
      req.field('imageData', JSON.stringify(this.state))  
      // Attaching image buffer file    
      await images.forEach((dataImages) => {
        resolve(req.attach('field_name', dataImages))
      })
    })
  }

  render () {
    const imgStyle = {
      maxHeight: '300px',
      maxWidth: '300px',
      display: 'block',
      margin: '0 auto'
    }
    const buttonStyle = {
      display: 'block',
      margin: 'auto',
      marginTop: '1em'      
    }
    const divStyle = {
      paddingTop: '0'
    }
    const dropzoneStyle = {
      width: '820px'
    }
    const h3Style = {
      textAlign: 'center',
      marginTop: '0'
    }
    const activeStyle = {
      borderStyle: 'solid',
      borderColor: '#6c6',
      backgroundColor: '#eee'
    }
    if (this.state.file.length === 0) {
      return (
        <div>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              name='imageHeader'
              label='Image Title'
              onChange={this.handleChangeImageData}
              value={this.state.imageHeader}
            />
            <Form.Field
              control={Input}
              name='imageDescription'
              label='Image Description'
              onChange={this.handleChangeImageData}
              value={this.state.imageDescription}
            />
          </Form.Group>
          <Dropzone onDrop={this.onDrop} multiple={false} style={dropzoneStyle}>
            <div style={divStyle}><img style={imgStyle} src={this.state.preview} alt=""/><h3 style={h3Style}>Click / Drop Image Here!</h3></div>
          </Dropzone>
          <Popup trigger={<Button basic color="red" style={buttonStyle}>Upload now!</Button>} content='Please drag / drop some files first' position='bottom center' />
        </div>
      )
    } else {
      return (
        <div>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              name='imageHeader'
              label='Image Title'
              onChange={this.handleChangeImageData}
              value={this.state.imageHeader}
            />
            <Form.Field
              control={Input}
              name='imageDescription'
              label='Image Description'
              onChange={this.handleChangeImageData}
              value={this.state.imageDescription}
            />
          </Form.Group>
          <Dropzone onDrop={this.onDrop} multiple={true} style={dropzoneStyle} activeStyle={activeStyle}>
            {this.state.file.map((dataFile) => {
              return (
                <div key={dataFile.preview} style={divStyle}>
                  <img style={imgStyle} src={dataFile.preview} alt=""/>
                </div>
              )
            })}
          </Dropzone>
          <Popup 
            trigger={
              <Button 
                basic color="green" 
                onClick={ async () => {
                    await this.props.sendConfirmation(false)
                    await this.handleUpload()
                    .then(() => {
                      return new Promise ((resolve, reject) => {
                        resolve(this.props.sendEditImageAction(this.state.imageKey, this.state.title))
                      })
                      .then(() => {
                        return new Promise ((resolve, reject) => {
                          setTimeout(() => {
                            resolve(this.props.sendFetchAfterUpdateImage())
                          }, 3000)
                        })
                        .then(() => {
                          this.props.sendConfirmation(true)
                        })
                      })
                    }) 
                  }
                } 
                style={buttonStyle}>Edit Now!
              </Button>
            } 
            content='Click when you are ready to upload' position='bottom center' />
        </div>
      )
    }
  }
}

export default ImageUploadMultiple
