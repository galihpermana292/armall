import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

export const PrivateRoute = ({ children }) => {
	const { authToken } = useAuth();

	return authToken ? children : <Navigate to="/login" />;
};

export const RestrictedRoute = ({ children }) => {
	const { authToken } = useAuth();

	return authToken ? <Navigate to={-1} /> : children;
};
