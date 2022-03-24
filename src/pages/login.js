import { Container } from '@mui/material';
import React, { useState } from 'react';
import { PrimaryButton } from '../components/navbar';
import dosen from '../images/dosen.png';
import mahasiswa from '../images/mahasiswa.png';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { konsulAPI } from '../utils/api';

const Login = () => {
	const { setAndGetTokens } = useAuth();
	const navigate = useNavigate();
	const [login, setLogin] = useState({ mahasiswa: true, dosen: false });
	const [mahasiswa, setMahasiswa] = useState({ email: null, password: null });

	const handleLogin = async (user, e) => {
		if (user === 'dosen' && login.mahasiswa)
			setLogin((login) => ({ dosen: true, mahasiswa: false }));
		if (user === 'mahasiswa' && login.dosen)
			setLogin((login) => ({ dosen: false, mahasiswa: true }));

		if (user === 'mahasiswa' && login.mahasiswa) {
			console.log(mahasiswa);
			//login mahasiswa
			e.preventDefault();
			try {
				const loginResponse = await konsulAPI.post('/api/auth/login', {
					...mahasiswa,
				});
				console.log(loginResponse);
				//jika sukses
				if (loginResponse.data.success) {
					const token = loginResponse.data.data.accessToken;

					// const currUser = await konsulAPI.get('/user', {
					// 	headers: { Authorization: `Bearer ${token}` },
					// });
					const id = loginResponse.data.data.id;
					setAndGetTokens(token, id);
					navigate('/', { replace: true });
					console.log(loginResponse, token, 'tokenton');
				}
			} catch (error) {
				// dispatch({ type: 'SETERROR' });
				console.log(error, 'in login');
			}
		}
		if (user === 'dosen' && login.dosen) {
			//login dosen
		}
	};

	return (
		<div className="min-h-sm-screen py-20">
			<Container>
				<div className="flex flex-col justify-center items-center md:flex-row space-y-10 md:space-y-0 md:space-x-10 md:h-screen min-h-screen ">
					<div className="flex flex-col items-center justify-center space-y-5 p-5 shadow-md w-full  flex-1 min-h-full">
						{!login.mahasiswa && <img src={mahasiswa} alt="mahasiswa" />}
						{login.mahasiswa && (
							<form
								className="w-full space-y-10"
								onSubmit={(e) => handleLogin('mahasiswa', e)}>
								<div>
									<h1 className="font-bold text-3xl">
										Masuk Sebagai Mahasiswa
									</h1>
									<p className="mt-2">Isi data di bawah ini dengan benar</p>
								</div>
								<TextField
									id="outlined-basic"
									label="Email"
									variant="outlined"
									type={'email'}
									required
									sx={{ width: '100%' }}
									onChange={(e) =>
										setMahasiswa((mahasiswa) => ({
											...mahasiswa,
											email: e.target.value,
										}))
									}
								/>
								<TextField
									id="outlined-basic"
									label="Password"
									variant="outlined"
									type={'password'}
									onChange={(e) =>
										setMahasiswa((mahasiswa) => ({
											...mahasiswa,
											password: e.target.value,
										}))
									}
									required
									sx={{ width: '100%' }}
								/>
							</form>
						)}
						<PrimaryButton
							full={true}
							onClick={(e) => handleLogin('mahasiswa', e)}>
							Login Sebagai Mahasiswa
						</PrimaryButton>
					</div>
					<p>atau</p>
					<div className="flex flex-col items-center justify-center space-y-5 p-5 shadow-md w-full  flex-1 min-h-full">
						{!login.dosen && <img src={dosen} alt="dosen" />}
						{login.dosen && (
							<form className="w-full space-y-10">
								<div>
									<h1 className="font-bold text-3xl">Masuk Sebagai Dosen</h1>
									<p className="mt-2">Isi data di bawah ini dengan benar</p>
								</div>
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
						<PrimaryButton onClick={(e) => handleLogin('dosen', e)}>
							Login Sebagai Dosen
						</PrimaryButton>
					</div>
				</div>
				<p className="text-center mt-10">
					Belum mempunyai akun?
					<Link to="/signup">
						<span className="text-tosca-primary"> Daftar sekarang</span>
					</Link>
				</p>
			</Container>
		</div>
	);
};

export default Login;