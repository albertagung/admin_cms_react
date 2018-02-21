import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

// Semantic UI
import { Grid, Menu, Container } from 'semantic-ui-react'

import Detail1 from './detail1.js'
import Detail2 from './detail2.js'
import Dashboard from './dashboard.js'
import Product from './products.js'
import Section from './section.js'
import SectionWithThreeComponents from './sectionComponents/sectionWithThreeComponents'
import SectionWithCounter from './sectionComponents/sectionWithCounter'

class Sidebar extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activeItem: 'dashboard'
    }
  }

  componentDidMount = () => {
    this.myCallback()
  }

  myCallback = (dataFromChild) => {
    console.log(dataFromChild);
  }

  handleMenuClick = (e, { name }) => {
    this.setState(
      {
        activeItem: name
      }
    )
  }

  render () {
    const { activeItem } = this.state
    const containerStyle = {
      'paddingRight': '1em',
      'paddingLeft': '1em'
    }
    return (
      <div>
        <Router>
          <div>
            <Container fluid style={containerStyle}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Menu vertical>
                      <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleMenuClick} as={Link} to='/dashboard'>
                      </Menu.Item>
                      <Menu.Item>
                        Post
                        <Menu.Menu>
                          <Menu.Item name='all_posts' active={activeItem === 'all_posts'} onClick={this.handleMenuClick} as={Link} to='/detail1'>
                            All Posts
                          </Menu.Item>
                          <Menu.Item name='create_post' active={activeItem === 'create_post'} 
                          onClick={this.handleMenuClick} as={Link} to='/detail2'>
                            Create New Post
                          </Menu.Item>
                        </Menu.Menu>
                      </Menu.Item>
                      <Menu.Item>
                        Product
                        <Menu.Menu>
                          <Menu.Item name='all_products' active={activeItem === 'all_products'} onClick={this.handleMenuClick} as={Link} to='/products'>
                            All Products
                          </Menu.Item>
                        </Menu.Menu>
                      </Menu.Item>
                      <Menu.Item>
                        Section
                        <Menu.Menu>
                          <Menu.Item name='section_editor' active={activeItem === 'section_editor'} onClick={this.handleMenuClick} as={Link} to='/sections'>
                            Section Editor
                          </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu>
                          <Menu.Item name='why_choose_us' active={activeItem === 'why_choose_us'} onClick={this.handleMenuClick} as={Link} to='/why_choose_us'>
                            Why Choose Us ?
                          </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu>
                          <Menu.Item name='section_with_counter' active={activeItem === 'section_with_counter'} onClick={this.handleMenuClick} as={Link} to='/section_with_counter'>
                            Section With Counter
                          </Menu.Item>
                        </Menu.Menu>
                      </Menu.Item>
                    </Menu>
                  </Grid.Column>
                  <Grid.Column stretched width={13}>
                    <Route exact path='/dashboard' component={Dashboard}></Route>
                    <Route exact path='/detail1' component={Detail1}></Route>
                    <Route exact path='/detail2' render={() => {
                      return (
                        <Detail2 callbackFromParent={this.myCallback} />
                      )
                    }}></Route>
                    <Route exact path='/products' component={Product}></Route>
                    <Route exact path='/sections' component={Section}></Route>
                    <Route exact path='/why_choose_us' component={SectionWithThreeComponents}></Route>
                    <Route exact path='/section_with_counter' component={SectionWithCounter}></Route>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </Router>
      </div>
    )
  }
}

export default Sidebar
