import React from 'react';
import { PrimaryButton } from '../components/navbar';
import { Container } from '@mui/material';
import Cards from '../components/card';
import hero from '../images/hero.png';
import hero2 from '../images/hero2.png';
import { TESTIMONI, WHY_US } from '../utils/constant';
import { Link } from 'react-router-dom';
import dot from '../images/dot.png';

const Landing = () => {
	return (
		<>
			<Container maxWidth="xl">
				{/* Section 1 */}
				<div className="min-h-screen flex flex-col-reverse justify-center md:flex-row md:justify-between md:items-center">
					<div className="md:max-w-3xl space-y-10 mt-10">
						<h1 className=" font-bold text-4xl md:text-7xl">
							Cara termudah menemukan
							<span className="text-tosca-primary"> dosen pembimbing</span>
						</h1>
						<p className="md:text-xl">
							Selesaikan skripsi maupun tugas akhir kamu dengan dosen pembimbing
							yang kamu pilih. Di sini kamu dapat menemukan dosen pembimbing
							yang berpengalaman di bidangnya untuk berkonsultasi masalah
							skripsi atau tugas akhir kamu yang tak kunjung selesai.
						</p>
						<div>
							<Link to="/cari-dosen">
								<PrimaryButton>Cari Dosen Sekarang</PrimaryButton>
							</Link>
						</div>
					</div>
					<div className="max-w-4xl">
						<img src={hero} alt="hero" />
					</div>
				</div>
			</Container>

			{/* Section 2 */}
			<div className="my-12 bg-section2-pattern bg-cover bg-no-repeat bg-center py-16 relative">
				<img src={dot} alt="dot" className="absolute top-24 right-0 md:right-40" />
				<Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
					<div>
						<h1 className="text-2xl my-6 font-semibold">
							Mengapa harus{' '}
							<span className="text-tosca-primary">memilih kami</span>?
						</h1>
					</div>
					<div className="flex flex-col justify-center items-center space-y-5 md:space-y-0 md:flex-row md:justify-between">
						{WHY_US.map((data, idx) => (
							<div key={idx}>
								<Cards
									image={data.image}
									title={data.title}
									desc={data.desc}
									type="normal"
								/>
							</div>
						))}
					</div>
				</Container>
				<img src={dot} alt="dot" className="absolute bottom-0 left-0" />
			</div>

			{/* Section 3 */}
			<div></div>

			{/* Seciton 4 */}
			<div className="my-10 py-14">
				<Container maxWidth="xl">
					<div>
						<h1 className="text-2xl my-6 font-semibold">
							Apa
							<span className="text-tosca-primary"> kata mereka</span>?
						</h1>
					</div>
					<div className="flex flex-col justify-center items-center space-y-5 md:space-y-0 md:flex-row md:justify-between md:overflow-x-auto md:space-x-5 py-5">
						{TESTIMONI.map((data, idx) => (
							<div key={idx} className="w-full">
								<Cards data={data} type="upnormal" />
							</div>
						))}
					</div>
				</Container>
			</div>

			<Container maxWidth="xl">
				{/* Section 5 */}
				<div className="min-h-screen flex flex-col-reverse justify-center md:flex-row-reverse md:justify-between md:items-center">
					<div className="md:max-w-4xl space-y-10 mt-10">
						<h1 className=" font-bold text-4xl md:text-7xl">
							<span className="text-tosca-primary">Selesaikan </span>
							tugas akhir atau skripsi kamu
							<span className="text-tosca-primary"> sekarang!</span>
						</h1>
						<p className="md:text-xl">
							Tidak ada kata terlambat untuk menyelesaikan skripsi dan meraih
							gelarmu. Jadi tunggu apa lagi? Ayo daftar sekarang dan mulai cari
							dosen yang sesuai dengan keinginanmu!
						</p>
						<div>
							<Link to="/cari-dosen">
								<PrimaryButton>Cari Dosen Sekarang</PrimaryButton>
							</Link>
						</div>
					</div>
					<div className="max-w-4xl -ml-32">
						<img src={hero2} alt="hero" />
					</div>
				</div>
			</Container>
		</>
	);
};

export default Landing;
