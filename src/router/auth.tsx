import { Navigate } from 'react-router-dom';

interface PrivateRouteProps<T extends React.FC<{}>> {
	component: T;
}

export const PrivateRoute = <T extends React.FC<{}>>({
	component
}: PrivateRouteProps<T>) => {
	const isLogined = localStorage.getItem('token');
	if (!isLogined) {
		return <Navigate to="/auth" />;
	}
	return <>{component}</>;
};
