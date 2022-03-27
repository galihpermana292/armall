import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import dosenPicture from '../images/dosenpicture.png';
import { PrimaryButton } from '../components/navbar';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Cards from '../components/card';
import testi from '../images/testi.png';
import { konsulAPI } from '../utils/api';

const DUMMY = {
	namaLengkap: 'Joko Apriatna, S.Kom, M.kom',
	universitas: 'Universitas Brawijaya',
	fakultas: 'Ilmu Komputer',
	lokasi: 'Malang, Jawa Timur',
	totalKonsultasi: '2500',
	tarif: '250000',
};

const DetailDosen = ({ data }) => {
	const { id } = useParams();

	const [detailDosen, setDetailDosen] = useState([]);
	const {
		namaLengkap,
		universitas,
		fakultas,
		lokasi,
		totalKonsultasi,
		tarif,
		profil,
		lokasiJadwal = [],
		topik = [],
		pendidikan = [],
		ulasan = [],
	} = detailDosen;
	const [error, setError] = useState({ status: false, message: null });
	const fetchDosen = async () => {
		try {
			setError((error) => ({ status: false, message: null }));
			const data = await konsulAPI.get(`/api/dosen/${id}`);
			setDetailDosen(data.data.data);
			console.log(data);
		} catch (err) {
			setError((error) => ({
				status: true,
				message: 'Error while fetching data...',
			}));
			console.log(err);
		}
	};

	useEffect(() => {
		fetchDosen();
	}, []);

	return (
		<Container maxWidth={'xl'}>
			<div className="flex flex-col md:items-center min-h-sm-screen pt-10 space-y-10">
				<Card sx={{ width: '100%', maxWidth: '650px' }}>
					<div className=" min-h-profile-bg bg-profile-bg-pattern bg-center bg-cover"></div>
					<div className="flex flex-col-reverse md:flex-row-reverse md:items-center md:space-y-0 py-5 px-7 relative">
						<div className="flex flex-col md:flex-row w-full md:items-center md:space-x-10 mt-5 space-y-5 md:space-y-0">
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
								<div className="flex items-center space-x-2">
									<PrimaryButton full={'true'}>buat janji</PrimaryButton>
									<PrimaryButton full={'true'} secondary={'true'}>
										kirimpesan
									</PrimaryButton>
								</div>
							</div>
						</div>
						<CardMedia
							component="img"
							sx={{
								width: 100,
								height: 100,
								marginRight: '1rem',
								position: 'absolute',
								top: '-80px',
								left: '20px',
							}}
							image={dosenPicture}
							alt="profile"
						/>
					</div>
				</Card>

				{/* profile overview dosen */}
				<Card sx={{ width: '100%', maxWidth: '650px' }}>
					<div className="flex flex-col justify-center p-7">
						<h1 className="text-tosca-primary text-2xl font-semibold mb-3">
							Profile Dosen
						</h1>
						<p>{profil}</p>
					</div>
				</Card>

				{/*  lokasi dan jadwal konsultasi */}
				<Card sx={{ width: '100%', maxWidth: '650px' }}>
					<div className="flex flex-col justify-center p-7">
						<h1 className="text-tosca-primary text-2xl font-semibold mb-3">
							Lokasi dan Jadwal Konsultasi
						</h1>
						<div className="space-y-5">
							{[1, 2, 3].map((idx) => {
								return (
									<div className="p-3 border-2 rounded-md" key={idx}>
										<div className="flex space-x-5 mb-5 w-full "></div>
										<h1 className="font-bold">Senin</h1>
										<div className="flex items-center justify-between w-full">
											<p>Sekitar Universitas Brawijaya</p>
											<p>09.00 - 12.00</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Card>

				{/* topik overview dosen */}
				<Card sx={{ width: '100%', maxWidth: '650px' }}>
					<div className="flex flex-col justify-center p-7">
						<h1 className="text-tosca-primary text-2xl font-semibold mb-3">
							Topik yang Dikuasai
						</h1>
						{topik.map((data, idx) => (
							<p>- {data}</p>
						))}
					</div>
				</Card>

				{/* pendidikan overview dosen */}
				<Card sx={{ width: '100%', maxWidth: '650px' }}>
					<div className="flex flex-col justify-center p-7">
						<h1 className="text-tosca-primary text-2xl font-semibold mb-3">
							Riwayat Pendidikan
						</h1>
						{pendidikan.map((data, idx) => (
							<p>- {data}</p>
						))}
					</div>
				</Card>

				{/*  ulasan */}
				<Card sx={{ width: '100%', maxWidth: '650px' }}>
					<div className="flex flex-col justify-center p-7">
						<h1 className="text-tosca-primary text-2xl font-semibold mb-3">
							Ulasan
						</h1>
						<div className="space-y-5">
							{ulasan.map((data, idx) => {
								return (
									<div className="p-3 border-2 rounded-md" key={idx}>
										<div className="flex space-x-5 mb-5 w-full ">
											<img src={testi} alt="testi" />
											<div className="w-full">
												<div className="flex items-center justify-between w-full">
													<h1 className="font-bold">{data.nama}</h1>
													<p>{data.tanggal}</p>
												</div>
												<p>{data.jurusan}</p>
											</div>
										</div>
										<p>{data.text}</p>
									</div>
								);
							})}
						</div>
					</div>
				</Card>
			</div>
		</Container>
	);
};

export default DetailDosen;
