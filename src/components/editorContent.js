import React, { Component } from 'react'

// Semantic UI
import { Container, Advertisement } from 'semantic-ui-react'

class EditorContent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      header: {
        billboard: 'Billboard Text'
      },
      content: {
        paragraph1: 'Paragraph 1',
        paragraph2: 'Paragraph 2'
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        header: {
          billboard: ((nextProps.header.title !== '' && nextProps.header.text[0] !== '') ? nextProps.header.text[0] : 'Billboard Text')
        },
        content: {
          paragraph1: ((nextProps.content.title !== '' && nextProps.content.text[0] !== '') ? nextProps.content.text[0] : 'Paragraph 1'),
          paragraph2: ((nextProps.content2.title !== '' && nextProps.content2.text[0] !== '') ? nextProps.content2.text[0] : 'Paragraph 2')
        }
      }
    )
  }

  render () {
    const billboardStyle = {
      width: '100%'
    }
    return (
      <div>
        <Container fluid>
          <Advertisement style={billboardStyle} unit="billboard" test={this.state.header.billboard}></Advertisement>
          <Advertisement style={billboardStyle} unit="billboard" test={this.state.content.paragraph1}></Advertisement>
          <Advertisement style={billboardStyle} unit="billboard" test={this.state.content.paragraph2}></Advertisement>
        </Container>
      </div>
    )
  }

}

export default EditorContent
