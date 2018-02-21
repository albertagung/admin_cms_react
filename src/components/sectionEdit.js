import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../actions/postAction'

// Semantic UI
import { Form, Segment, Button } from 'semantic-ui-react'

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

// Options
let sectionOptions = [
  {
    text: 'About Us',
    value: 'aboutUs'
  },
  {
    text: 'Vision',
    value: 'vision'
  },
  {
    text: 'Mission',
    value: 'mission'
  }
]

class SectionEdit extends Component {
  constructor (props) {
    super (props)
    this.state = {
      postFromRedux: {
        title: '',
        section: '',
        author: ''
      },
      sectionIsLoaded: false
    }
  }

  getSectionName = async (e, { value }) => {
    await this.setState(
      {
        postFromRedux: {
          title: '',
          section: '',
          author: ''
        }
      }
    )
    let objSectionName = {
      section: value
    }
    let objNewPostFromRedux = Object.assign(this.state.postFromRedux, objSectionName)
    await this.setState(
      {
        postFromRedux: objNewPostFromRedux
      }
    )
    this.getPost()
  }

  getPost = () => {
    let sectionName = this.state.postFromRedux.section
    this.props.posts.forEach((dataPost) => {
      if (dataPost.section === sectionName) {
        let html = dataPost.content
        let contentBlock = htmlToDraft(html)
        let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        let editorState = EditorState.createWithContent(contentState)
        this.setState(
          {
            postFromRedux: dataPost,
            editorState
          }
        )
      }
    })
  }

  onEditorStateChange = (editorState) => {
   this.setState({
     editorState,
   })
 }

 handleInputChange = (event) => {
   let reactElement = htmlToReactParser.parse(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
   let reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement)
   let postFromRedux = Object.assign({}, this.state.postFromRedux)
   if (event.target !== undefined) {
     postFromRedux[event.target.name] = event.target.value
     this.setState(
       {
         postFromRedux
       }
     )
   }
   postFromRedux['content'] = reactHtml
   this.setState(
     {
       postFromRedux
     }
   )
 }

 handleSubmit = () => {
   alert('Your post has been saved')
   // event.preventDefault()
   // this.props.someFunction()
   this.props.requestEditPost(this.state.postFromRedux)
 }

 // renderIfEmpty = () => {
 //  if (this.state.postFromRedux.section === '') {
 //    return (<h5>Please Choose Section First</h5>)
 //  }
 // }

  render () {
    const { editorState } = this.state
    return (
      <div>
        <Form>
          <Form.Select
            label='Choose Section to Edit'
            options={sectionOptions}
            name='section'
            onChange={this.getSectionName}
          />
          {(() => {
            if (this.state.postFromRedux.section === '') {
              return (
                <h5>Please Choose Section First</h5>
              )
            } else {
              return (
                <div>
                  <Form.Field>
                    <input  name="title" type="text" className="form-control" id="inputTitle" placeholder="Title" value={this.state.postFromRedux.title} onChange={this.handleInputChange} />
                  </Form.Field>
                  <Form.Field>
                    <input  name="author" type="text" className="form-control" id="inputAuthor" placeholder="Author" value={this.state.postFromRedux.author} onChange={this.handleInputChange} />
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
                  <Button content='Submit' onClick={this.handleSubmit} />
                </div>
              )
            }
          })()}
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.postList.posts !== undefined) {
    return {
      posts: state.postList.posts
    }
  } else {
    return {
      posts: []
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: post => dispatch (postListAction.getPosts(post)),
    requestEditPost: editedPost => dispatch (postListAction.requestEditPost(editedPost))
  }
}

export default connect (mapStateToProps, mapDispatchToProps, null, { withRef: true }) (SectionEdit)
