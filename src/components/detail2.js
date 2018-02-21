import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../actions/postAction'

// Semantic UI
import { Button, Form, Segment } from 'semantic-ui-react'

// React draft-wysiwyg
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// React html-to-react
let ReactDOMServer = require('react-dom/server')
let HtmlToReactParser = require('html-to-react').Parser
let htmlToReactParser = new HtmlToReactParser()

class Detail2 extends Component {
  constructor (props) {
    super (props)
    this.state = {
      editorState: EditorState.createEmpty(),
      newPost: {
        title: '',
        content: '',
        author: ''
      }
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState(
      {
        editorState
      }
    )
  }

  someFunction = () => {
    this.props.callbackFromParent('apa')
  }

  handleInputChange = (event) => {
    let reactElement = htmlToReactParser.parse(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
    let reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement)
    let newPost = Object.assign({}, this.state.newPost)
    if (event.target !== undefined) {
      newPost[event.target.name] = event.target.value
      this.setState(
        {
          newPost
        }
      )
    }
    newPost['content'] = reactHtml
    this.setState(
      {
        newPost
      }
    )
  }

  handleSubmit = (event) => {
    alert('Your post has been saved')
    event.preventDefault()
    this.props.requestNewPosts(this.state.newPost)
    this.setState(
      {
        editorState: EditorState.createEmpty(),
        newPost: {
          title: '',
          author: ''
        }
      }
    )
  }

  render () {
    this.someFunction()
    let { editorState } = this.state
    return (
      <div>
        <Form>
          <label>Create New Post</label>
          <Form.Field>
            <input name="title" type="text" className="form-control" id="inputTitle" placeholder="Title" value={this.state.newPost.title} onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <input name="author" type="text" className="form-control" id="inputAuthor" placeholder="Author" value={this.state.newPost.author} onChange={this.handleInputChange} />
          </Form.Field>
          <Segment>
            <Editor
            name="content"
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            onChange={this.handleInputChange}
            placeholder="Input content"
            />
          </Segment>
          <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestNewPosts: post => dispatch (postListAction.requestNewPosts(post))
  }
}

export default connect (null, mapDispatchToProps) (Detail2)
