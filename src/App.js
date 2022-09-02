// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { Header, SelectMethod as Selector } from './components';
import { Virtual, Ewallet } from "./pages";
import configStore from './redux/store'

function App() {
	const { store, persistor } = configStore();
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className="container">
					{/* content */}
					<div className="main">
						<Header/>
						<Router>	
							<Routes>
								<Route exact path="/" element={<Selector />} />
								<Route path="/va" element={<Virtual />} />
								<Route path="/ewallet" element={<Ewallet />} />
							</Routes>
						</Router>	
					</div>
				</div>
			</PersistGate>
		</Provider>
	);
}

export default App;

