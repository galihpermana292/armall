import { Container } from '@mui/material';
import React, { useState } from 'react';
import { PrimaryButton } from '../components/navbar';
import dosen from '../images/dosen.png';
import mahasiswa from '../images/mahasiswa.png';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

const Signup = () => {
	const [signup, setSignup] = useState({ mahasiswa: true, dosen: false });
	const handleSignup = (user) => {
		if (user === 'dosen' && signup.mahasiswa)
			setSignup((signup) => ({ dosen: true, mahasiswa: false }));
		if (user === 'mahasiswa' && signup.dosen)
			setSignup((signup) => ({ dosen: false, mahasiswa: true }));

		if (user === 'mahasiswa' && signup.mahasiswa) {
			//signup mahasiswa
		}
		if (user === 'dosen' && signup.dosen) {
			//signup dosen
		}
	};

	return (
		<div className="min-h-sm-screen py-20">
			<Container>
				<div className="flex flex-col justify-center items-center md:flex-row space-y-10 md:space-y-0 md:space-x-10 md:h-screen min-h-screen ">
					<div className="flex flex-col items-center justify-center space-y-5 p-5 shadow-md w-full  flex-1 min-h-full">
						{!signup.mahasiswa && <img src={mahasiswa} alt="mahasiswa" />}
						{signup.mahasiswa && (
							<form className="w-full space-y-10">
								<div>
									<h1 className="font-bold text-3xl">
										Daftar Sebagai Mahasiswa
									</h1>
									<p className="mt-2">Isi data di bawah ini dengan benar</p>
								</div>
								<TextField
									id="outlined-basic"
									label="Nama Lengkap"
									variant="outlined"
									type={'text'}
									required
									sx={{ width: '100%' }}
								/>
								<TextField
									id="outlined-basic"
									label="Nomor Telepon"
									variant="outlined"
									type={'number'}
									required
									sx={{ width: '100%' }}
								/>
								<TextField
									id="outlined-basic"
									label="Email"
									variant="outlined"
									type={'email'}
									required
									sx={{ width: '100%' }}
								/>
								<TextField
									id="outlined-basic"
									label="Password"
									variant="outlined"
									type={'password'}
									required
									sx={{ width: '100%' }}
								/>
							</form>
						)}
						<PrimaryButton
							full={true}
							onClick={() => handleSignup('mahasiswa')}>
							signup Sebagai Mahasiswa
						</PrimaryButton>
					</div>
					<p>atau</p>
					<div className="flex flex-col items-center justify-center space-y-5 p-5 shadow-md w-full  flex-1 min-h-full">
						{!signup.dosen && <img src={dosen} alt="dosen" />}
						{signup.dosen && (
							<form className="w-full space-y-10">
								<div>
									<h1 className="font-bold text-3xl">Yah!</h1>
									<p className="mt-2">Fitur ini belum tersedia sekarang...</p>
								</div>
							</form>
						)}
						<PrimaryButton onClick={() => handleSignup('dosen')}>
							signup Sebagai Dosen
						</PrimaryButton>
					</div>
				</div>
				<p className="text-center mt-10">
					Sudah mempunyai akun?
					<Link to="/login">
						<span className="text-tosca-primary"> Login sekarang</span>
					</Link>
				</p>
			</Container>
		</div>
	);
};

export default Signup;
