import React, { useState } from 'react';
import { Container } from '@mui/material';
import hero from '../images/bantuan.png';
import { FAQ } from '../utils/constant';

const Bantuan = () => {
	const [idFaq, setId] = useState(null);
	const [open, setOpen] = useState(false);
	const handlefaq = (id) => {
		if (open && idFaq !== id) {
			return;
		}

		if (open && idFaq === id) {
			setOpen(false);
			setId(null);
			return;
		}
		setId(id);
		setOpen(true);
	};
	return (
		<>
			<Container maxWidth="xl">
				{/* Section 1 */}
				<div className="min-h-screen flex flex-col-reverse justify-center md:flex-row md:justify-between md:items-center overflow-hidden">
					<div className="md:max-w-3xl space-y-10 mt-10">
						<h1 className=" font-bold text-4xl md:text-7xl">
							Halo, ada yang bisa kami
							<span className="text-tosca-primary"> bantu</span>?
						</h1>
						<p className="md:text-xl">
							Punya pertanyaan? kami hadir untuk membantu Anda. Di sini Anda
							dapat menemukan pertanyaan yang sering ditanyakan.
						</p>
					</div>
					<div className="max-w-4xl -mr-20">
						<img src={hero} alt="hero" />
					</div>
				</div>
			</Container>
			<Container maxWidth="xl">
				{/* Section 1 */}
				<div className="min-h-screen my-20">
					<div>
						<h1 className="text-center font-semibold text-4xl md:text-5xl">
							Frequently Asked Questions (FAQ)
						</h1>
					</div>
					<div className="mt-10 flex flex-col justify-center items-center space-y-5">
						{FAQ.map((faq, idx) => (
							<div
								className="w-full max-w-[700px] cursor-pointer"
								onClick={() => handlefaq(faq.id)} key={faq.id}>
								<div className="shadow-lg p-5 rounded-md text-xl  font-semibold mb-3">
									{faq.q}
								</div>
								<div
									className={`shadow-lg p-5 rounded-md text-xl font-semibold border-2 border-tosca-primary  ${
										idFaq === faq.id && open ? 'block mb-10' : 'hidden'
									}`}>
									- {faq.a}
								</div>
							</div>
						))}
					</div>
				</div>
			</Container>
		</>
	);
};

export default Bantuan;
