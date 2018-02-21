import React, { Component } from 'react'

// Semantic UI
import { Button, Header, Modal } from 'semantic-ui-react'

// Edit post component
import EditPost from './editPost'

class EditPostModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => {
    this.setState(
      {
        modalOpen: true
      }
    )
  }

  handleClose = () => {
    this.setState(
      {
        modalOpen: false
      }
    )
  }

  handleSubmit = async () => {
    let editPost = this.refs.edit.getWrappedInstance()
    await editPost.handleSubmit()
    this.setState(
      {
        modalOpen: false
      }
    )
  }

  render () {
    return (
      <Modal
        trigger={<Button basic color="green" onClick={this.handleOpen}>Edit Post</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          <Header>Edit Post</Header>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <EditPost ref='edit' receivePostIdFromParent={this.props.postIdFromParent} someFunction={this.closeModal} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Close</Button>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
  }

}


export default EditPostModal
