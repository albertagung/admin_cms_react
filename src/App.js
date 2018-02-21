import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import { fetchPost } from './actions/postAction'
import { fetchProducts } from './actions/productAction'
import { fetchProductCategories } from './actions/productCategoriesAction'
import { fetchProductTypes } from './actions/productTypesAction'
import { fetchImage } from './actions/imageAction'
import './App.css';

// Semantic UI
import { Container } from 'semantic-ui-react'

import Sidebar from './components/sidebar.js'

const store = configureStore()
store.dispatch(fetchPost())
store.dispatch(fetchProducts())
store.dispatch(fetchProductCategories())
store.dispatch(fetchProductTypes())
store.dispatch(fetchImage())

class App extends Component {
  render() {
    let containerStyle = {
      'paddingTop': '2em'
    }
    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <Container fluid style={containerStyle}>
              <Sidebar />
            </Container>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
