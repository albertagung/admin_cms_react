import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postListAction from '../../actions/postAction'

// Semantic UI
import { Form, Segment, Button, Grid, Dimmer, Loader } from 'semantic-ui-react'

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
let columnOptions = [
  {
    text: 'Column 1',
    value: 'column1'
  },
  {
    text: 'Column 2',
    value: 'column2'
  },
  {
    text: 'Column 3',
    value: 'column3'
  },
  {
    text: 'Column 4',
    value: 'column4'
  }
]

class SectionWithThreeComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      postFromRedux: {
        title: '',
        section: '',
        sectionTitle: '',
        author: ''
      },
      loaderSubmit: false
    }
  }

  getSection = async (e, { value }) => {
    await this.setState(
      {
        postFromRedux: {
          title: '',
          section: '',
          sectionTitle: '',
          author: ''
        }
      }
    )
    let objSection = {
      section: value
    }
    let objNewPostFromRedux = Object.assign(this.state.postFromRedux, objSection)
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

  handleSectionTitleChange = () => {
    this.props.posts.forEach((dataPosts) => {
      if (dataPosts.sectionName === 'sectionWithThreeComponents') {
        dataPosts.sectionTitle = this.state.postFromRedux.sectionTitle
        this.props.requestEditPost(dataPosts)
      }
    })
  }

  handleSubmit = async () => {
    await this.handleSectionTitleChange()
    await this.setState({loaderSubmit: true})
    setTimeout( async () => {
      await this.props.requestEditPost(this.state.postFromRedux)
      this.setState({loaderSubmit: false})
    }, 1000);
  }

  render () {
    const gridStyle = {
      borderStyle: 'solid',
      borderWidth: '0.5px',
      borderRadius: '10px',
      borderColor: 'green'
    }
    const { editorState } = this.state
    const { title } = this.state.postFromRedux
    const { section } = this.state.postFromRedux
    const { sectionTitle } = this.state.postFromRedux
    return (
      <div>
        {(() => {
          if (this.state.loaderSubmit === true) {
            return (
              <Dimmer active page>
                <Loader>Loading</Loader>
              </Dimmer>
            )
          }
        })()}
        <h1>Section With Three Components</h1>
        <Segment>
          <h3>{sectionTitle}</h3>
          <Grid divided='vertically' style={{'margin': '1em'}}>
            {(() => {
              if (section === 'column1') {
                return (
                  <Grid.Row columns={4} style={{'height': '300px'}}>
                    <Grid.Column stretched style={gridStyle}>
                    {this.props.posts.map((dataPosts) => {
                        return (
                          (() => {
                            if (dataPosts.section === 'column1') {
                              return (
                                <div key={dataPosts.title}>
                                  <h5>{dataPosts.title}</h5>
                                  <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                </div>
                              )
                            }
                          })()
                        )
                    })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column2') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column3') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column4') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                  </Grid.Row>
                )
              } else if (section === 'column2') {
                return (
                  <Grid.Row columns={4} style={{'height': '300px'}}>
                    <Grid.Column>
                    {this.props.posts.map((dataPosts) => {
                        return (
                          (() => {
                            if (dataPosts.section === 'column1') {
                              return (
                                <div key={dataPosts.title}>
                                  <h5>{dataPosts.title}</h5>
                                  <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                </div>
                              )
                            }
                          })()
                        )
                    })}
                    </Grid.Column>
                    <Grid.Column stretched style={gridStyle}>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column2') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column3') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column4') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                  </Grid.Row>
                )
              } else if (section === 'column3') {
                return (
                  <Grid.Row columns={4} style={{'height': '300px'}}>
                    <Grid.Column>
                    {this.props.posts.map((dataPosts) => {
                        return (
                          (() => {
                            if (dataPosts.section === 'column1') {
                              return (
                                <div key={dataPosts.title}>
                                  <h5>{dataPosts.title}</h5>
                                  <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                </div>
                              )
                            }
                          })()
                        )
                    })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column2') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column stretched style={gridStyle}>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column3') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column4') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                  </Grid.Row>
                )
              } else if (section === 'column4') {
                return (
                  <Grid.Row columns={4} style={{'height': '300px'}}>
                    <Grid.Column>
                    {this.props.posts.map((dataPosts) => {
                        return (
                          (() => {
                            if (dataPosts.section === 'column1') {
                              return (
                                <div key={dataPosts.title}>
                                  <h5>{dataPosts.title}</h5>
                                  <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                </div>
                              )
                            }
                          })()
                        )
                    })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column2') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column3') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                    <Grid.Column stretched style={gridStyle}>
                        {this.props.posts.map((dataPosts) => {
                            return (
                              (() => {
                                if (dataPosts.section === 'column4') {
                                  return (
                                    <div key={dataPosts.title}>
                                      <h5>{dataPosts.title}</h5>
                                      <div dangerouslySetInnerHTML={{__html: dataPosts.content}} />
                                    </div>
                                  )
                                }
                              })()
                            )
                        })}
                    </Grid.Column>
                  </Grid.Row>
                )
              } else {
                return (
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <h4 style={{'textAlign': 'center'}}>Please Choose Column First</h4>
                    </Grid.Column>
                  </Grid.Row>
                )
              }
            })()}
          </Grid>
        </Segment>
        <Form>
          <Segment>
            <Form.Select
            label='Choose Column to Edit'
            options={columnOptions}
            name='section'
            onChange={this.getSection}
            />
            <Form.Field>
              <input 
                name="title" type="text" 
                className="form-control" 
                id="inputTitle" 
                placeholder="Title" 
                value={title} 
                onChange={this.handleInputChange} 
              />
            </Form.Field>
            <Form.Field>
              <input 
                name="sectionTitle" type="text" 
                className="form-control" 
                id="inputSectionTitle" 
                placeholder="Section Title" 
                value={sectionTitle}
                onChange={this.handleInputChange} 
              />
            </Form.Field>
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
          {(() => {
            if (section !== '') {
              return (
                <Button content='Submit' onClick={this.handleSubmit} />
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

export default connect (mapStateToProps, mapDispatchToProps) (SectionWithThreeComponent)