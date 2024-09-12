import React from 'react';

import styles from './style.module.scss';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';

export const Opportunities = ({ t }) => {
	return (
		<section className={classNames(styles.section, 'container')}>
			<h2 className={classNames(styles.title, 'mb-5')}>
				{t('home.opportunities.title')}
			</h2>
			<div id="opportunuties" className="grid grid-cols-2 gap-4">
				<div className={styles.block}>
					<h3 className="font-semibold text-xl pb-2">
						{t('home.opportunities.block_1.title')}
					</h3>
					<div>
						{t('home.opportunities.block_1.description')}
					</div>
				</div>
				<div className={styles.block}>
					<h3 className="font-semibold text-xl pb-2">
						{t('home.opportunities.block_2.title')}
					</h3>
					<div>
						{t('home.opportunities.block_2.description')}
					</div>
				</div>
				<div className={styles.block}>
					<h3 className="font-semibold text-xl pb-2">
						{t('home.opportunities.block_3.title')}
					</h3>
					<div>
						{t('home.opportunities.block_3.description')}
					</div>
				</div>
				<div className={styles.block}>
					<h3 className="font-semibold text-xl pb-2">
						{t('home.opportunities.block_4.title')}
					</h3>
					<div>
						{t('home.opportunities.block_4.description')}
					</div>
				</div>
				<div className={styles.block}>
					<h3 className="font-semibold text-xl pb-2">
						{t('home.opportunities.block_5.title')}
					</h3>
					<div>
						{t('home.opportunities.block_5.description')}
					</div>
				</div>
				<div className={styles.block}>
					<h3 className="font-semibold text-xl pb-2">
						{t('home.opportunities.block_6.title')}
					</h3>
					<div>
						{t('home.opportunities.block_6.description')}
					</div>
				</div>
			</div>
		</section>
	);
};

Opportunities.propTypes = {
	t: PropTypes.func.isRequired
};