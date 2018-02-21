import React, { Component } from 'react'

// Semantic UI
import { Button, Form, Sidebar, Menu, Container } from 'semantic-ui-react'

// Banner Editor
import BannerEditor from './bannerEditor'

// Editor Content Component
import EditorContent from './editorContent'

class EditorTab extends Component {
  constructor (props) {
    super (props)
    this.state = {
      pageName: this.props.pageName,
      header: {
        title: '',
        text: ''
      },
      content: {
        title: '',
        text: ''
      },
      content2: {
        title: '',
        text: ''
      },
      visible: false
    }
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: {
          title: `${[event.target.name]}_${this.props.pageName}`,
          text: [event.target.value]
        }
      }
    )
  }

  toggleVisibility = () => {
    this.setState(
      {
        visible: !this.state.visible
      }
    )
  }

  render () {
    const { visible } = this.state
    return (
      <div>
        <h1>Editor</h1>
        <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} icon='labeled' vertical={true}>
            <Form>
              <Menu.Item>
                <Form.Field>
                  <label>Billboard Text</label>
                  <input type="text" name="header" value={this.state.header.text} onChange={this.handleChange}/>
                </Form.Field>
              </Menu.Item>
              <Menu.Item>
                <Form.Field>
                  <input type="text" name="content" value={this.state.content.text} onChange={this.handleChange}/>
                </Form.Field>
              </Menu.Item>
              <Menu.Item>
                <Form.Field>
                  <input type="text" name="content2" value={this.state.content2.text} onChange={this.handleChange}/>
                </Form.Field>
              </Menu.Item>
              <Menu.Item>
                <BannerEditor />
              </Menu.Item>
            </Form>
          </Sidebar>
          <Sidebar.Pusher>
            <Container fluid>
              <EditorContent {...this.state} />
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default EditorTab
