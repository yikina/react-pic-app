import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component }: any) => {
	const isLogined = localStorage.getItem('token');

	if (!isLogined) {
		return <Navigate to="/auth" />;
	}
	// 解码token，提取过期时间（exp）
	const tokenParts = isLogined.split('.');
	const encodedPayload = tokenParts[1];
	const decodedPayload = atob(encodedPayload);
	const { exp } = JSON.parse(decodedPayload);

	const currentTime = Math.floor(Date.now() / 1000);

	if (currentTime >= exp) {
		console.log('Token已过期');
		localStorage.removeItem('token');
	}
	const Component = component;
	return <Component />;
};
