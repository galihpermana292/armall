import React from 'react';
import { PrimaryButton } from '../components/navbar';
import { Container } from '@mui/material';
import Cards from '../components/card';
import hero from '../images/hero.png';
import { TESTIMONI, WHY_US } from '../utils/constant';

const Landing = () => {
	return (
		<>
			<Container maxWidth="xl">
				{/* Section 1 */}
				<div className="min-h-screen flex flex-col-reverse justify-center md:flex-row md:justify-between md:items-center">
					<div className="max-w-3xl space-y-10 mt-10">
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
						<PrimaryButton>Cari Dosen Sekarang</PrimaryButton>
					</div>
					<div className="max-w-4xl">
						<img src={hero} alt="hero" />
					</div>
				</div>
			</Container>

			{/* Section 2 */}
			<div className="my-10 bg-section2-pattern bg-cover bg-no-repeat bg-center py-14">
				<Container maxWidth="xl">
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
		</>
	);
};

export default Landing;
