import React from 'react';
import { Container } from '@mui/material';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
const Footer = () => {
	return (
		<div className="pt-10 mt-10">
			<Container maxWidth="xl">
				<div className="flex flex-col space-y-12 md:space-y-0 md:flex-row md:justify-around">
					<div>
						<Link to="/">
							<img src={logo} alt="logo" width={150} />
						</Link>
					</div>
					<div className="space-y-2">
						<h1 className="font-bold text-xl md:text-2xl">Menu</h1>
						<p>Beranda</p>
						<p>Cari Dosen</p>
						<p>Bantuan</p>
					</div>
					<div className="space-y-2">
						<h1 className="font-bold text-xl md:text-2xl">Kontak Kami</h1>
						<p>Email</p>
						<p>WhatsApp</p>
					</div>
					<div className="space-y-2">
						<h1 className="font-bold text-xl  md:text-2xl">Social Media</h1>
						<p>Tiktok</p>
					</div>
				</div>
			</Container>
			<div className="mt-10 md:mt-20 p-5 text-center">
				Copyright © 2022 BCC_URAAA
			</div>
		</div>
	);
};

export default Footer;
