import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import {Login, Home, NewEvoucher, EditEvoucher} from './components';
// import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute exact={true} path="/" component={Home} />
              <ProtectedRoute exact={true} path="/new" component={NewEvoucher} />
              <ProtectedRoute path="/edit/:id" component={EditEvoucher}/>

              {/* <ProtectedRoute path="/settings" component={Settings} /> */}
              {/* <ProtectedRoute component={Dashboard} /> */}
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
