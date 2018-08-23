'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksActions';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import BookItem from './BookItem';
import BooksForm from './BooksForm';
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
                        price={bookArr.price}
                    />
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Cart/>
                </Row>
                <Row style={{marginTop:'15px'}}>
                <Col xs={12} sm={6}>
                    <BooksForm/>
                </Col>
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