import React, { Component } from 'react'
import { connect } from 'react-redux'
// import * as postListAction from '../actions/postAction'

// Semantic UI
import { Container, Table, Button } from 'semantic-ui-react'

// Children element
import EditPostModal from './editPostModal'

class Detail1 extends Component {

  render () {
    return (
      <div>
        <Container>
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Post Title</Table.HeaderCell>
                <Table.HeaderCell>Post Author</Table.HeaderCell>
                <Table.HeaderCell>Created At</Table.HeaderCell>
                <Table.HeaderCell>Updated At</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.posts.map((dataPosts) => {
                return (
                  <Table.Row key={dataPosts._id}>
                    <Table.Cell>{dataPosts.title}</Table.Cell>
                    <Table.Cell>{dataPosts.author}</Table.Cell>
                    <Table.Cell>{dataPosts.createdAt}</Table.Cell>
                    <Table.Cell>{dataPosts.updatedAt}</Table.Cell>
                    <Table.Cell><EditPostModal postIdFromParent={dataPosts._id}></EditPostModal></Table.Cell>
                    <Table.Cell><Button basic color='red'>Delete</Button></Table.Cell>
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

export default connect (mapStateToProps, null) (Detail1)
