import GlobalStyles from './theme/globalStyles';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Routes, Route } from 'react-router-dom';
import { pages } from './utils/constant';
import Login from './pages/login';
import Signup from './pages/signup';
import { useState } from 'react';
import { AuthContext } from './utils/auth';
import DetailDosen from './pages/detailDosen';
import { PrivateRoute, RestrictedRoute } from './utils/privateRoute';
import ScrollToTop from './components/scrollToTop';


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
			<ScrollToTop />
			<GlobalStyles />
			<Navbar />
			<Routes>
				{pages.map(({ route, Component, name }) => (
					<Route exact path={route} element={<Component />} key={name} />
				))}
				<Route
					exact
					path={'/login'}
					element={
						<RestrictedRoute>
							<Login />
						</RestrictedRoute>
					}
				/>
				<Route
					exact
					path={'/signup'}
					element={
						<RestrictedRoute>
							<Signup />
						</RestrictedRoute>
					}
				/>
				<Route
					exact
					path={'/dosen/:id'}
					element={
						<PrivateRoute>
							<DetailDosen />
						</PrivateRoute>
					}
				/>
			</Routes>
			<Footer />
		</AuthContext.Provider>
	);
}

export default App;
