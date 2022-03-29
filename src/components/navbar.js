import React, { useState } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { pages } from '../utils/constant';
import logo from '../images/logo.png';
import { useAuth } from '../utils/auth';

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

const settings = ['Profile', 'Logout'];

const Navbar = () => {
	const { setAndGetTokens, authToken } = useAuth();
	const { pathname } = useLocation();
	const login = false;
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

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
		}
	};
	return (
		<>
			<AppBar position="sticky" sx={{ color: '#000', background: 'white' }}>
				<Container maxWidth="xl">
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
