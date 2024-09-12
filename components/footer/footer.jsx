import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { useLanguage } from '../../hooks/useLanguage';

export default function Footer () {
	const { language } = useLanguage();
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.footer__inner}>
					<div
						className={classNames(styles.footer__top, 'flex justify-between')}
					>
						<Link href="/" className={styles.footer__logo}>
							<Image src="/images/logo.png" alt="" width={50} height={50} />
							<span className={styles['footer__logo-name']}>QR Mint</span>
						</Link>

						<div className={styles.footer__item}>
							<p className={styles['footer__item-title']}>Community</p>
							<div className={styles.footer__list}>
								<Link
									target="_blank"
									className={styles['footer__list-item']}
									href={
										language === 'ru'
											? 'https://t.me/qr_mint'
											: 'https://t.me/QRMint'
									}
								>
									Telegram Channel
								</Link>
								<Link
									target="_blank"
									className={styles['footer__list-item']}
									href="https://t.me/qrmint_group"
								>
									Telegram Group
								</Link>
								<Link
									target="_blank"
									className={styles['footer__list-item']}
									href="https://x.com/qr_arts"
								>
									Twitter
								</Link>
								<Link
									target="_blank"
									className={styles['footer__list-item']}
									href="https://getgems.io/q-arts"
								>
									Collection
								</Link>
								<Link
									target="_blank"
									className={styles['footer__list-item']}
									href="https://github.com/qr-mint"
								>
									Github
								</Link>
							</div>
						</div>
					</div>
					<div className={styles.footer__bottom}>
						<p className={styles.footer__privacy}>
							Copyright 2024 ©. All rights reserved
						</p>
						<div className={styles.footer__socials}></div>
					</div>
				</div>
			</div>
		</footer>
	);
}
