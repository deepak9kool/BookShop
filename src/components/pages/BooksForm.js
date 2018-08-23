import React, { Component } from 'react';
import { Well, Panel, FormGroup, FormControl, ControlLabel,Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';

import {postBooks,deleteBooks} from '../../actions/booksActions';
class BooksForm extends Component {

    handleSubmit(){
        const book = [{
            title:findDOMNode( this.refs.title).value,
            description:findDOMNode( this.refs.description).value,
            price:findDOMNode( this.refs.price).value,
        }]
        this.props.postBooks(book);
    }

    onDelete(){
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId)
    }
    render() {
        // console.log("this.props.from postbook",this.props)
        const bookList = this.props.books.map(function(booksArr){
            return (<option value={booksArr._id} key={booksArr._id}>{booksArr.title}</option>)
        })
        return (
            <Well>
                <Panel>
                    <FormGroup controlId='title'>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Title'
                            ref='title'/>
                    </FormGroup>
                    <FormGroup controlId='description'>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter description'
                            ref='description'/>
                    </FormGroup>
                    <FormGroup controlId='price'>
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter price'
                            ref='price'/>
                    </FormGroup>
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'> Save Book</Button>
                </Panel>
                <Panel style={{marginTop:'25px'}}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select</ControlLabel>
                        <FormControl ref='delete' componentClass="select" placeholder="select">
                          <option value="select">select</option>
                          {bookList}
                        </FormControl>
                    </FormGroup>
                    <Button bsStyle='danger' onClick={this.onDelete.bind(this)}> Delete Book</Button>
                </Panel>
            </Well>
        );
    }
}

function mapStateToProps(state){
    return {
        books:state.books.books
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({postBooks,deleteBooks},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(BooksForm);