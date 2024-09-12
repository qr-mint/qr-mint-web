import React from 'react';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';

import { useMint, steps } from './provider/mint';
import styles from './style.module.scss';

export const MintState = ({ t }) => {
	const { error, step, address } = useMint();

	return (
		<div>
			<div className={classNames('mx-5', styles.timeline)}> 
				<div className={[ steps.deploy, steps.transfer ].includes(step)
					? classNames(styles.timeline_done, styles.timeline_item)
					: classNames(styles.timeline_in_proccess, styles.timeline_item)}>
					<div className={styles.timestamp}>{t('home.mint.step1.title')}</div>
					<div className={styles['timeline-text']}>{t('home.mint.step1.subtitle')}</div>
				</div>
				<div className={step === steps.deploy
					? classNames(styles.timeline_in_proccess, styles.timeline_item)
					: step === steps.transfer ? classNames(styles.timeline_done, styles.timeline_item) : classNames(styles.timeline_item)}>
					<div className={styles.timestamp}>{t('home.mint.step2.title')}</div>
					<div className={styles['timeline-text']}>{t('home.mint.step2.subtitle')}</div>
				</div>
				<div className={step === steps.transfer
					? classNames(styles.timeline_in_proccess, styles.timeline_item)
					: step === steps.success ? classNames(styles.timeline_done, styles.timeline) : classNames(styles.timeline)}>
					<div className={styles['timestamp']}>{t('home.mint.step3.title')}</div>
					<div className={styles['timeline-text']}>{t('home.mint.step3.subtitle')}</div>
				</div>
			</div>
		</div>
	);
};

MintState.propTypes = {
	t: PropTypes.func.isRequired
};
