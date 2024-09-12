import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.module.scss';
import buttonStyles from '../button/style.module.scss';
import Image from 'next/image';

export const Intro = ({ t }) => {
	return (
		<section className={styles.intro}>
			<div className={classNames('container', styles['container-flex'])}>
				<div className={styles.intro__inner}>
					<h1 className={styles.intro__title}>{t('home.intro.title')}</h1>
					<p className={styles.intro__subtitle}>{t('home.intro.subtitle')}</p>
					<div className={styles.intro__btn}>
						<a
							target="_blank"
							className={classNames(buttonStyles.button, 'mr-5')}
							href="https://t.me/QrMint_Bot"
							rel="noreferrer"
						>
							{t('home.intro.application')}
						</a>
						<a
							target="_blank"
							className={buttonStyles.button}
							href="https://getgems.io/q-arts"
							rel="noreferrer"
						>
							{t('home.intro.our_collection')}
						</a>
					</div>
				</div>
				<div style={{ width: 350, height: 350 }}>
					<Image src="/images/intro.webp" width={350} height={350} alt="" />
				</div>
			</div>
		</section>
	);
};

Intro.propTypes = {
	t: PropTypes.func.isRequired,
};
