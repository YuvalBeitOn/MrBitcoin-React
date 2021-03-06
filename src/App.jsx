import './assets/scss/global.scss';
import Routes from './routes'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import AppFooter from './cmps/AppFooter/AppFooter';

window.addEventListener('offline',  () => { console.log('offline'); });
window.addEventListener('online',  () => { console.log('online'); });

function App() {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Switch>
          {Routes.map((route, key) => <Route exact path={route.path} component={route.component} key={key} />)}
        </Switch>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;

