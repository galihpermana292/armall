import React from 'react';
import { Container } from '@mui/material';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import universitas from '../images/universitas.png';
import ig from '../images/ig.png';
import link from '../images/link.png';
import tt from '../images/tt.png';
const Footer = () => {
	return (
		<div className="pt-10 mt-10 bg-cari-dosen-pattern bg-cover bg-bottom">
			<Container maxWidth="xl">
				<div className="flex flex-col space-y-12 md:space-y-0 md:flex-row md:justify-around">
					<div className="space-y-10">
						<Link to="/">
							<img src={logo} alt="logo" width={200} />
						</Link>
						<div>
							<h1 className="font-bold text-xl md:text-2xl mb-5">Partner</h1>
							<img src={universitas} alt="univ" className="max-w-md w-full" />
						</div>
					</div>
					<div className="space-y-4">
						<h1 className="font-bold text-xl md:text-2xl">Menu</h1>
						<div>
							<Link to="/">
								<p>Beranda</p>
							</Link>
						</div>
						<div>
							<Link to="/cari-dosen">
								<p>Cari Dosen</p>
							</Link>
						</div>
						<div>
							<Link to="/bantuan">
								<p>Bantuan</p>
							</Link>
						</div>
					</div>
					<div className="space-y-4">
						<h1 className="font-bold text-xl md:text-2xl">Kontak Kami</h1>
						<p>Email</p>
						<p>WhatsApp</p>
					</div>
					<div className="space-y-4">
						<h1 className="font-bold text-xl md:text-2xl">Social Media</h1>
						<div className="flex w-full space-x-5 justify-start md:justify-center">
							<img src={ig} alt="ig" width={'30px'} />
							<img src={link} alt="link" width={'30px'} />
							<img src={tt} alt="tt" width={'30px'} />
						</div>
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
