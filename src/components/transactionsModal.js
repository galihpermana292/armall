import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import toni from '../images/toni.png';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { konsulAPI } from '../utils/api';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryButton } from './navbar';
import CountingDown from '../components/countDown';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	maxWidth: '400px',
	bgcolor: 'background.paper',
	borderRadius: '.5rem',
	boxShadow: 24,
	p: 4,
	maxHeight: '70vh',
	overflowY: 'auto',
};

export default function TransactionModal({
	open = false,
	handleClose,
	status,
	data = {},
	timer,
}) {
	const userId = JSON.parse(localStorage.getItem('id'));
	const [bank, setBank] = useState('');
	const [paymentData, setPaymentData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [jadwal, setJadwal] = useState({});
	const [error, setError] = useState({ status: false, message: null });
	const [fieldError, setFieldError] = useState({
		hari: { status: false, message: null },
		jam: { status: false, message: null },
		bank: { status: false, message: null },
		general: { status: false, message: null },
	});

	const [jam, setJam] = useState([]);
	const total = parseInt(data.tarif) + 6500;

	const handleChangeDay = async (e) => {
		const hari = e.target.value;
		let choosen = {};
		data.lokasiJadwal.filter((jad) => {
			if (jad.hari === hari) choosen = jad;
		});
		const tempat = choosen.lokasi;
		setJam([choosen.jam]);
		setJadwal({ hari, tempat });
	};

	const handleChangeJam = async (e) => {
		const jam = e.target.value;
		setJadwal((jadwal) => ({ ...jadwal, jam }));
	};

	const handleChangeBank = async (event) => {
		setBank(event.target.value);
	};

	const postPayment = async () => {
		const params = {
			payment_type: 'bank_transfer',
			bank_transfer: {
				bank: bank,
			},
			transaction_details: {
				order_id: uuidv4(),
				gross_amount: total,
			},
			dosenId: data.id,
			userId: userId,
			type: status,
			hari: status === 'chat' ? '' : jadwal.hari,
			jam: status === 'chat' ? '' : jadwal.jam,
			lokasi: status === 'chat' ? '' : jadwal.tempat,
		};
		try {
			setLoading(true);
			let datas = await konsulAPI.post('/api/payment', params);
			let parseDatas = JSON.parse(datas.data.data.responseMidtrans);
			if (datas.data.success) {
				localStorage.setItem('va-timeout', JSON.stringify(params.dosenId));
				const orderId = datas.data.data._id;
				localStorage.setItem('order-id', JSON.stringify(orderId));
				if (bank === 'mandiri')
					setPaymentData({
						va: parseDatas.permata_va_number,
						orderId: parseDatas.order_id,
					});
				else
					setPaymentData({
						va: parseDatas.va_numbers[0].va_number,
						orderId: parseDatas.order_id,
					});
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setFieldError((fieldError) => ({
				...fieldError,
				general: {
					status: true,
					message: 'Transaction failed due to network error',
				},
			}));
			setLoading(false);
		}
	};

	const createTransaction = async () => {
		//intial re value state
		setFieldError((fieldError) => ({
			hari: { status: false, message: null },
			jam: { status: false, message: null },
			bank: { status: false, message: null },
			general: { status: false, message: null },
		}));

		// cek statusnya
		if (status === 'chat') {
			//check banknya kosong apa ngga
			if (bank === '') {
				setFieldError((fieldError) => ({
					...fieldError,
					bank: { status: true, message: 'Choose payment method' },
				}));
				return;
			}

			postPayment();
		} else {
			//check banknya kosong apa ngga
			if (bank === '') {
				setFieldError((fieldError) => ({
					...fieldError,
					bank: { status: true, message: 'Choose payment method' },
				}));
			} else if (!jadwal.hasOwnProperty('hari')) {
				setFieldError((fieldError) => ({
					...fieldError,
					hari: {
						status: true,
						message: 'Choose the day for the meet up schedule',
					},
				}));
			} else if (!jadwal.hasOwnProperty('jam')) {
				setFieldError((fieldError) => ({
					...fieldError,
					jam: {
						status: true,
						message: 'Choose the time for the meet up schedule',
					},
				}));
			} else {
				postPayment();
			}
		}
	};
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div>
					<Box sx={style}>
						<div className="flex flex-col space-y-4">
							<div className="">
								<h1 className="font-semibold text-2xl text-orange-primary">
									{status === 'janji'
										? 'Pembayaran Janji Temu'
										: 'Pembayaran Chat'}
								</h1>
							</div>
							<div className="flex justify-start items-center space-x-4 shadow-md p-3 rounded-md">
								<img
									src={`${process.env.PUBLIC_URL}/images/${data.image}`}
									alt={data.image}
									className="w-full max-w-[45px] h-[45px]"
								/>
								<div>
									<h1 className="font-semibold">{data.namaLengkap}</h1>
									<p>Fakultas {data.fakultas}</p>
								</div>
							</div>
							<div className="flex-col space-y-2 shadow-md p-3 rounded-md">
								<div className="flex items-center justify-between">
									<p>Subtotal</p>
									<p>Rp. {data.tarif}</p>
								</div>
								<div className="flex items-center justify-between">
									<p>Biaya Layanan</p>
									<p>Rp. 6500</p>
								</div>
							</div>
							<div>
								<div className="flex items-center justify-between shadow-md p-3 rounded-md">
									<p>Total</p>
									<p className="text-orange-primary font-semibold">
										Rp. {total}
									</p>
								</div>
							</div>
						</div>

						{status === 'janji' && (
							<>
								<div className="flex-col mt-4 space-y-2 p-2 shadow-md rounded-md">
									<p className="my-2">Hari Konsultasi</p>
									<FormControl
										fullWidth
										disabled={
											loading || paymentData.hasOwnProperty('va') ? true : false
										}>
										<Select
											value={
												data.lokasiJadwal.length > 0 ? jadwal.hari : 'all day'
											}
											error={fieldError.hari.status ? true : false}
											onChange={handleChangeDay}
											sx={{ width: '100%' }}>
											{data.lokasiJadwal.map((jadwal, idx) => (
												<MenuItem value={jadwal.hari} key={idx}>
													{jadwal.hari}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<p className="my-2 text-red-500">
										{fieldError.hari.status ? fieldError.hari.message : ''}
									</p>
								</div>

								{jadwal.hasOwnProperty('tempat') && (
									<>
										<div className="flex-col mt-4 space-y-2 p-2 shadow-md rounded-md">
											<p className="my-2">Jam Konsultasi</p>
											<FormControl
												fullWidth
												disabled={
													loading || paymentData.hasOwnProperty('va')
														? true
														: false
												}>
												<Select
													// value={jadwal.jam}
													error={fieldError.jam.status ? true : false}
													onChange={handleChangeJam}
													sx={{ width: '100%' }}>
													{jam.length > 0 &&
														jam.map((jam, idx) => (
															<MenuItem value={jam} key={idx}>
																{jam}
															</MenuItem>
														))}
												</Select>
											</FormControl>

											<p className="my-2 text-red-500">
												{fieldError.jam.status ? fieldError.jam.message : ''}
											</p>
										</div>
									</>
								)}

								{jadwal.hasOwnProperty('jam') && (
									<>
										<div className="mt-5">
											<div className="shadow-md p-3 rounded-md">
												<p>Tempat Konsultasi </p>
												<p className="text-center mt-3 font-semibold">
													{jadwal.tempat}
												</p>
											</div>
										</div>
									</>
								)}
							</>
						)}

						<div className="flex-col mt-4 space-y-2 p-2 shadow-md rounded-md">
							<p className="my-2">Metode Pembayaran</p>
							<FormControl
								fullWidth
								disabled={
									loading || paymentData.hasOwnProperty('va') ? true : false
								}>
								<Select
									value={bank}
									onChange={handleChangeBank}
									error={fieldError.bank.status ? true : false}
									sx={{ width: '100%' }}>
									<MenuItem value="mandiri">Mandiri</MenuItem>
									<MenuItem value="bca">BCA</MenuItem>
									<MenuItem value="bni">BNI</MenuItem>
								</Select>
							</FormControl>
							<p className="my-2 text-red-500">
								{fieldError.bank.status ? fieldError.bank.message : ''}
							</p>
						</div>

						{paymentData.hasOwnProperty('va') && (
							<>
								<div className="mt-5">
									<div className="shadow-md p-3 rounded-md">
										<p>Virtual Account </p>
										<p className="text-orange-primary font-semibold mt-5 text-center text-2xl">
											{paymentData.va}
										</p>
										<p className="uppercase text-center mt-3 font-semibold">
											{bank}
										</p>
									</div>
								</div>
								{localStorage.getItem('va-timeout') && (
									<div className="mt-5 shadow-md p-3 rounded-md flex justify-center">
										<CountingDown renderer={timer} />
									</div>
								)}
								<div className="mt-5">
									<PrimaryButton
										full={'true'}
										secondary={'true'}
										onClick={handleClose}
										disabled={loading ? true : false}>
										tutup
									</PrimaryButton>
								</div>
							</>
						)}

						{paymentData.length === 0 && (
							<div className="mt-5">
								<PrimaryButton full={'true'} onClick={createTransaction}>
									buat transaksi
								</PrimaryButton>
							</div>
						)}
					</Box>
				</div>
			</Modal>
		</div>
	);
}
