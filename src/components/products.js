import React, { Component } from 'react'
import { connect } from 'react-redux'

// Semantic UI
import { Container, Table } from 'semantic-ui-react'

// Product Editor Modal Component
import ProductEditorModal from './productEditorModal'

class Product extends Component {

  render () {
    return (
      <div>
      <Container>
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Products</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Products Type</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
              {this.props.products.map((dataProducts, i) => {
                return (
                  <Table.Row key={dataProducts._id}>
                    <Table.Cell>{dataProducts.name}</Table.Cell>
                    <Table.Cell>{dataProducts.category}</Table.Cell>
                    <Table.Cell>{dataProducts.price}</Table.Cell>
                    <Table.Cell>{dataProducts.type}</Table.Cell>
                    <Table.Cell>{dataProducts.stock}</Table.Cell>
                    <Table.Cell>
                      <ProductEditorModal 
                        sendProductDataToEditor={dataProducts} 
                        sendImagesToEditor={this.props.images}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table>
      </Container>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  if (state.productList.products !== undefined) {
    return {
      products: state.productList.products
    }
  } else {
    return {
      products: []
    }
  }
}

export default connect (mapStateToProps, null) (Product)
