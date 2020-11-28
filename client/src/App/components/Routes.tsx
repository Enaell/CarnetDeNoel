import React from 'react';

import { Route, Switch as RouterSwitch } from 'react-router-dom'
import RouteNotFound from './RouteNotfound';
import { LandingPage } from './landingPage/LandingPage';
import { NotebookPage } from './notebook/NotebookPage';
import { useSelector } from 'react-redux';

const RoutesSwitch = () => {
  
  const isLogged = useSelector((state: any) => state.user?.token)
  return (
    <>
      { isLogged ?
      <div style={{width:'100%', minHeight: '100vh'}}>
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

export default RoutesSwitch