import React, { useState } from 'react';
import { Container } from '@mui/material';
import testi from '../images/andik.png';

const Chat = () => {
	const [open, setOpen] = useState(false);
	const handleOpenChat = async () => {
		setOpen(!open);
	};
	return (
		<>
			<Container maxWidth="lg">
				<div className="min-h-[90vh] flex border-2 px-5 mt-10">
					<div
						className={`w-full md:max-w-[500px] ${
							open ? 'hidden' : 'block'
						} md:block`}>
						<div>
							<h1 className="font-semibold text-2xl mt-10 mb-5">Chat</h1>
						</div>

						<div>
							<input
								type="text"
								name="search"
								id="search"
								placeholder="Cari percakapan"
								className="h-16 max-w-search w-full border-2 px-5"
							/>
						</div>

						<div>
							<div
								className="p-3 border-2 rounded-md mt-5 hover:opacity-75 cursor-pointer"
								onClick={handleOpenChat}>
								<div className="flex space-x-5 w-full ">
									<div>
										<img src={testi} alt="testi" width="50px" />
									</div>
									<div className="w-full">
										<div className="flex items-center justify-between w-full">
											<h1 className="font-bold">Galih Permana</h1>
										</div>
										<p>Besok saya tunggu ya!</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						className={`md:border-l-2 w-full md:flex flex-col-reverse justify-start ${
							open ? 'flex' : 'hidden'
						}`}>
						<div className="flex items-center">
							<input
								type="text"
								name="search"
								id="search"
								placeholder="Kirim pesan..."
								className="h-16 w-full border-2 px-5 mt-5 mb-5"
							/>
							<button
								// onClick={handleClearSearch}
								className="bg-orange-primary text-white h-16 px-5 rounded-tr-lg rounded-br-lg uppercase">
								Kirim
							</button>
						</div>
						<div className="space-y-5">
							{[1, 2, 3, 4].map((map, idx) => (
								<div className="p-3 border-2 max-w-max rounded-md " key={idx}>
									<div className="flex space-x-5 w-full ">
										<div>
											<img src={testi} alt="testi" width="50px" />
										</div>
										<div className="w-full">
											<div className="flex items-center justify-between w-full">
												<h1 className="font-bold">Galih Permana</h1>
											</div>
											<p>Besok saya tunggu ya!</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Chat;
