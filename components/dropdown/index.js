import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import styles from './style.module.scss';
import { formatAddress } from '../../helpers/addressFormatter';

const LogoutIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3.0203 4.02005C3.5454 3.49495 4.25759 3.19995 5.0002 3.19995H12.0002C12.7428 3.19995 13.455 3.49495 13.9801 4.02005C14.5052 4.54515 14.8002 5.25734 14.8002 5.99995V7.99995C14.8002 8.44178 14.442 8.79995 14.0002 8.79995C13.5584 8.79995 13.2002 8.44178 13.2002 7.99995V5.99995C13.2002 5.68169 13.0738 5.37647 12.8487 5.15142C12.6237 4.92638 12.3185 4.79995 12.0002 4.79995H5.0002C4.68194 4.79995 4.37671 4.92638 4.15167 5.15142C3.92662 5.37647 3.8002 5.68169 3.8002 5.99995V18C3.8002 18.3182 3.92662 18.6234 4.15167 18.8485C4.37671 19.0735 4.68194 19.2 5.0002 19.2H12.0002C12.3185 19.2 12.6237 19.0735 12.8487 18.8485C13.0738 18.6234 13.2002 18.3182 13.2002 18V16C13.2002 15.5581 13.5584 15.2 14.0002 15.2C14.442 15.2 14.8002 15.5581 14.8002 16V18C14.8002 18.7426 14.5052 19.4547 13.9801 19.9798C13.455 20.5049 12.7428 20.7999 12.0002 20.7999H5.0002C4.25759 20.7999 3.5454 20.505 3.0203 19.9798C2.49519 19.4547 2.2002 18.7426 2.2002 18V5.99995C2.2002 5.25735 2.49519 4.54515 3.0203 4.02005ZM17.4345 8.43427C17.7469 8.12185 18.2535 8.12185 18.5659 8.43427L21.5659 11.4343C21.8783 11.7467 21.8783 12.2532 21.5659 12.5656L18.5659 15.5656C18.2535 15.8781 17.7469 15.8781 17.4345 15.5656C17.1221 15.2532 17.1221 14.7467 17.4345 14.4343L19.0688 12.8H7.0002C6.55837 12.8 6.2002 12.4418 6.2002 12C6.2002 11.5581 6.55837 11.2 7.0002 11.2H19.0688L17.4345 9.56564C17.1221 9.25322 17.1221 8.74669 17.4345 8.43427Z"
		></path>
	</svg>
);

const UserIcon = () => (
	<svg
		width="28"
		height="28"
		viewBox="0 0 28 28"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="14"
			cy="14"
			r="11"
			stroke="currentColor"
			strokeWidth="1.6"
		></circle>
		<ellipse cx="14" cy="11.5" rx="4" ry="4.5" fill="currentColor"></ellipse>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M5.875 21.416C7.323 19.396 10.417 18 14 18c3.582 0 6.676 1.395 8.124 3.416A10.971 10.971 0 0 1 14 25a10.971 10.971 0 0 1-8.125-3.584Z"
			fill="currentColor"
		></path>
	</svg>
);

export const Dropdown = ({ user, onLogOut, t }) => {
	const [ show, setShow ] = useState(false);
	return (
		<div>
			<a onClick={() => setShow(!show)} className={styles.dropdown__button}>
				<div className={styles['profile-icon']}>
					<UserIcon />
				</div>
				<span>{formatAddress(user.address)}</span>
			</a>
			{show && (
				<div className={styles.dropdown__menu}>
					<div onClick={onLogOut} className={styles.dropdown__menu__item}>
						{t('header.dropdown.logout')}{' '}
						<div className={styles.dropdown__menu__item__icon}>
							<LogoutIcon />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

Dropdown.propTypes = {
	onLogOut: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired
};
