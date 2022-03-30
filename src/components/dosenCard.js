import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import dosenPicture from '../images/dosenpicture.png';
import { PrimaryButton } from '../components/navbar';
import fakultasImg from '../images/fakultas.png';
import locationImg from '../images/location.png';
import star from '../images/start.png';
const DosenCard = ({ data }) => {
	const {
		namaLengkap,
		universitas,
		fakultas,
		lokasi,
		totalKonsultasi,
		tarif,
		image,
	} = data;
	return (
		<Card sx={{ padding: '2rem' }}>
			<div className="flex flex-col-reverse md:flex-row-reverse md:items-center md:space-y-0">
				<div className="flex flex-col md:flex-row md:items-center mt-5 space-y-5 md:space-y-0 md:space-x-5">
					<div className="space-y-1">
						<h1 className="font-semibold text-xl">{namaLengkap}</h1>
						<div className="flex space-x-2">
							<div>
								<img src={fakultasImg} alt={fakultasImg} className="w-[20px]" />
							</div>
							<div>
								<p>{universitas}</p>
								<p>Fakultas {fakultas}</p>
							</div>
						</div>
						<div className="flex space-x-2 items-center">
							<div>
								<img src={locationImg} alt={locationImg} className="w-[20px]" />
							</div>
							<p>{lokasi}</p>
						</div>
						<div className="rounded-lg p-2 bg-tosca-secondary text-gray-600">
							<p>
								<span className="text-tosca-primary">
									{totalKonsultasi} Mahasiswa
								</span>{' '}
								telah berkonsultasi dengan dosen ini
							</p>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex space-x-2">
							<img src={star} alt="rating" />
							<h1 className="font-semibold text-xl text-orange-primary">
								{data.ulasan[0].banyak}
							</h1>
						</div>
						<p>Jasa Konsultasi mulai dari</p>
						<h1 className="font-semibold text-xl text-orange-primary">
							Rp {tarif}/jam
						</h1>
						<PrimaryButton full={'true'}>KONSULTASI</PrimaryButton>
					</div>
				</div>
				<CardMedia
					component="img"
					sx={{ width: 100, height: 100, marginRight: '2rem' }}
					image={`${process.env.PUBLIC_URL}/images/${data.image}`}
					alt="profile"
				/>
			</div>
		</Card>
	);
};

export default DosenCard;
