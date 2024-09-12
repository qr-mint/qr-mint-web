import React, { TonConnectUIProvider } from '@tonconnect/ui-react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';

import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Inner } from '../components/Inner';


function App ({ Component, pageProps }) {
	return (
		<main className="bg-1">
			<TonConnectUIProvider
				manifestUrl={`${process.env.NEXT_PUBLIC_CONNECT_URL}/tonconnect-manifest.json`}
			>
				<Header />
				<Inner>
					<Component {...pageProps} />
				</Inner>
				<Footer />
				<ToastContainer theme="dark" autoClose={3000} position="top-right" />
			</TonConnectUIProvider>
		</main>
	);
}

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(App);
