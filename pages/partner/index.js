import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { FaRegClone } from 'react-icons/fa';

import { PageHead } from '../../components/PageHead';
import { usePartnerStore } from '../../store/partner/settings';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getReferrals } from '../../api/partner';
import { Loading } from '../../components/loading';
import styles from './page.module.scss';
import withAuth from '../../components/withAuth';
import { useAuthStore } from '../../store/auth';

function Partner () {
	const { user } = useAuthStore();
	const { t } = useTranslation();
	const { partnerLink, loadLink, code } = usePartnerStore();
	const [ partners, setPartners ] = useState();
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		const fetchReferrals = async () => {
			if (!partnerLink && !code) {
				try {
					await loadLink();
				} catch {}
			}
			try {
				const referrals = await getReferrals();
				setPartners(referrals);
				setLoading(false);
			} catch (err) {
				toast.error(err.message);
			}
			setLoading(false);
		};
		if (!loading) {
			fetchReferrals();
		}
	},[]);
	

	const handleCopy = (text) => {
		copyToClipboard(text)
			.then(() => {
				toast.success('Copied was successfull');
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const renderPartner = (loading, partners) => {
		if (loading) {
			return <Loading width={36} height={36} />; 
		} else if (!partners) {
			return (
				<div>
					{t('partner.empty')}
				</div>
			);
		}
		return (
			<div>
				<ul>
					{partners.map((partner, index) =>
						<li key={index}>{index + 1}. {partner.address}</li>
					)}
				</ul>
			</div>
		);
	};

	const renderPartnerLink = (code) => {
		if (code) {
			const partnerLink = code ? `${window.location.origin}?code=${code}` : '';
			return (
				<div className={classNames('block mb-5 p-2 border border-gray-200 rounded-lg dark:bg-black dark:border-black flex justify-center items-center')}>
					<a href={partnerLink}>{partnerLink}</a>
					<button className={styles.btn_copy} onClick={() => handleCopy(partnerLink)}>
						<FaRegClone size={24} />
					</button>
				</div>
			);
		}
		return (
			<div
				style={{ width: 520 }}
				className={classNames('block text-center mb-5 p-2 border border-gray-200 rounded-lg dark:bg-blue-900 dark:border-blue-900 flex justify-center')}>
				{t('partner.partner.warning')}
			</div>
		);
	};

	return (
		<main>
			<PageHead
				title={t('partner.title')}
				description={t('partner.description')}
			/>
			<section className="container">
				<div className={classNames(styles.container, 'flex', 'justify-center', 'flex-col', 'items-center', 'mb-5')}>
					<p className="font-bold text-2xl mb-2">{user?.coins || 0} Q-COIN</p>
					{renderPartnerLink(code)}
					{renderPartner(loading, partners)}
				</div>
			</section>
		</main>
	);
}


export default withAuth(Partner);

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
