import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import { qrcode } from '../../api/collections';
import styles from './qrcode.module.scss';

export const QRCode = ({ collectionKey, t }) => {
	const [ qrCode, setQrCode ] = useState();
	const onGenerateQrArt = async () => {
		try {
			const blob = await qrcode(collectionKey, true);
			setQrCode(URL.createObjectURL(blob));
		} catch (err) {
			toast.error(err.message);
		}	
	};
	const onDefaultQrArt = async () => {
		try {
			const blob = await qrcode(collectionKey, false);
			setQrCode(URL.createObjectURL(blob));
		} catch (err) {
			toast.error(err.message);
		}
	};
	useEffect(() => {
		if (collectionKey) {
			onGenerateQrArt();
		}
	}, [collectionKey]);
	const handleImage = () => {
		const link = document.createElement('a');
		link.href = qrCode;
		link.download = 'qr-art.jpg';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return (
		<div>
			<div className="flex border-t border-l border-r border-indigo-500">
				<button className={classNames(styles.qr_select, styles.left_qr_select)} onClick={onGenerateQrArt}>
					{t('collections.qrcode.art')}
				</button>
				<button className={classNames(styles.qr_select, styles.right_qr_select)} onClick={onDefaultQrArt}>
					{t('collections.qrcode.default')}
				</button>
			</div>
			<Image src={qrCode} width={500} height={500} />
			<button onClick={handleImage} className="p-4 mt-3 text-center bg-blue-500 w-full rounded">{t('collections.download')}</button>
		</div>
	);
};

QRCode.propTypes = {
	collectionKey: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired
};