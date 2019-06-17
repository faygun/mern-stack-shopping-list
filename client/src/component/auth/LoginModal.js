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
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class LoginModal extends Component{
    state = {
        isModalOpen:false,
        email:'',
        password:'',
        msg:null
    };
    
    static propTypes = {
        isAuthanticated : PropTypes.bool,
        error : PropTypes.object.isRequired,
        login : PropTypes.func.isRequired,
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

        const {email, password} = this.state;

        const user = {
            email,
            password
        };

        this.props.login(user); 
    }

    componentDidUpdate(prevProps){
        const {error, isAuthanticated} = this.props;

        if(error !== prevProps.error){
            if(error.id === 'LOGIN_FAIL'){
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
                >Login</NavLink>
            

            <Modal isOpen={this.state.isModalOpen} toggle={this.toogle}>
                <ModalHeader >Login</ModalHeader>
                <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
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
                            <Button color="dark" style={{marginTop:'2rem'}} block>Login</Button>
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

export default connect(mapStateToProps, {login, clearErrors})(LoginModal);