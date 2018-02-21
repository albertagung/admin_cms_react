import React, { Component } from 'react'

// Semantic UI
import { Segment } from 'semantic-ui-react'

// React draft WYSIWYG
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// React html-to-react
let ReactDOMServer = require('react-dom/server')
let HtmlToReactParser = require('html-to-react').Parser
let htmlToReactParser = new HtmlToReactParser()

class EditProductDescription extends Component {
  constructor (props) {
    super (props)
    this.state = {
      productId: this.props.sendProductDataToEditProduct._id,
      productDescription: this.props.sendProductDataToEditProduct.description
    }
  }

  getProduct = () => {
    let html = this.state.productDescription
    let contentBlock = htmlToDraft(html)
    let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
    let editorState = EditorState.createWithContent(contentState)
    this.setState(
      {
        editorState
      }
    )
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  handleInputChange = async (event) => {
    let reactElement = htmlToReactParser.parse(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
    let reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement)
    await this.setState(
      {
        productDescription: reactHtml
      }
    )
    this.sendProductDescriptionToProductEditor()
  }

  componentDidMount = () => {
    this.getProduct()
  }

  sendProductDescriptionToProductEditor = () => {
    this.props.receiveProductDescriptionFromEditor(this.state.productDescription)
  }

  render () {
    const { editorState } = this.state
    return (
      <div>
        <Segment>
          <Editor
          name="description"
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          onChange={this.handleInputChange}
          placeholder="Product Description"
          />
        </Segment>
      </div>
    )
  }

}

export default EditProductDescription