import GlobalStyles from './theme/globalStyles';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
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
	const { pathname } = useLocation();
	const [vaTimeout, setVaTimeout] = useState(false);

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			setVaTimeout(true);
			localStorage.removeItem('va-timeout');
			// window.location.reload();
			return <span>selesai</span>;
		} else {
			setVaTimeout(false);
			const [, , dosenId] = pathname.split('/');
			if (JSON.parse(localStorage.getItem('popover'))) {
				return (
					<div className="">
						Time remaining {hours} : {minutes} : {seconds}
					</div>
				);
			}
			if (JSON.parse(localStorage.getItem('va-timeout')) === dosenId) {
				return (
					<div className="border-[1px] border-orange-primary rounded-md p-2 md:max-w-[280px]">
						<p>Selesaikan transaksi pembayaran anda dengan dosen ini dalam </p>
						<div className="text-orange-primary font-bold text-center w-full">
							{hours} : {minutes} : {seconds}
						</div>
					</div>
				);
			} else {
				return (
					<div className="border-[1px] border-red-500 rounded-md p-2 md:max-w-[280px]">
						<p>
							Kamu memiliki transaksi pending yang harus segera dibayar, bayar
							dalam
						</p>
						<div className="text-red-500 font-bold text-center w-full">
							{hours} : {minutes} : {seconds}
						</div>
					</div>
				);
			}
		}
	};

	const setAndGetTokens = (token, id) => {
		localStorage.setItem('token', JSON.stringify(token));
		localStorage.setItem('id', JSON.stringify(id));
		setAuthToken(token);
		setUser(id);
	};

	return (
		<AuthContext.Provider
			value={{ authToken, setAndGetTokens, user, renderer, vaTimeout }}>
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
