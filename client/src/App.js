import React from 'react';
import AppNavbar from './components/AppNavbar';
import StockList from './components/StockList';
import ItemModal from './components/itemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <StockList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
