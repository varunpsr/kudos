import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import Home from './screens/home';
import Kudos from './screens/kudos';
import Login from './screens/login';
import Signup from './screens/signup';
import Logout from './screens/logout';
import NavBar from './screens/navbar';
import ViewKudos from './screens/viewKudos';
import giveKudos from './screens/giveKudos';

import history from './history';

import store from './store';
import GiveKudos from './screens/giveKudos';
let persistor = persistStore(store)

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router history={history}>
						<Container>
							<NavBar history={history} />
							<Switch>
								<Route exact path='/' component={Login} />
								<Route exact path='/signup' component={Signup} />
								<Route exact path='/logout' component={Logout} />
								<Route exact path='/kudos' component={Kudos} />
								<Route exact path='/kudos/received' component={ViewKudos} />
								<Route exact path='/givekudos' component={GiveKudos} />
							</Switch>
						</Container>
					</Router>
				</PersistGate>
			</Provider>

		);
	}
}

export default App;