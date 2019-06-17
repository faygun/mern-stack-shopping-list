import React,{Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import {postItems}  from '../actions/itemActions';
import PropTypes from 'prop-types';


class ItemModal extends Component{
    state = {
        name:'',
        isModalOpen:false
    };

    static propTypes = {
        isAuthanticated : PropTypes.bool
    }
    toogle = () =>{
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    onChange = e =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    onSubmit = e =>{
        e.preventDefault();

        const newItem = {
            name:this.state.name
        };

        this.props.postItems(newItem);

        this.toogle();
    }
    render(){
        return(
            <div>
                {
                    this.props.isAuthanticated ? 
                    <Button
                        color="dark"
                        style={{marginBottom:'2rem'}}
                        onClick={this.toogle}
                        >Add Item</Button> 
                    :
                    <h4 className="mb-3 ml-4">Please log in to manage items</h4>
                }

            <Modal isOpen={this.state.isModalOpen} toggle={this.toogle}>
                <ModalHeader >Add To Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input 
                            type="text"
                            name="name"
                            id="item"
                            placeholder="Add shopping item"
                            onChange={this.onChange}
                            />
                            <Button color="dark" style={{marginTop:'2rem'}} block>Add Item</Button>
                        </FormGroup>
                    </Form>        
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

const mapStateToProps = (state) =>({
    isAuthanticated : state.auth.isAuthanticated
});

export default connect(mapStateToProps, {postItems})(ItemModal);