import React, { Component } from 'react';
import {MenuItem,DropdownButton,InputGroup,Image,Row,Col, Well, Panel, FormGroup, FormControl, ControlLabel,Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import {postBooks,deleteBooks,getBooks,resetButton} from '../../actions/booksActions';
class BooksForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            images:[{}],
            img:''
        }
    }
    componentDidMount(){
        this.props.getBooks();
        axios.get('/api/images')
        .then(function(response){
            // console.log("response",response.data)
            this.setState({images:response.data})
        }.bind(this))
        .catch(function(err){
            this.setState({images:'error loading images from server',img:''})
        })
    }
    

    handleSubmit(){
        const book = [{
            title:findDOMNode( this.refs.title).value,
            description:findDOMNode( this.refs.description).value,
            images:findDOMNode( this.refs.image).value,
            price:findDOMNode( this.refs.price).value,
        }]
        this.props.postBooks(book);
    }
    handleSelect(img){
        this.setState({img:'/images/'+img})
    }

    resetForm(){
        //RESET THE BUTTON
        this.props.resetButton();
        findDOMNode( this.refs.title).value="";
        findDOMNode( this.refs.description).value="";
        findDOMNode( this.refs.price).value="";
        this.setState({img:''})
    }

    onDelete(){
        let bookId = findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId)
    }
    render() {
        // console.log("this.state.images",this.state.images)
        const bookList = this.props.books.map(function(booksArr){
            return (<option value={booksArr._id} key={booksArr._id}>{booksArr.title}</option>)
        });
        const imgList = this.state.images.map(function(imgArr,i){
            return <MenuItem key={i} 
            eventKey={imgArr.name}
            onClick={this.handleSelect.bind(this,imgArr.name)}
            >{imgArr.name}</MenuItem>
        },this)
        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6} >
                        <Panel>
                            <InputGroup>
                              <FormControl type="text" ref='image' value={this.state.img} />
                              <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title="Select an image"
                                bsStyle='primary'
                              >
                                {imgList}
                              </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive/>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId='title' validationState={this.props.validation}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Enter Title'
                                    ref='title'/>
                                    <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId='description' validationState={this.props.validation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Enter description'
                                    ref='description'/>
                                    <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId='price' validationState={this.props.validation}>
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Enter price'
                                    ref='price'/>
                                    <FormControl.Feedback/>
                            </FormGroup>
                            <Button 
                            onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} 
                            bsStyle={(!this.props.style)?('primary'):(this.props.style)}>
                             {(!this.props.msg)?('Save Book'):(this.props.msg)}
                             </Button>
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
                    </Col>
                </Row>
                
            </Well>
        );
    }
}

function mapStateToProps(state){
    return {
        books:state.books.books,
        msg:state.books.msg,
        style:state.books.style,
        validation:state.books.validation,
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({postBooks,deleteBooks,getBooks,resetButton},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(BooksForm);