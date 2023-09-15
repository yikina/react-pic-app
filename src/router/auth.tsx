import { useUserInfo } from '&/hooks';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component }: any) => {
	const { deleteuser, user } = useUserInfo();

	if (!user) {
		return <Navigate to="/auth" />;
	}
	// 解码token，提取过期时间（exp）
	const tokenParts = user.accessToken.split('.');
	const encodedPayload = tokenParts[1];
	const decodedPayload = atob(encodedPayload);
	const { exp } = JSON.parse(decodedPayload);

	const currentTime = Math.floor(Date.now() / 1000);

	if (currentTime >= exp) {
		console.log('Token已过期');
		deleteuser();
	}
	const Component = component;
	return <Component />;
};
