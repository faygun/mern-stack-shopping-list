import React,{Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItems} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component{
  componentDidMount(){
        this.props.getItems();
  }
  static propTypes = {
    getItems:PropTypes.func.isRequired,
    item:PropTypes.object.isRequired,
    isAuthanticated : PropTypes.bool
}
  onClick = id => {
    this.props.deleteItems(id);
  }
    render(){
        const {items} = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                       {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                {
                                    this.props.isAuthanticated ? 
                                    <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onClick.bind(this, _id)}>
                                    &times;
                                    </Button> : null
                                }
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                       ) )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
};



const mapStateToProps = (state) =>({
    item: state.item,
    isAuthanticated : state.auth.isAuthanticated
});
export default connect(mapStateToProps,{getItems, deleteItems})(ShoppingList) ;