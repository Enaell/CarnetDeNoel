import React, { Component } from 'react';
import { Navbar } from './navbar/Navbar'
import Footer from './footer/Footer'
import { BrowserRouter } from 'react-router-dom'
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import reducer from '../redux/reducer';
import counterpart from 'counterpart';
import localeFr from '../locale/fr.json';
import localeEn from '../locale/en.json';
import localeCn from '../locale/cn.json';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Column } from './common/Flexbox';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../theme';
import { withStyles } from '@material-ui/core/styles';
import Routes from './Routes';

console.log(React.version);

const styles = (theme: any) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '10px'
    },
    '*::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '*::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 1px 1px #f1f1f1'

    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: '#007600'
    },
  }
});

counterpart.registerTranslations('En', localeEn);
counterpart.registerTranslations('Fr', localeFr);
counterpart.registerTranslations('Cn', localeCn);

let store = Redux.createStore(reducer, composeWithDevTools());

store.getState().user && store.getState().user.language 
? counterpart.setLocale(store.getState().user.language)
: counterpart.setLocale('Fr');

class App extends Component {

  render() {
    return (
      <ReactRedux.Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Column horizontal='center' width='100%' style={{backgroundColor: '#white'}}>
              <Navbar />
              <Routes />
            </Column>
          </BrowserRouter>
        </ThemeProvider>
      </ReactRedux.Provider>
    );
  }
}

export default withStyles(styles)(App);