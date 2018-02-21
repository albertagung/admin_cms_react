import React, { Component } from 'react'

// Semantic UI
import { Container } from 'semantic-ui-react'

// Editor Tab Component
import EditorTab from './editorTab'

// Define page name
const pageName = 'homepage'

class ContentEditor extends Component {
  constructor (props) {
    super (props)
    this.state = {
      pageName: pageName
    }
  }

  render () {
    return (
      <div>
        <Container fluid>
          <h1>Content Editor</h1>
          <EditorTab pageName={this.state.pageName}></EditorTab>
        </Container>
      </div>
    )
  }

}

export default ContentEditor
