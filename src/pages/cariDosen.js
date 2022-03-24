import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DosenCard from '../components/dosenCard';
import { PrimaryButton } from '../components/navbar';
import { konsulAPI } from '../utils/api';
import { Link } from 'react-router-dom';

const CariDosen = () => {
	const [location, setLocation] = useState('');
	const [allDosen, setAllDosen] = useState([]);
	const [error, setError] = useState({ status: false, message: null });
	const fetchDosen = async () => {
		try {
			setError((error) => ({ status: false, message: null }));
			const data = await konsulAPI.get('/api/dosen');
			setAllDosen(data.data.data);
		} catch (err) {
			setError((error) => ({
				status: true,
				message: 'Error while fetching data...',
			}));
			console.log(err);
		}
	};

	const handleChange = (event) => {
		setLocation(event.target.value);
	};

	useEffect(() => {
		fetchDosen();
	}, []);
	return (
		<>
			<div className="bg-cari-dosen-pattern bg-cover bg-center py-40">
				<Container maxWidth={'xl'}>
					<div className="flex flex-col justify-center md:items-center">
						<div className="space-y-10 w-full md:max-w-6xl">
							<h1 className="font-bold text-4xl md:text-7xl">
								<span className="text-tosca-primary">Konsultasikan</span> tugas
								akhir atau skripsimu{' '}
								<span className="text-tosca-primary">sekarang!</span>
							</h1>
							<p className="md:text-xl">
								Tentukan lokasi, lalu cari dosen, topik skripsi/tugas akhir,
								atau universitas yang sudah tersedia di bawah ini. Pastikan
								pilih dosen yang sesuai dengan topik skripsi atau tugas akhir
								kamu.
							</p>
						</div>
					</div>
				</Container>
			</div>
			<Container maxWidth={'xl'}>
				<div className="flex flex-col md:items-center min-h-sm-screen">
					<div className="flex items-center max-h-15 mb-20">
						<div className="hidden md:block">
							<Box sx={{ minWidth: 120 }}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Cari Lokasi
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={location}
										label="Cari Lokasi"
										onChange={handleChange}>
										<MenuItem value={10}>Ten</MenuItem>
										<MenuItem value={20}>Twenty</MenuItem>
										<MenuItem value={30}>Thirty</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</div>
						<input
							type="text"
							name="search"
							id="searc"
							placeholder="Cari nama dosen"
							className="h-16 w-search border-2 px-5"
						/>
						<button className="bg-orange-primary text-white h-16 px-5 rounded-tr-lg rounded br-lg uppercase">
							Search
						</button>
					</div>
					<div className="space-y-5 mb-20">
						{allDosen.length === 0 && !error.status && 'Fetching data...'}
						{allDosen.length > 0 &&
							allDosen.map((data, idx) => (
								<div key={idx}>
									<Link to={`/dosen/${data._id}`}>
										<DosenCard data={data} />
									</Link>
								</div>
							))}
						{error.status && error.message}
						{/* <h1 className="text-center">Data tidak ada</h1> */}
					</div>
				</div>
			</Container>
		</>
	);
};

export default CariDosen;
