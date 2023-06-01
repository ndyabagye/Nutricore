import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link,Switch} from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';
import SalesDashboard from './pages/SalesDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

const routes = [
  {path:'/', component:AdminDashboard},
  {path:'/sales', component:SalesDashboard},
  {path:'/customer', component:CustomerDashboard},
  {path:'*', component:AdminDashboard},
]
function App() {

  const routeComponents = routes.map(({path, component},key) =>(
    <Route exact path={path} component={component} key={key}/>
  ));
  return (
    <Router>
      <Switch>{routeComponents}</Switch>
    </Router>
  )
}

export default App