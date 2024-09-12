import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';

const TIMES = 1000 * 3600 * 24;

export const Timer = ({ date, label, updateRequest }) => {
	const { t } = useTranslation();
	const [ _, setRerender ] = useState(0); // Dummy state to force re-renders
	const timeRef = useRef(new Date(date).getTime() - Date.now());
	const intervalRef = useRef();

	useEffect(() => {
		const updateTimer = () => {
			timeRef.current -= 1000;

			if (timeRef.current <= 0) {
				clearInterval(intervalRef.current);
				if (updateRequest) {
					updateRequest();
				}
			} else {
				setRerender(prev => prev + 1); // Force re-render
			}
		};

		intervalRef.current = setInterval(updateTimer, 1000);

		return () => clearInterval(intervalRef.current);
	}, [updateRequest]);

	const day = Math.floor(timeRef.current / TIMES);
	const hours = Math.floor((timeRef.current % TIMES) / 3600000);
	const minutes = Math.floor(((timeRef.current % TIMES) % 3600000) / 60000);
	const seconds = Math.floor(((timeRef.current % TIMES) % 60000) / 1000);

	return (
		<div className={styles['timer-container']}>
			<p className={styles['timer-label']}>{label}</p>
			<div className={styles.timer}>
				<div className={styles['timer-block']}>
					<span>{day}</span>
					<span>{t('collections.timer.days')}</span>
				</div>
				<div className={styles['timer-block']}>
					<span>{hours}</span>
					<span>{t('collections.timer.hours')}</span>
				</div>
				<div className={styles['timer-block']}>
					<span>{minutes}</span>
					<span>{t('collections.timer.min')}</span>
				</div>
				<div className={styles['timer-block']}>
					<span>{seconds}</span>
					<span>{t('collections.timer.sec')}</span>
				</div>
			</div>
		</div>
	);
};

Timer.propTypes = {
	date: PropTypes.string.isRequired,
	updateRequest: PropTypes.func,
	label: PropTypes.string.isRequired
};

