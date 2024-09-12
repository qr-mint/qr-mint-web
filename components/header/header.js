import React, { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTonConnectModal } from '@tonconnect/ui-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FaRocket, FaQrcode, FaPlus, FaUsers, FaWallet, FaSketch } from 'react-icons/fa6';

import { useLanguage } from '../../hooks/useLanguage';
import styles from './style.module.scss';
import { Dropdown } from '../dropdown';
import { useAuthStore } from '../../store/auth';

const LangIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
		className="w-6 h-6"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
		/>
	</svg>
);

export default function Header () {
	const { t } = useTranslation();
	const router = useRouter();
	const { language } = useLanguage();
	const { user, disconnect } = useAuthStore();
	const { open } = useTonConnectModal();
	const currentPath = usePathname();

	const [ menuOpen, setMenuOpen ] = useState(false);
	const [ langmenuOpen, setLangMenuOpen ] = useState(false);

	const handleMenuToggle = () => {
		setMenuOpen((prevState) => !prevState);
	};

	const handleLangMenuToggle = () => {
		setLangMenuOpen((prevState) => !prevState);
	};

	const handleOpenLogin = () => {
		open();
	};

	const handleLogout = async () => {
		await disconnect();
	};

	useEffect(() => {
		if (menuOpen) {
			window.document.body.classList.add(styles['no-scroll']);
		} else {
			window.document.body.classList.remove(styles['no-scroll']);
		}
	}, [menuOpen]);

	const _renderPublicGame = () => {
		if (user) {
			return (
				<>
					<li className={styles.nav__item}>
						<Link href="/add-collection" className={styles.nav__link}>
							<FaPlus size={18} className="mr-2" /> {t('header.add-project')}
						</Link>
					</li>
					<li
						className={classNames(styles.nav__item, {
							[`${styles.nav} ${styles['nav__item-active']}`]:
							currentPath === '/add-game',
						})}
					> 
						<Link href="/partner" className={styles.nav__link}>
							<FaUsers size={18} className="mr-2" /> {t('header.partner')}
						</Link>
					</li>
				</>
			);
		}
	};

	const _renderUser = () => {
		if (user) {
			return <Dropdown
				t={t}
				onLogOut={handleLogout}
				user={user}
			/>;
		}
		return (
			<li className={styles.nav__item}>
				<button onClick={handleOpenLogin} className={styles.nav__link}>
					<FaWallet size={18} className="mr-2" /> {t('header.connect')}
				</button>
			</li>
		);
	};

	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.header__inner}>
					<Link href="/" className={styles.header__logo}>
						<Image src="/images/logo.png" alt="" width={50} height={50} />
						<span>QR Mint</span>
					</Link>
					<nav
						className={classNames(styles.nav, {
							[styles['nav--active']]: menuOpen,
						})}
					>
						<ul className={styles.nav__list}>
							<li className={styles.nav__item}>
								<Link href="/qr-arts/ton" className={styles.nav__link}>
									<FaQrcode size={18} className="mr-2" /> {t('header.qr-arts')}
								</Link>
							</li>
							{/* <li className={styles.nav__item}>
								<Link href="/qr-arts/ton" className={styles.nav__link}>
									<FaSketch size={18} className="mr-2" /> {t('header.logo')}
								</Link>
							</li> */}
							<li className={styles.nav__item}>
								<Link href="/collections" className={styles.nav__link}>
									<FaRocket size={18} className="mr-2" /> {t('header.collections')}
								</Link>
							</li>
							{_renderPublicGame()}
							{_renderUser()}
						</ul>
					</nav>
					<div className={styles.header__lang}>
						<div
							className={styles['header__lang-selected']}
							onClick={handleLangMenuToggle}
						>
							<span>
								<LangIcon />
							</span>
							<p>{language}</p>
						</div>
						<div
							className={classNames(styles['header__lang-items'], {
								[styles['header__lang-items-active']]: langmenuOpen,
							})}
						>
							<Link
								className={styles['header__lang-item']}
								href={router.asPath}
								locale="en"
								hrefLang="en"
							>
								English
							</Link>
							<Link
								className={styles['header__lang-item']}
								href={router.asPath}
								locale="ru"
								hrefLang="ru"
							>
								Русский
							</Link>
						</div>
					</div>
					<div
						className={classNames(styles.hamburger, {
							[styles['hamburger--active']]: menuOpen,
						})}
						onClick={handleMenuToggle}
					>
						<span></span>
					</div>
				</div>
			</div>
		</header>
	);
}
