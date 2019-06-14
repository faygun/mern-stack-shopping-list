import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './component/AppNavbar';
import ShoppingList from './component/ShoppingList';
import ItemModal from './component/ItemModal';
import {Container} from 'reactstrap';

import {Provider} from 'react-redux';
import store  from './store';
import {loadUser} from './actions/authActions';

class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/>
          <Container>
            <ItemModal/>
            <ShoppingList/>  
          </Container>
        </div>
      </Provider>
      
    )
  };
}

export default App;
