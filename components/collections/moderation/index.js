import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import styles from './style.module.scss';
import { useCollection } from '../../../store/collection';
import { Loading } from '../../../components/loading';

const moderationKey = '5f4b8a183501d83810f55674b51c488f';

export const Moderation = ({ collectionKey, url, address }) => {
	const [ loading, setLoading ] = useState(false);
	const router = useRouter();

	const { deploy, place, prepareFolder, changeOwner, prepareImages, prepareMetadata } = useCollection();
	if (router.query.moderationKey !== moderationKey) {
		return;
	}

	const onDeployCollection = async () => {
		setLoading(true);
		try {
			await deploy(collectionKey);
			toast.success('collections.moderation.notification.deploy.success');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};
	const onPlace = async () => {
		setLoading(true);
		try {
			await place(collectionKey);
			toast.success('collections.moderation.notification.place.success');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const onPrepareFolder = async () => {
		setLoading(true);
		try {
			await prepareFolder(collectionKey);
			toast.success('collections.moderation.notification.place.success');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const onChangeOwner = async () => {
		setLoading(true);
		try {
			await changeOwner(collectionKey);
			toast.success('collections.moderation.notification.place.success');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const onPrepareImages = async () => {
		setLoading(true);
		try {
			await prepareImages(collectionKey);
			toast.success('collections.moderation.notification.place.success');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};
	
	const onPrepareMetadata = async () => {
		setLoading(true);
		try {
			await prepareMetadata(collectionKey);
			toast.success('collections.moderation.notification.place.success');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	
	return (
		<div className={styles.moderation}>
			<button
				disabled={loading}
				className={classNames('p-4 mt-3 text-center bg-violet-800 w-full rounded flex')}
				onClick={onPrepareFolder}
			>
				{loading && <Loading width={16} height={16} />} Prepare Folder
			</button>
			<button
				disabled={loading}
				className={classNames('p-4 mt-3 text-center bg-violet-800 w-full rounded flex')}
				onClick={onPrepareImages}
			>
				{loading && <Loading width={16} height={16} />} Prepare Images
			</button>
			<button
				className={classNames('p-4 mt-3 text-center bg-violet-800 w-full rounded flex')}
				onClick={onPrepareMetadata}
			>
				{loading && <Loading width={16} height={16} />} Prepare Metadata
			</button>
			<button
				disabled={loading || !url}
				className={classNames('p-4 mt-3 text-center bg-violet-800 w-full rounded flex', {
					disable: !url
				})}
				onClick={onDeployCollection}
			>
				{loading && <Loading width={16} height={16} />} Deploy Contract
			</button>
			<button
				disabled={loading || !address}
				className={classNames('p-4 mt-3 text-center bg-violet-800 w-full rounded flex', {
					disable: !address
				})}
				onClick={onChangeOwner}
			>
				{loading && <Loading width={16} height={16} />} Change owner
			</button>
			<button
				disabled={loading || !address}
				className={classNames('p-4 mt-3 text-center bg-violet-800 w-full rounded flex', {
					disable: !address
				})}
				onClick={onPlace}
			>
				{loading && <Loading width={16} height={16} />} Place
			</button>
		</div>
	);
};

Moderation.propTypes = {
	collectionKey: PropTypes.string,
	url: PropTypes.string,
	address: PropTypes.string
};