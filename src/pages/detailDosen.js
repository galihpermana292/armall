import React from 'react';
import { useParams } from 'react-router-dom';

const DetailDosen = () => {
	const { id } = useParams();

	return <div>{id}</div>;
};

export default DetailDosen;
