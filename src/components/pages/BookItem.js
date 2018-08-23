import React, { Component } from 'react';
import { Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';


class BookItem extends Component {

    handleCart(){
        const book = [...this.props.cart,{
            _id:this.props._id,
            title:this.props.title,
            description:this.props._id,
            price:this.props.price,
            quantity:1

        }]
        console.log('carlength',this.props.cart.length);
        
        //check if cart is empty
        if(this.props.cart.length>0){
            //cart is not empty
            let _id =this.props._id;
            let cartIndex = this.props.cart.findIndex(function(cart){
                return cart._id===_id;
            })
            console.log('cartIndex',cartIndex)
            //if returns -1 there is no item with same id
            if(cartIndex===-1){
                this.props.addToCart(book);
                console.log()
            }
            else{
                //we only need to update quantity
                this.props.updateCart(_id,1,this.props.cart)
            }
        }
        else{
            //cart is empty
            this.props.addToCart(book);
        }
    }
    render() {
        return (
            <Well>
                <Row>
                    <Col xs={12} key={this.props._id}>
                        <h6>{this.props.title}</h6>
                        <p>{this.props.description}</p>
                        <h6>{this.props.price}</h6>
                        <Button 
                            bsStyle='primary'
                            onClick={this.handleCart.bind(this)}> 
                            Buy Now
                        </Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

function mapStateToProps(state){
    return{
        cart:state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCart,updateCart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem);