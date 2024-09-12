import React from 'react';

import { useAuthStore } from '../store/auth'; // Adjust the path as needed
import Page404 from '../pages/404';

export const withAuth = (WrappedComponent) => {
	const WithAuthComponent = (props) => {
		const { access_token } = useAuthStore();

		// useEffect(() => {
		// 	console.log(access_token);
		// 	if (!access_token) {
		// 		router.replace('/'); // Redirect to login page if not authenticated
		// 	}
		// }, [ access_token, router ]);

		// If the user is authenticated, render the wrapped component
		if (access_token) {
			return <WrappedComponent {...props} />;
		}

		// Otherwise, render nothing or a loading spinner
		return <Page404 />;
	};

	WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return WithAuthComponent;
};

export default withAuth;