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
	maxHeight: '90vh',
	overflowY: 'auto',
};

export default function TransactionModal({
	open = false,
	handleClose,
	status,
	data = {},
}) {
	const userId = JSON.parse(localStorage.getItem('id'));
	const [bank, setBank] = useState('');
	const [paymentData, setPaymentData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [jadwal, setJadwal] = useState({});
	const [error, setError] = useState({ status: false, message: null });

	const total = parseInt(data.tarif) + 6500;
	const handleChangeDay = async (e) => {
		const hari = e.target.value;
		const tempat = 'Sekitar Universitas Brawijaya';
		setJadwal({ hari, tempat });
	};
	const handleChangeBank = async (event) => {
		setBank(event.target.value);
	};

	const createTransaction = async () => {
		if (bank === '') {
			setError((error) => ({
				status: true,
				message: 'Choose the payment method',
			}));
		}
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
		};
		try {
			setLoading(true);
			setError((error) => ({ status: false, message: null }));
			const datas = await konsulAPI.post('/api/payment', params);
			console.log(datas);
			if (bank === 'mandiri')
				setPaymentData({
					va: datas.data.data.responseMidtrans.permata_va_number,
					orderId: datas.data.data.responseMidtrans.order_id,
				});
			else
				setPaymentData({
					va: datas.data.data.responseMidtrans.va_numbers[0].va_number,
					orderId: datas.data.data.responseMidtrans.order_id,
				});
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError((error) => ({
				status: true,
				message: 'Transaction failed',
			}));
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
									Pembayaran Chat
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
									<p className="my-2">Jadwal Konsultasi</p>
									<FormControl
										fullWidth
										disabled={
											loading || paymentData.hasOwnProperty('va') ? true : false
										}>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={jadwal.hari}
											onChange={handleChangeDay}
											sx={{ width: '100%' }}>
											<MenuItem value="senin">Senin</MenuItem>
											<MenuItem value="selasa">Selasa</MenuItem>
											<MenuItem value="rabu">Rabu</MenuItem>
										</Select>
									</FormControl>
								</div>

								{jadwal.hasOwnProperty('tempat') && (
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
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={bank}
									onChange={handleChangeBank}
									sx={{ width: '100%' }}>
									<MenuItem value="mandiri">Mandiri</MenuItem>
									<MenuItem value="bca">BCA</MenuItem>
									<MenuItem value="bni">BNI</MenuItem>
								</Select>
							</FormControl>
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
