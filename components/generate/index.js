import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { toast } from 'react-toastify';

import styles from './style.module.scss';
import { useAuthStore } from '../../store/auth';
import { generate } from '../../api/generate';
import { FormGenerate } from './form-generate';
//import { MintState } from './mint-state';
import { Error } from './error';
import { QRArtView } from './qr-art';
import { mint, getCollection } from '../../api/nft';
import { getAttributes } from '../../api/nft';

export const Generate = ({ onAuth, t }) => {
	const [ error, setError ] = useState();
	const [connector] = useTonConnectUI();
	const [ values, setValues ] = useState();
	const [ qrImage, setQrImage ] = useState();
	const { user } = useAuthStore();
	const [ loading, setLoading ] = useState(false);
	const [ attributes, setAttributes ] = useState([]);

	const handleSubmit = (data) => {
		if (user) {
			setValues(data);
		} else {
			onAuth();
		}
	};

	const handleMint = async () => {
		setLoading(true);
		try {
			const collection = await getCollection();
			const myTransaction = {
				validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
				messages: [
					{
						address: collection.address,
						amount: collection.mint_price,
					},
				],
			};
			await connector.sendTransaction(myTransaction);
		} catch (err) {
			toast.error(err.message);
			setLoading(false);
			return;
		}

		try {
			await mint({ attributes, image: qrImage, info: values.text });
		} catch (err) {
			setError(err?.response?.message || err?.message);
			setLoading(false);
			setValues(null);
			toast.success(t('Sent to mint was successfully'));
		}
		setLoading(false);
	};

	useEffect(() => {
		if (!values) return;
		const fetchQRCode = async (values) => {
			try {
				const data = await generate(values);
				setQrImage(data);
			} catch (err) {
				toast.error(err.message);
			}
		};

		if (!qrImage) {
			fetchQRCode(values);
		}

		if (values.text) {
			getAttributes(values.text)
				.then((attr) => {
					setAttributes(attr);
				})
				.catch(err => {
					toast.error(err.message);
				});
		}
	}, [values]);

	const renderBgOverlay = () => {
		return (
			<div className={styles['bg-overlow']}>
				<svg className="animate-spin -ml-1 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			</div>
		);
	};
	
	const handleClear = () => {
		setValues(null);
		setQrImage(null);
	};

	const renderWizard = (values, error) => {
		if (error) {
			return <Error error={error} />; 
		} else if (values) {
			return <QRArtView
				onMint={handleMint}
				t={t}
				qrImage={qrImage}
				onClear={handleClear}
				attributes={attributes}
			/>;
		}
		return <FormGenerate
			t={t}
			onSubmit={handleSubmit}
			user={user}
		/>;
	};

	return (
		<section
			className={classNames('container mb-5', styles['generate-qr-art'])}
		>
			<h2 className={classNames(styles.title)}>{t('home.mint.title')}</h2>
			<p className={classNames(styles.subtitle)}>{t('home.mint.subtitle')}</p>
			{renderWizard(values, error)}
			{loading && renderBgOverlay()}
		</section>
	);
};

Generate.propTypes = {
	t: PropTypes.func.isRequired,
	onAuth: PropTypes.func.isRequired,
};
