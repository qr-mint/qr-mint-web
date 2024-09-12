import React from 'react';
import Link from 'next/link';
import { ReactComponent as TgLogo } from '../../public/images/footer/telegram.svg';
import styles from './styles.module.scss';

const socialsData = [
	{
		url: '/',
		component: <TgLogo className={styles['footer__social-icon']} />,
	},
];

const SocialItem = () => {
	return (
		<>
			{socialsData.map((e, index) => (
				<Link
					href={e.url}
					className={styles['footer__social-item']}
					key={index}
				>
					{e.component}
				</Link>
			))}
		</>
	);
};

export default SocialItem;
