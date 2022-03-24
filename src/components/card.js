import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import quote from '../images/quote.png';
const Cards = ({
	image = '',
	title = '',
	desc = '',
	type = 'normal',
	data,
}) => {
	return (
		<Card
			sx={{
				width: '100%',
				minWidth: type === 'normal' ? 200 : '300px',
				maxWidth: type === 'normal' ? 350 : 'inherit',
				height: 230,
			}}>
			<CardContent>
				{type === 'normal' ? (
					<>
						<div className="">
							<img src={image} alt={image} width={30} />
						</div>
						<h1 className="text-tosca-primary font-semibold text-xl md:text-2xl my-5">
							{title}
						</h1>
						<h1 className="text-md">{desc}</h1>
					</>
				) : (
					<>
						<div className="flex space-x-5 items-center justify-between my-5 w-full">
							<div>
								<img src={data.image} alt={data.image} />
							</div>
							<div>
								<h1 className="text-tosca-primary font-semibold text-md md:text-2xl">
									{data.name}
								</h1>
								<p>{data.univ}</p>
							</div>
							<div>
								<img src={quote} alt="quote" />
							</div>
						</div>
						<p className="max-w-md text-lg">{data.text}</p>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default Cards;
