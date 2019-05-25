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


class ItemModal extends Component{
    state = {
        name:'',
        isModalOpen:false
    };

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
                <Button
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={this.toogle}
                >Add Item</Button>
            

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
    //item:state.item
});

export default connect(mapStateToProps, {postItems})(ItemModal);