import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { pages } from '../utils/constant';
import logo from '../images/logo.png';
import { useAuth } from '../utils/auth';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Popper from '@mui/material/Popper';
import DosenCard from './dosenCard';
import Snackbar from '@mui/material/Snackbar';
import { konsulAPI } from '../utils/api';
import CountingDown from './countDown';
import MuiAlert from '@mui/material/Alert';
import useSWR from 'swr';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PrimaryButton = styled(Button).attrs(() => ({}))`
	color: ${(props) => (props.secondary ? '#ff9f1c' : '#fff')};
	display: inline-block;
	width: ${(props) => (props.full ? '100%' : 'inherit')};
	min-width: 100px;
	background-color: ${(props) => (props.secondary ? 'transparent' : '#ff9f1c')};
	border: ${(props) => (props.secondary ? '1px solid #ff9f1c' : 'none')};
	&:hover {
		background-color: ${(props) => (props.secondary ? '#fff' : '#ff9f1c')};
	}
`;

const settings = ['Chat', 'Logout'];

const Navbar = () => {
	const { setAndGetTokens, authToken, user } = useAuth();
	const { pathname } = useLocation();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const { renderer, vaTimeout } = useAuth();
	const [openNotif, setOpenNotif] = useState(false);
	let navigate = useNavigate();

	const fetcher = (url) => {
		if (!JSON.parse(localStorage.getItem('end_date'))) deletePaymentById();
		return axios.get(url).then((res) => {
			return res.data.data;
		});
	};
	const { data = [], error } = useSWR(
		`https://konsultasi-api.herokuapp.com/api/payment/history/${user}`,
		fetcher,
		{ refreshInterval: 100 }
	);

	const [allTransactions, setAllTransactions] = useState(data);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = (setting) => {
		setAnchorElUser(null);
		if (setting === 'Logout') {
			setAndGetTokens();
			localStorage.clear();
			window.location.reload();
		}

		if (setting === 'Chat') {
			navigate('/chat', { replace: true });
		}
	};

	const fetchHistory = async () => {
		if (!JSON.parse(localStorage.getItem('end_date'))) deletePaymentById();

		const data = await konsulAPI.get(`/api/payment/history/${user}`);

		setAllTransactions(data.data.data);
	};

	const deletePaymentById = async () => {
		const orderId = JSON.parse(localStorage.getItem('order-id'));
		let dataS = data.filter(
			(data) =>
				data.id === orderId &&
				data.responseMidtrans.transaction_status === 'settlement'
		);
		if (dataS.length > 0) {
			localStorage.removeItem('order-id');
			localStorage.removeItem('end_date');
			localStorage.removeItem('va-timeout');
			return;
		} else {
			if (orderId !== null) {
				setOpenNotif(true);
				const res = await konsulAPI.delete(`/api/payment/${orderId}`);

				if (res.data.success) {
					setTimeout(() => {
						window.location.reload();
					}, 3000);
					localStorage.removeItem('order-id');
				}
			} else {
				return;
			}
		}
	};

	const handleClick = (event) => {
		localStorage.setItem('popover', JSON.stringify(anchorEl ? false : true));
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;


	return (
		<>
			<AppBar position="sticky" sx={{ color: '#000', background: 'white' }}>
				<Container maxWidth="xl">
					<Snackbar open={openNotif} autoHideDuration={3000}>
						<Alert severity="warning" sx={{ width: '100%' }}>
							Your pending transaction has been deleted
						</Alert>
					</Snackbar>
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
							}}>
							<Link to="/">
								<img src={logo} alt="logo" width={150} />
							</Link>
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit">
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}>
								{pages.map((page) => (
									<Link to={`${page.route}`} key={page.route}>
										<MenuItem key={page} onClick={handleCloseNavMenu}>
											<Typography textAlign="center">{page.name}</Typography>
										</MenuItem>
									</Link>
								))}
							</Menu>
						</Box>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<Link to="/">
								<img src={logo} alt="logo" width={150} />
							</Link>
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
								justifyContent: 'center',
							}}>
							{pages.map((page) => (
								<Link to={`${page.route}`} key={page.route}>
									<Button
										key={page}
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											color: '#000',
											display: 'block',
											mx: 5,
											textTransform: 'capitalize',
										}}>
										{page.name}
									</Button>
								</Link>
							))}
						</Box>
						{authToken && (
							<div className="mr-5 md:mr-10 cursor-pointer hover:opacity-40">
								<ReceiptIcon
									sx={{ color: 'gray' }}
									fontSize="large"
									onClick={handleClick}
								/>
								<Popper id={id} open={open} anchorEl={anchorEl}>
									<div className="shadow-lg bg-white mt-5 min-h-profile-bg min-w-[300px] mr-4 p-5 max-h-[70vh] overflow-y-auto">
										<p className="font-semibold mb-2 text-orange-primary text-lg">
											Transactions History
										</p>
										{data.length === 0 && (
											<div className="flex justify-center min-h-profile-bg items-center">
												<h1 className="font-semibold text-orange-primary text-lg">
													Belum ada transaksi
												</h1>
											</div>
										)}
										<div className="space-y-5">
											{data.length > 0 &&
												data.map((order) => {
													return (
														<div
															className="p-3 shadow-md rounded-md bg-white z-10"
															key={order.createdAt}>
															<div className="flex space-x-4 mb-5 w-full">
																<div>
																	<img
																		src={`${process.env.PUBLIC_URL}/images/${order.dosenId.image}`}
																		alt="dosen"
																		width="60px"
																	/>
																</div>
																<div className="w-full space-y-2">
																	<h1 className="">
																		{order.dosenId.namaLengkap}
																	</h1>
																	<div className="flex items-center justify-between">
																		<p className="font-semibold">
																			IDR {order.responseMidtrans.gross_amount}
																		</p>
																		<div className="bg-yellow-100 text-orange-primary text-sm font-semibold max-w-max py-1 px-2 rounded-md">
																			{
																				order.responseMidtrans
																					.transaction_status
																			}
																		</div>
																	</div>
																	<p className="max-w-max text-md bg-tosca-secondary text-tosca-primary py-1 px-2 rounded-md">
																		VA:{' '}
																		{order.responseMidtrans.hasOwnProperty(
																			'va_numbers'
																		)
																			? order.responseMidtrans.va_numbers[0]
																					.va_number
																			: order.responseMidtrans
																					.permata_va_number}
																	</p>
																	{localStorage.getItem('va-timeout') &&
																		order.responseMidtrans
																			.transaction_status === 'pending' && (
																			<div className="">
																				<CountingDown renderer={renderer} />
																			</div>
																		)}
																</div>
															</div>
														</div>
													);
												})}
										</div>
									</div>
								</Popper>
							</div>
						)}
						{authToken ? (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/2.jpg"
										/>
									</IconButton>
								</Tooltip>

								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}>
									{settings.map((setting) => (
										<MenuItem
											key={setting}
											onClick={() => handleCloseUserMenu(setting)}>
											<Typography textAlign="center">{setting}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						) : (
							<Link to={`/${pathname === '/login' ? 'signup' : 'login'}`}>
								<Box>
									<PrimaryButton variant="primary">
										{pathname === '/login' ? 'signup' : 'login'}
									</PrimaryButton>
								</Box>
							</Link>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default Navbar;
