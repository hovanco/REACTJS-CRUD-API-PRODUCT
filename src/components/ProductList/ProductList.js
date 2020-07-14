import React, { Component } from 'react'
import ProductItem from '../ProductItem/ProductItem';
import { connect } from 'react-redux';
import { actFetchProductsRequest, actDeleteProductRequest, actDeleteProductsRequest } from './../../actions/index';

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productIds: []
    }
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  onDelete = (id) => {
    this.props.onDeleteProduct(id);
  }

  handleOnSelect = id => {
    console.log("ProductList -> id", id)
    this.setState(prevState => ({
      productIds: [...prevState.productIds, id]
    }))
  }

  showProducts(products) {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            onSelect={this.handleOnSelect}
            key={index}
            product={product}
            index={index}
            onDelete={this.onDelete}
          />
        );
      });
    }
    return result;
  }

  handleOnDeleteSelectedIds = () => {
    const { productIds } = this.state
    productIds.forEach(productId => {
      this.props.onDeleteProduct(productId)
    });
  }

  render() {
    const { products } = this.props  // Tu state truyen vao props
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">DANH SACH SAN PHAM</h3>
        </div>
        <div className="panel-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>id</th>
                <th>name</th>
                <th>description</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {this.showProducts(products)}
            </tbody>
          </table>
          <button
           onClick={this.handleOnDeleteSelectedIds}
           type="button"
           className="btn btn-danger btn-delete">Delete</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => { // get all products data from Store
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch, props) => { // save all data products in store
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    onDeleteProduct: (id) => {
      dispatch(actDeleteProductRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)