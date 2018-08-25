'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import {Carousel, Grid, Col, Row } from 'react-bootstrap';
import BookItem from './BookItem';
import Cart from './Cart';

class booksList extends Component {
    componentDidMount(){
        this.props.getBooks();
    }
    render() {
        // console.log(this.props.books)
        const booksList = this.props.books.map(bookArr=>{
            return(
                <Col xs={12} sm={6} md={4} key={bookArr._id}>
                    <BookItem
                        _id={bookArr._id}
                        title={bookArr.title}
                        description={bookArr.description}
                        images = {bookArr.images}
                        price={bookArr.price}
                    />
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Carousel>
                      <Carousel.Item>
                        <img style={{width:'900px',height:'300px'}} alt="900x300" src="/images/home1.jpg" />
                        <Carousel.Caption>
                          <h3>First slide label</h3>
                          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img style={{width:'900px',height:'300px'}} alt="900x300" src="/images/home2.jpg" />
                        <Carousel.Caption>
                          <h3>Second slide label</h3>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Cart/>
                </Row>
                <Row style={{marginTop:'15px'}}>
                
                    {booksList}
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state){
    return{
        books:state.books.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBooks:getBooks
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(booksList);