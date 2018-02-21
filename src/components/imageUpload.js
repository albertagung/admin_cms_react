import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import upload from 'superagent'

// Semantic UI
import { Button } from 'semantic-ui-react'

class ImageUpload extends Component {
  constructor (props) {
    super (props)
    this.state = {
      preview: '',
      file: {},
      title: ''
    }
  }

  onDrop = (files) => {
    console.log(files)
    this.setState(
      {
        preview: files[0].preview,
        file: files[0]
      }
    )
  }

  handleUpload = () => {
    upload.post('http://localhost:3025/image/upload')
    // Adding extra object to send the imageData
    .field('imageData', JSON.stringify(this.state.title))
    // Attaching image buffer file
    .attach('field_name', this.state.file)
    .end((err, res) => {
      if (err) console.log(err)
      alert('Image has been uploaded!')
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        title: nextProps.sendBannerTitleFromBannerEditor
      }
    )
  }

  render () {
    const imgStyle = {
      maxHeight: '300px',
      maxWidth: '300px'
    }
    const buttonStyle = {
      marginTop: '1em'
    }
    const divStyle = {
      paddingTop: '10em'
    }
    if (this.state.preview === '') {
      return (
        <div>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            <div style={divStyle}><img style={imgStyle} src={this.state.preview} alt=""/>Click / Drop Image Here!</div>
          </Dropzone>
          <Button basic disabled color="green" onClick={this.handleUpload} style={buttonStyle}>Upload now!</Button>
        </div>
      )
    } else {
      return (
        <div>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            <div><img style={imgStyle} src={this.state.preview} alt=""/></div>
          </Dropzone>
          <Button basic color="green" onClick={this.handleUpload} style={buttonStyle}>Upload now!</Button>
        </div>
      )
    }
  }
}

export default ImageUpload
