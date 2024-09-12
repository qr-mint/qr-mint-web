import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import Link from 'next/link';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSearchParams } from 'next/navigation';

import { Card } from '../../components/collections/Card';
import { PageHead } from '../../components/PageHead';
import { Loading } from '../../components/loading';
import styles from './style.module.scss';
import { get } from '../../api/collections';
import { toast } from 'react-toastify';

function Collections () {
	const searchParams = useSearchParams();
	const [ list, setList ] = useState();
	const [ counts, setCounts ] = useState({});
	const [ isLoading, setLoading ] = useState(true);
	const { t } = useTranslation();

	useEffect(() => {
		const fetchCollection = async (key) => {
			try {
				const collection = await get(key);
				setList(collection.list);
				setCounts({ open: collection.openCount, closed: collection.closedCount, total: collection.totalCollections });
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading(false);
			}
		};
		if (isLoading) {
			fetchCollection();
		}
	}, [isLoading]);

	useEffect(() => {
		if (searchParams.get('tag')) {
			setLoading(true);
		}
	}, [searchParams]);

	const renderImages = (items) => {
		if (isLoading) {
			return <Loading width={36} height={36} />;
		} else if (!items) {
			return <></>;
		}
		return items.map((item) => {
			return <Card key={item.id} data={item} t={t} />;
		});
	};

	return (
		<main>
			<Head>
				<title>QR Mint - Collections</title>
				<meta name="title" content={t('collections.title')} />
				<meta name="description" content={t('collections.subtitle')} />
				<meta name="robots" content="index, follow" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content="Russian" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={t('collections.title')} />
				<meta property="og:description" content={t('collections.subtitle')} />
				<meta property="og:url" content="https://qr-mint.net" />
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_CONNECT_URL}/images/lopo.png`}
				/>
			</Head>
			<PageHead
				title={t('collections.title')}
				description={t('collections.subtitle')}
			/>
			<section className={classNames(styles.section)}>
				<div className={classNames('container')}>
					<div className={classNames(styles.tabs, 'mb-3')}>
						<Link className={styles.tab} href="/collections">
							{t('collections.tag.all')} <span>{counts.total}</span>
						</Link>
						<Link className={styles.tab} href="/collections?tag=open">
							{t('collections.tag.open')} <span>{counts.open}</span>
						</Link>
						<Link className={styles.tab} href="/collections?tag=closed">
							{t('collections.tag.closed')} <span>{counts.closed}</span>
						</Link>
					</div>
					<div className={classNames('flex flex-wrap items-center', styles['cards'])}>
						{renderImages(list)}
					</div>
				</div>
			</section>
		</main>
	);
}

export default Collections;

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
