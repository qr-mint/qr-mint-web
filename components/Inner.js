import { useBackendAuth } from '../hooks/useAuth';

export const Inner = ({ children }) => {
	useBackendAuth();

	return children;
};