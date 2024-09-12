import { useState } from 'react';
import React, { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { CollectionForm } from '../../components/add-collection/Form';
import { PageHead } from '../../components/PageHead';
import { withAuth } from '../../components/withAuth';
import styles from './style.module.scss';
import { addCollection } from '../../api/collections';

function AddCollection () {
	const [ loading, setLoading ] = useState(false);
	const { t } = useTranslation();
	const router = useRouter();

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			await addCollection(data);
			router.push('/');
			toast.success(t('notification.collections.success.created'));
		} catch (err) {
			setLoading(false);
			toast.error(err.message);
		}
	};

	return (
		<main>
			<Head>
				<title>QR Mint - {t('collections.add.title')}</title>
			</Head>
			<PageHead
				title={t('collections.add.title')}
				description={t('collections.add.subtitle')}
			/>
			<section className={styles['bg-color']} style={{ overflow: 'scroll' }}>
				<div className="container">
					<CollectionForm isLoading={loading} t={t} onSubmit={onSubmit} />
				</div>
			</section>
		</main>
	);
}

export default withAuth(AddCollection);

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});