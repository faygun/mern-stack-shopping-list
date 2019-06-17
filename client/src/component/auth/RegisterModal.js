import React,{Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component{
    state = {
        isModalOpen:false,
        name:'',
        email:'',
        password:'',
        msg:null
    };
    
    static propTypes = {
        isAuthanticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        register : PropTypes.func.isRequired,
        clearErrors : PropTypes.func.isRequired
    }

    toogle = () =>{
        
        this.props.clearErrors();

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

        const {name, email, password} = this.state;

        const newUser = {
            name,
            email,
            password
        };

        this.props.register(newUser); 
    }

    componentDidUpdate(prevProps){
        const {error, isAuthanticated} = this.props;

        if(error !== prevProps.error){
            if(error.id === 'REGISTER_FAIL'){
                this.setState({msg:error.msg});
            }
            else{
                this.setState({msg:null});
            }
        }

        if(this.state.isModalOpen){
            if(isAuthanticated)
            this.toogle();
        }
    }
    render(){
        return(
            <div>
                <NavLink
                href="#"
                onClick={this.toogle}
                >Register</NavLink>
            

            <Modal isOpen={this.state.isModalOpen} toggle={this.toogle}>
                <ModalHeader >Register</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            className = "mb-3"
                            onChange={this.onChange}
                            />

                            <Label for="email">Email</Label>
                            <Input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className = "mb-3"
                            onChange={this.onChange}
                            />

                            <Label for="password">Password</Label>
                            <Input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className = "mb-3"
                            onChange={this.onChange}
                            />
                            <Button color="dark" style={{marginTop:'2rem'}} block>Register</Button>
                        </FormGroup>
                    </Form>        
                </ModalBody>
            </Modal>
        </div>
        );
    }
}
const mapStateToProps = (state) =>({
    isAuthanticated : state.auth.isAuthanticated,
    error : state.error
});

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal);