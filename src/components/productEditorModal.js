import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import * as productListAction from '../actions/productAction'
import * as productCategoriesAction from '../actions/productCategoriesAction'
import * as productTypesAction from '../actions/productTypesAction'
import * as imageListAction from '../actions/imageAction'

// Semantic UI
import { 
  Form, 
  Modal, 
  Button, 
  Header, 
  Segment, 
  Input,
  Table,
  Icon,
  Loader,
  Dimmer,
  Card,
  Popup
} from 'semantic-ui-react'

// UUID for product variant
import uuidv4 from 'uuid/v4'

// Multiple Dropzone
import ImageUploadMultiple from './imageUploadMultiple'

// Edit Product Description Component
import EditProductDescription from './editProductDescription'

// Stock Type Data
const stockTypeOptions = [
  {
    text: 'Pre-Order',
    value: 'Pre-Order'
  },
  {
    text: 'Available',
    value: 'Available'
  },
  {
    text: 'Out of Stock',
    value: 'Out of Stock'
  }
]

// Shipping methods data
const shippingMethodOptions = [
  {
    text: 'TIKI',
    value: 'TIKI'
  },
  {
    text: 'JNE',
    value: 'JNE'
  },
  {
    text: 'Go-Jek',
    value: 'Go-Jek'
  },
  {
    text: 'Courrier',
    value: 'Courrier'
  }
]

class ProductEditorModal extends Component {
  constructor (props) {
    super (props)
    this.state = {
      modalOpen: false,
      productCategories: this.props.productCategories,
      productTypes: this.props.productTypes,
      variantOnChange: {
        optionName: '',
        optionType: '',
        optionValue: ''
      },
      items: [],
      newProduct: {
        _id: this.props.sendProductDataToEditor._id,
        name: this.props.sendProductDataToEditor.name,
        skuNumber: this.props.sendProductDataToEditor.skuNumber,
        category: this.props.sendProductDataToEditor.category,
        description: this.props.sendProductDataToEditor.description,
        price: this.props.sendProductDataToEditor.price,
        taxApply: this.props.sendProductDataToEditor.taxApply,
        weight: this.props.sendProductDataToEditor.weight,
        type: this.props.sendProductDataToEditor.type,
        stock: this.props.sendProductDataToEditor.stock,
        stockType: this.props.sendProductDataToEditor.stockType,
        stockAlert: this.props.sendProductDataToEditor.stockAlert,
        productPackaging: this.props.sendProductDataToEditor.productPackaging,
        shippingMethod: this.props.sendProductDataToEditor.shippingMethod,
        variant: this.props.sendProductDataToEditor.variant,
        images: []
      },
      visibleOptionForm: false,
      visibleAddImage: false,
      visibleVariant: false,
      doneLoadImage: false
    }
  }

  getImages = async () => {
    // Getting images from database for this product
    let arrImages = []
    await this.props.fetchImageTitle(`product-${this.state.newProduct._id}`)
    await this.props.images.forEach((dataImages) => {
      if (dataImages.imageTitle === `product-${this.state.newProduct._id}`) {
        arrImages.push(dataImages)
      }
    })
    let objImage = {images: arrImages}
    let newObjProduct = Object.assign(this.state.newProduct, objImage)
    this.setState(
      {
        newProduct: newObjProduct,
        // Setting loader to disappear when load image complete
        doneLoadImage: true
      }
    )
  }

  handleRemoveImage = async (imageKey) => {
    await this.props.requestRemoveImage(imageKey)
    // Re-fetch the images
    await this.handleSubmitWithNewImage()
    alert('Image Deleted!')
  }

  handleSubmitWithNewImage = async () => {
    await this.props.fetchImageTitle(`product-${this.state.newProduct._id}`)
    let objImage = {images: this.props.images}
    let newObjProduct = Object.assign(this.state.newProduct, objImage)
    this.setState(
      {
        newProduct: newObjProduct
      }
    )
  }

  handleAdditionProductType = async (e, { value }) => {
    await this.setState({
      productTypes: [
        {
          text: value,
          value
        },
        ...this.state.productTypes
      ]
    })
    this.props.requestNewProductTypes(this.state.productTypes[0])
  }

  handleAdditionProductCategory = async (e, { value}) => {
    await this.setState(
      {
        productCategories: [
          {
            text: value,
            value
          },
          ...this.state.productCategories
        ]
      }
    )
    this.props.requestNewProductCategories(this.state.productCategories[0])
  }

  toggleAddVariantVisibility = () => {
    this.setState(
      {
        visibleOptionForm: !this.state.visibleOptionForm
      }
    )
  }

  toggleVariantVisibility = () => {
    this.setState(
      {
        visibleVariant: !this.state.visibleVariant
      }
    )
  }

  toggleAddImage = () => {
    this.setState(
      {
        visibleAddImage: true
      }
    )
  }

  // Handling variant changes
  handleChangeVariant = (e, { value }) => {
    // Checking for the Form.Select because e.target.name return undefined
    if (e.target.name === undefined) {
      let variantOnChange = Object.assign({}, this.state.variantOnChange)
      variantOnChange['optionType'] = value
      this.setState(
        {
          variantOnChange
        }
      )
    // If not undefined then assign the rest value
    } else {
      let variantOnChange = Object.assign({}, this.state.variantOnChange)
      variantOnChange[e.target.name] = value
      this.setState(
        {
          variantOnChange
        }
      )
    }
  }

  handleSaveVariant = async () => {
    let optionIdObj = {optionId: uuidv4()}
    let variantOnChange = Object.assign(this.state.variantOnChange, optionIdObj)
    await this.state.items.push(variantOnChange)
    let variantObj = {variant: this.state.items}
    let newObjProduct = Object.assign(this.state.newProduct, variantObj)
    await this.setState(
      {
        newProduct: newObjProduct
      }
    )
    this.setState(
      {
        variantOnChange: {
          optionId: '',
          optionName: '',
          optionValue: '',
          optionType: ''
        }
      }
    )
  }

  handleRemoveVariant = async (dataOptionId) => {
    let dataVariant = this.state.newProduct.variant
    for (let i = 0; i < dataVariant.length; i++) {
      if (dataVariant[i].optionId === dataOptionId) {
        dataVariant.splice(i, 1)
        let objVariant = {variant: dataVariant}
        let newObjProduct = Object.assign(this.state.newProduct, objVariant)
        this.setState(
          {
            newProduct: newObjProduct
          }
        )
      }
    }
  }

  handleChangeProductType = (e, { value }) => {
    // Assigning new value to newProduct
    let categoryObj = {type: value}
    let newObjProduct = Object.assign(this.state.newProduct, categoryObj)
    this.setState(
      {
        newProduct: newObjProduct
      }
    )
  }

  handleChangeProductCategory = (e, { value }) => {
    // Assigning new value to newProduct    
    let categoryObj = {category: value}
    let newObjProduct = Object.assign(this.state.newProduct, categoryObj)
    this.setState(
      {
        newProduct: newObjProduct
      }
    )
  }

  handleChangeShippingMethod = (e, { value }) => {
    // Assigning new value to newProduct
    let shippingMethodObj = {shippingMethod: value}
    let newObjProduct = Object.assign(this.state.newProduct, shippingMethodObj)
    this.setState(
      {
        newProduct: newObjProduct
      }
    )
  }

  handleChangeStockType = (e, { value }) => {
    // Assigning new value to newProduct
    let stockTypeObj = {stockType: value}
    let newObjProduct = Object.assign(this.state.newProduct, stockTypeObj)
    this.setState(
      {
        newProduct: newObjProduct
      }
    )
  }

  handleFormChange = (event) => {
    let newProduct = Object.assign({}, this.state.newProduct)
    newProduct[event.target.name] = event.target.value    
    this.setState(
      {
        newProduct
      }
    )
  }

  handleOpen = async () => {
    // After modal has sucessfully open, dimmer will be shown while waiting images to be loaded
    await this.setState(
      {
        modalOpen: true
      }
    )
    this.getImages()
  }

  handleClose = () => {
    this.setState(
      {
        modalOpen: false
      }
    )
  }

  handleSubmit =  async () => {
    await this.handleSubmitWithNewImage()
    // console.log(this.state.newProduct)
    this.props.requestEditProduct(this.state.newProduct)
  }

  getDataFromEditor = (productDescription) => {
    let newProduct = Object.assign({}, this.state.newProduct)
    newProduct['description'] = productDescription
    this.setState(
      {
        newProduct
      }
    )
  }

  render () {
    const { currentValueProductType } = this.state.productTypes
    const { currentValueProductCategory } = this.state.productCategories
    const { visibleOptionForm } = this.state
    const { visibleVariant } = this.state
    const { images } = this.state.newProduct
    const modalStyle = {
      height: 'auto'
    }
    if (!this.state.doneLoadImage) {
      return (
        <div>
          <Modal
            trigger={<Button basic color="green" 
            onClick={this.handleOpen}>Edit Product</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Dimmer active>
              <Loader content='Loading'/>
            </Dimmer>
          </Modal>
        </div>
      )
    } else {
      return (
        <div>
          <Modal
          style={modalStyle}
            trigger={<Button 
            basic 
            color="green" 
            onClick={this.handleOpen}>Edit Product</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <Modal.Header>
              <Header>Edit Product</Header>
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Input 
                      name='name' 
                      label='Product Name' 
                      placeholder='Product Name' 
                      value={this.state.newProduct.name} 
                      onChange={this.handleFormChange}/>
                    <Form.Select
                      name='productTypes'
                      label='Choose Product Type'
                      options={this.props.productTypes}
                      placeholder='Choose Product Type'
                      search
                      selection
                      fluid
                      allowAdditions
                      value={currentValueProductType}
                      onAddItem={this.handleAdditionProductType}
                      onChange={this.handleChangeProductType}
                    />
                    <Form.Select
                       name='productCategories'
                       label='Choose Product Category'
                       options={this.props.productCategories}
                       placeholder='Choose Product Category'
                       search
                       selection
                       fluid
                       allowAdditions
                       value={currentValueProductCategory}
                       onAddItem={this.handleAdditionProductCategory}
                       onChange={this.handleChangeProductCategory}
                    />
                  </Form.Group>
                  <Form.Group>
                    <EditProductDescription sendProductDataToEditProduct={this.props.sendProductDataToEditor} receiveProductDescriptionFromEditor={this.getDataFromEditor} />
                  </Form.Group>
                  <h5>Product Images</h5>
                  {(() => {
                    if (images.length === 0) {
                      return (
                        <Segment inverted color='yellow'>
                          <h5 style={{'textAlign': 'center'}}>No Image Yet</h5>
                          <Button 
                            fluid content='Add More Images' 
                            onClick={this.toggleAddImage} 
                            style={{'marginTop': '1em'}}
                          />
                        </Segment>
                      )
                    } else {
                      return (
                        <Segment>
                          <Card.Group itemsPerRow={3}>
                            {images.map((dataImages) => {
                              return (
                                <Popup key={dataImages.imageKey}
                                  trigger={
                                    <Card  
                                      color='green' 
                                      image={dataImages.url} 
                                      onClick={this.handleClickImage}
                                    />
                                  }
                                  content={
                                    <Button 
                                      color='red' 
                                      content='Remove Image' 
                                      onClick={() => this.handleRemoveImage(dataImages.imageKey)} 
                                    />
                                  }
                                  on='click'
                                  position='top right'
                                  hideOnScroll
                                />
                              )
                            })}
                          </Card.Group>
                          <Button 
                            fluid content='Add More Images' 
                            onClick={this.toggleAddImage} 
                            style={{'marginTop': '1em'}}
                          />
                        </Segment>
                      )
                    }
                  })()}
                  {(() => {
                    if (this.state.visibleAddImage) {
                      return (
                        <Segment>
                          <Form.Group>
                              <ImageUploadMultiple sendImageDataToUploader={`product-${this.props.sendProductDataToEditor._id}`} />
                          </Form.Group>
                        </Segment>
                      )
                    }
                  })()}
                  <Form.Group widths='equal'>
                    <Form.Input 
                      type='number'
                      name='price' 
                      label='Product Price' 
                      placeholder='Product Price' 
                      onChange={this.handleFormChange}
                      value={this.state.newProduct.price} 
                    />
                    <Form.Input 
                      type='number' 
                      name='taxApply' 
                      label='Tax Apply' 
                      placeholder='Tax Apply'
                      onChange={this.handleFormChange} 
                      value={this.state.newProduct.taxApply}
                    />
                    <Form.Select
                      name='stockType'
                      label='Stock Type'
                      options={stockTypeOptions}
                      placeholder='Select Type...'
                      onChange={this.handleChangeStockType}
                      value={this.state.newProduct.stockType}
                    />   
                    <Form.Input 
                      name='skuNumber' 
                      label='SKU' 
                      placeholder='SKU'
                      onChange={this.handleFormChange}
                      value={this.state.newProduct.skuNumber}
                    />  
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input 
                      type='number' 
                      name='stockAlert'
                      label='Stock Alert' 
                      placeholder='mark as low if lower than...'
                      onChange={this.handleFormChange}
                      value={this.state.newProduct.stockAlert} 
                    />
                    <Form.Input>
                     <Input 
                      label={{ basic: true, content: 'Gram'}}
                      labelPosition='right' 
                      type='number' 
                      name='weight' 
                      placeholder='Weight' 
                      style={{'paddingTop': '22px'}}
                      onChange={this.handleFormChange}
                      value={this.state.newProduct.weight}
                    />
                    </Form.Input>
                    <Form.Select
                      name='shippingMethod'
                      label='Shipping Method Availabilty'
                      options={shippingMethodOptions}
                      placeholder='Choose Shipping Method...'
                      onChange={this.handleChangeShippingMethod}
                      value={this.state.newProduct.shippingMethod}
                    />
                  </Form.Group>
                  <Button.Group>
                    <Button 
                      content={visibleVariant ? 'Hide Product Options' : 'Show Product Options '}
                      onClick={this.toggleVariantVisibility}
                    />
                    <Button 
                      content={visibleOptionForm ? 'Hide Add More Options' : 'Show Add More Options'} 
                      onClick={this.toggleAddVariantVisibility}
                    />
                  </Button.Group>
                  {(() => {
                    if (visibleVariant) {
                      return (
                        <Segment>
                          <Table basic='very'>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Option Name</Table.HeaderCell>
                                <Table.HeaderCell>Option Value</Table.HeaderCell>
                                <Table.HeaderCell>Option Type</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {this.state.newProduct.variant.map((dataVariant) =>{
                                return (
                                    <Table.Row key={dataVariant.optionId}>
                                      <Table.Cell>{dataVariant.optionName}</Table.Cell>
                                      <Table.Cell>{dataVariant.optionValue}</Table.Cell>
                                      <Table.Cell>{dataVariant.optionType}</Table.Cell>
                                      <Table.Cell>
                                        <Icon name='trash outline' 
                                          onClick={() => this.handleRemoveVariant(dataVariant.optionId)}
                                        />
                                      </Table.Cell>
                                    </Table.Row>
                                )
                              })}
                            </Table.Body>
                          </Table>           
                        </Segment>
                      )
                    }
                  })()}
                  {(() => {
                      if (visibleOptionForm === true) {
                        return (
                          <Form.Group widths='equal'>
                            <Form.Input
                              name='optionName'
                              label='Option Name'
                              placeholder='Option Name'
                              onChange={this.handleChangeVariant}
                              value={this.state.variantOnChange.optionName}
                            />
                            <Form.Input
                              name='optionValue'
                              label='Option Value'
                              placeholder='Option Value'
                              onChange={this.handleChangeVariant}   
                              value={this.state.variantOnChange.optionValue}          
                            />
                            <Form.Select 
                              name='optionType'
                              label='Option Type'
                              placeholder='Option Type'
                              options={[
                                {
                                  text:'apa',
                                  value:'apa'
                                },
                                {
                                  text: 'itu',
                                  value: 'itu'
                                }
                              ]}
                              onChange={this.handleChangeVariant}
                              value={this.state.variantOnChange.optionType}
                            />
                          </Form.Group> 
                        )
                      }
                  })()}
                  {/* Validating that the option must be filled up in order to be saved */}
                  {(() => {
                      if (
                          this.state.variantOnChange.optionName !== undefined &&
                          this.state.variantOnChange.optionName !== '' &&
                          this.state.variantOnChange.optionValue !== undefined &&
                          this.state.variantOnChange.optionValue !== '' &&
                          this.state.variantOnChange.optionType !== undefined &&
                          this.state.variantOnChange.optionType !== ''
                      ) {
                        return (
                          <Button onClick={this.handleSaveVariant}>Save and Add More</Button>
                        )                                     
                      }
                    }
                    )()}
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleClose}>Close</Button>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Modal.Actions>
          </Modal>
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
    return {
      productCategories: state.productCategoryList.productCategories,
      productTypes: state.productTypeList.productTypes,
      images: state.imageList.images
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestEditProduct: product => dispatch (productListAction.requestEditProduct(product)),
    requestNewProductCategories: productCategory => dispatch (
      productCategoriesAction.requestNewProductCategories(productCategory)
    ),
    requestNewProductTypes: productType => dispatch (
      productTypesAction.requestNewProductTypes(productType)
    ),
    // Get images based on product id
    fetchImageTitle: imageTitle => dispatch (imageListAction.fetchImageTitle(imageTitle)),
    requestRemoveImage: imageKey => dispatch (imageListAction.requestRemoveImage(imageKey))
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (ProductEditorModal)
