import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import dosenPicture from '../images/dosenpicture.png';
import { PrimaryButton } from '../components/navbar';
const DosenCard = ({ data }) => {
	const { namaLengkap, universitas, fakultas, lokasi, totalKonsultasi, tarif } =
		data;
	return (
		<Card sx={{ padding: '2rem' }}>
			<div className="flex flex-col-reverse md:flex-row-reverse md:items-center md:space-y-0">
				<div className="flex flex-col md:flex-row md:items-center mt-5 space-y-5 md:space-y-0 md:space-x-5">
					<div className="space-y-1">
						<h1 className="font-semibold text-xl">{namaLengkap}</h1>
						<p>{universitas}</p>
						<p>Fakultas {fakultas}</p>
						<p>{lokasi}</p>
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
						<h1 className="font-semibold text-xl text-orange-primary">
							5.0 (97)
						</h1>
						<p>Jasa Konsultasi mulai dari</p>
						<h1 className="font-semibold text-xl text-orange-primary">
							Rp {tarif}/jam
						</h1>
						<PrimaryButton full={'true'}>KONSULTASI</PrimaryButton>
					</div>
				</div>
				<CardMedia
					component="img"
					sx={{ width: 100, height: 100, marginRight: '1rem' }}
					image={dosenPicture}
					alt="profile"
				/>
			</div>
		</Card>
	);
};

export default DosenCard;
