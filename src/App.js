import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './component/NavBar';
import Toast from './component/Toast';
import routes from './routes';
import useToast from './hooks/toast';

function App() {
  const [toasts, addToast, deleteToast] = useToast();

  return (
    <Router>
      <NavBar />
      <Toast toasts={toasts} deleteToast={deleteToast}/>
      <div className="container mt-3">
        <Switch>
          { routes.map((route) => {
            const Component = route.Component;
            return <Route
            exact 
            key={route} 
            path={route.path} 
            // component={route.Component} 
            >
                <Component addToast={addToast}/>
            </Route>;
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
