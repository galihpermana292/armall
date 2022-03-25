import { Container } from '@mui/material';
import React, { useState } from 'react';
import { PrimaryButton } from '../components/navbar';
import dosen from '../images/dosen.png';
import mahasiswa from '../images/mahasiswa.png';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { konsulAPI } from '../utils/api';

const Signup = () => {
	const { setAndGetTokens } = useAuth();
	const navigate = useNavigate();
	const [signup, setSignup] = useState({ mahasiswa: true, dosen: false });
	const [loading, setLoading] = useState(false);
	const [mahasiswa, setMahasiswa] = useState({
		fullname: null,
		phoneNumber: null,
		email: null,
		password: null,
	});
	const [fieldError, setFieldError] = useState({
		password: { status: false, message: null },
		phoneNumber: { status: false, message: null },
		general: { status: false, message: null },
	});

	const handleSignup = async (user, e) => {
		if (user === 'dosen' && signup.mahasiswa)
			setSignup((signup) => ({ dosen: true, mahasiswa: false }));
		if (user === 'mahasiswa' && signup.dosen)
			setSignup((signup) => ({ dosen: false, mahasiswa: true }));

		if (user === 'mahasiswa' && signup.mahasiswa) {
			//signup mahasiswa
			e.preventDefault();
			try {
				setLoading(true);
				setFieldError((fieldError) => ({
					password: { status: false, message: null },
					phoneNumber: { status: false, message: null },
					general: { status: false, message: null },
				}));
				const signupResponse = await konsulAPI.post('/api/auth/register', {
					...mahasiswa,
				});
				//jika sukses
				if (signupResponse.data.success) {
					const id = signupResponse.data.data.id;
					try {
						const loginResponse = await konsulAPI.post('/api/auth/login', {
							email: mahasiswa.email,
							password: mahasiswa.password,
						});
						const token = loginResponse.data.data.accessToken;
						setAndGetTokens(token, id);
						navigate('/', { replace: true });
						setLoading(false);
					} catch (error) {
						setLoading(false);
						if (error.message !== 'Network Error') {
							setFieldError((fieldError) => ({
								...fieldError,
								general: { status: true, message: 'Error While Logging in' },
							}));
						} else {
							setFieldError((fieldError) => ({
								...fieldError,
								general: { status: true, message: 'Network Error' },
							}));
						}
					}
				}
			} catch (error) {
				setLoading(false);
				if (error.message !== 'Network Error') {
					error.response.data.message.errors.map((error) => {
						setFieldError((fieldError) => ({
							...fieldError,
							[error.param]: { status: true, message: error.msg },
						}));
					});
				} else {
					setFieldError((fieldError) => ({
						...fieldError,
						general: { status: true, message: 'Network Error' },
					}));
				}
			}
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
							<form
								className="w-full space-y-10"
								onSubmit={(e) => handleSignup('mahasiswa', e)}>
								<div>
									<h1 className="font-bold text-3xl">
										Daftar Sebagai Mahasiswa
									</h1>
									<p className="mt-2">Isi data di bawah ini dengan benar</p>
								</div>
								<TextField
									disabled={loading ? true : false}
									id="outlined-basic"
									label="Nama Lengkap"
									variant="outlined"
									type={'text'}
									required
									sx={{ width: '100%' }}
									onChange={(e) =>
										setMahasiswa((mahasiswa) => ({
											...mahasiswa,
											fullname: e.target.value,
										}))
									}
								/>
								<TextField
									disabled={loading ? true : false}
									id="outlined-basic"
									error={fieldError.phoneNumber.status ? true : false}
									label={
										fieldError.phoneNumber.status ? 'Error' : 'Nomor Telepon'
									}
									variant="outlined"
									type={'number'}
									helperText={
										fieldError.phoneNumber.status
											? fieldError.phoneNumber.message
											: ''
									}
									required
									sx={{ width: '100%' }}
									onChange={(e) =>
										setMahasiswa((mahasiswa) => ({
											...mahasiswa,
											phoneNumber: e.target.value,
										}))
									}
								/>
								<TextField
									disabled={loading ? true : false}
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
									disabled={loading ? true : false}
									error={fieldError.password.status ? true : false}
									id="outlined-basic"
									helperText={
										fieldError.password.status
											? fieldError.password.message
											: ''
									}
									variant="outlined"
									type={'password'}
									label={fieldError.password.status ? 'Error' : 'Password'}
									required
									sx={{ width: '100%' }}
									onChange={(e) =>
										setMahasiswa((mahasiswa) => ({
											...mahasiswa,
											password: e.target.value,
										}))
									}
								/>
								{fieldError.general.status && (
									<p className="text-center text-red-500 font-semibold">
										{fieldError.general.message}
									</p>
								)}
							</form>
						)}
						<PrimaryButton
							disabled={loading ? true : false}
							full={true}
							onClick={(e) => handleSignup('mahasiswa', e)}>
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
