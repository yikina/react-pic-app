import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component }: any) => {
	const isLogined = localStorage.getItem('token');
	if (!isLogined) {
		return <Navigate to="/auth" />;
	}
	const Component = component;
	return <Component />;
};
