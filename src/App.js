import GlobalStyles from './theme/globalStyles';
import theme from './theme';
import Navbar from './components/navbar';
import { ThemeProvider } from '@mui/material';
import Buttons from './components/button';
import Landing from './pages/landing';
import Footer from './components/footer';
import { Routes, Route } from 'react-router-dom';
import { pages } from './utils/constant';
import Login from './pages/login';
import Signup from './pages/signup';
import { useState } from 'react';
import { AuthContext } from './utils/auth';
function App() {
	const isAnyToken = JSON.parse(localStorage.getItem('token'));
	const userId = JSON.parse(localStorage.getItem('id'));
	const [authToken, setAuthToken] = useState(isAnyToken);
	const [user, setUser] = useState(userId);

	const setAndGetTokens = (token, id) => {
		localStorage.setItem('token', JSON.stringify(token));
		localStorage.setItem('id', JSON.stringify(id));
		setAuthToken(token);
		setUser(id);
	};
	return (
		<AuthContext.Provider value={{ authToken, setAndGetTokens, user }}>
			<GlobalStyles />
			<Navbar />
			<Routes>
				{pages.map(({ route, Component, name }) => (
					<Route exact path={route} element={<Component />} key={name} />
				))}
				<Route exact path={'/login'} element={<Login />} />
				<Route exact path={'/signup'} element={<Signup />} />
				{/* <Route exact path="/" element={<Landing />} />
				<Route path="/" element={<Landing />} /> */}
			</Routes>
			<Footer />
		</AuthContext.Provider>
	);
}

export default App;
