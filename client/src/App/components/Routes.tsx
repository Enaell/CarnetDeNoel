import React from 'react';

import { Route, Switch as RouterSwitch } from 'react-router-dom'
import RouteNotFound from './RouteNotfound';
import { connect } from 'react-redux';
import { LandingPage } from './landingPage/LandingPage';
import { NotebookPage } from './notebook/NotebookPage';


function mapStateToProps(state: any){
  return {
    isLogged: state.user && (state.user.token)
  }
}


const RoutesSwitch = ({isLogged}: {isLogged?: boolean}) => {
  return (
    <>
      { isLogged ?
      <div style={{marginTop:'75px', width:'100%', minHeight: 'calc(100vh - 140px)'}}>
        <RouterSwitch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/notebook" component={NotebookPage}/>
          <Route component={RouteNotFound} />
        </RouterSwitch>
      </div>
      : <LandingPage />}
    </>
  )
}

export default connect(mapStateToProps, null) (RoutesSwitch)