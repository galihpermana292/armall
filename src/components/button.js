import React from 'react';
const Buttons = ({ content = 'Masuk', type = 'primary' }) => {
	return (
		<>
			<button
				className={`max-w-max rounded-md px-5 py-3 uppercase ${
					type === 'primary'
						? 'bg-orange-primary text-white'
						: 'bg-white text-orange-primary border-2 border-orange-primary'
				}`}>
				{content}
			</button>
		</>
	);
};

export default Buttons;
