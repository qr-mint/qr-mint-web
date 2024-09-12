import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs';

import { PageHead } from '../../../components/PageHead';
import styles from './style.module.scss';
import { getQrNfts } from '../../../api/nft';
import { Card } from '../../../components/qr-arts/Card';
import { Loading } from '../../../components/loading';

const tagsList = [
	{ name: 'Text', value: 'text' },
	{ name: 'Number', value: 'number' },
	{ name: 'Link', value: 'link' },
	{ name: 'Username', value: 'username' },
	{ name: 'TON Address', value: 'TON address' },
	{ name: 'Youtube', value: 'Youtube' },
	{ name: 'Video', value: 'Video' },
	{ name: 'X', value: 'X' },
	{ name: 'Telegram', value: 'telegram' },
	{ name: 'Instagram', value: 'Instagram' },
];

const networList = [
	{ name: 'TON', value: 'ton' },
	{ name: 'BTC', value: 'btc' },
	{ name: 'BSC', value: 'bsc' },
	{ name: 'ETH', value: 'eth' },
	{ name: 'SOLANA', value: 'SOLANA' },
];

const QRArts = () => {
	const [ tags, setTags ] = useQueryState('tags', parseAsArrayOf(parseAsString));
	const router = useRouter();
	const [ uniqueAttributeCounts, setUniqueAttributeCounts ] = useState(0);
	const [ list, setList ] = useState();
	const [ isLoading, setLoading ] = useState(true);
	const { t } = useTranslation();
	const chain = router.query.chain;
	const fetchCollection = async () => {
		try {
			const nfts = await getQrNfts(1000, 10, chain, tags);
			setList(nfts.list);
			setUniqueAttributeCounts(nfts.uniqueAttributeCounts);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isLoading) {
			fetchCollection();
		}
	}, [isLoading]);

	useEffect(() => {
		if (!isLoading && tags) {
			fetchCollection();
		}
	}, [tags]);

	const handleSelectTag = (value) => {
		if (tags?.includes(value)) {
			setTags(tags.filter(tag => tag !== value));
		} else {
			if (tags) {
				setTags(tags.concat(value));
			} else {
				setTags([value]);
			}
		}
	};

	const renderList = (list) => {
		if (isLoading) {
			return <Loading width={36} height={36} />;
		} else if (!list) {
			return <></>;
		}
		return list.map((item, index) => <Card key={index} data={item} />);
	};

	const renderNetwork = () => {
		return networList.map((tag) => {
			return (
				<a
					key={tag.value}
					className={classNames(styles.tab, { [styles.active]: chain === tag.value })}
					onClick={() => setTags(tags.concat(tag.value))}
				>
					{tag.name} <span>{chain === tag.value ? list?.length : 0}</span>
				</a>
			);
		});
	};

	const renderTag = () => {
		return tagsList.map((tag) => {

			return (
				<a
					key={tag.value}
					className={classNames(styles.tab, { [styles.active]: tags?.includes(tag.value) })}
					onClick={() => handleSelectTag(tag.value)}
				>
					{tag.name} <span>{uniqueAttributeCounts[tag.value.toLowerCase()] || 0}</span>
				</a>
			); 
		});
	};
	return (
		<main>
			<Head>
				<title>QR Arts</title>
				<meta name="title" content={t('qrarts.title')} />
				<meta name="description" content={t('qrarts.subtitle')} />
				<meta name="robots" content="index, follow" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content="Russian" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={t('qrarts.title')} />
				<meta property="og:description" content={t('qrarts.subtitle')} />
				<meta property="og:url" content="https://qr-mint.net" />
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_CONNECT_URL}/images/lopo.png`}
				/>
			</Head>
			<PageHead
				title={t('qrarts.title')}
				description={t('qrarts.description')}
			/>
			<section className={classNames(styles.section)}>
				<div className={classNames('container')}>
					<div className={classNames(styles.tabs, 'mb-3')}>
						{renderNetwork(list)}
					</div>
					<div>
					</div>
					<div className={classNames(styles.tabs, 'mb-3')}>
						{renderTag(list)}
					</div>
					<div className={classNames('flex flex-wrap items-center', styles['cards'])}>
						{renderList(list)}
					</div>
				</div>
			</section>
		</main>
	);
};

export default QRArts;

export const getServerSideProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
});
