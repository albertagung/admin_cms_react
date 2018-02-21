import React, { Component } from 'react'

// Semantic UI
import { Form, Input, Segment } from 'semantic-ui-react'

// Image Upload Component
import ImageUpload from './imageUpload'


class BannerEditor extends Component {
  constructor (props) {
    super (props)
    this.state = {
      bannerTitle: ''
    }
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    )
  }

  render () {
    return (
      <div>
        <Segment>
          <h4>Billboard Image</h4>
            <Form.Group widths="equal">
              <Form.Field
                name="bannerTitle"
                control={Input}
                placeholder="Input Banner Title"
                value={this.state.bannerTitle}
                onChange={this.handleChange}/>
            </Form.Group>
            <ImageUpload sendBannerTitleFromBannerEditor={this.state} />
        </Segment>
      </div>
    )
  }

}

export default BannerEditor
