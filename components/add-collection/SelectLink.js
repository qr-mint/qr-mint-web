import React from 'react';
import PropTypes from 'prop-types';
import { FaLink, FaTelegram, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';

import Modal from '../modal/index';

const links = [ 'website', 'telegram', 'x' ];

export const SelectLink = ({ onClose, onAdd, t }) => {
	const renderPrefix = (name) => {
		if (name === 'website') {
			return <FaLink />;
		} else if (name === 'telegram') {
			return <FaTelegram />;
		} else if (name === 'x') {
			return <FaTwitter />;
		} else if (name === 'youtube') {
			return <FaYoutube />;
		} else if (name === 'instagram') {
			return <FaInstagram />;
		}
		return;
	};
	return (
		<Modal onClose={onClose}>
			<div className="flex flex-col">
				<h1 className="mt-3">{t('collections.add.selectLink.title')}</h1>
				{links.map((link) =>
					<button
						onClick={() => onAdd(link)}
						key={link}
						className="p-2 mt-3 bg-zinc-900 text-center w-full rounded flex items-center"
					>
						<div className="mr-2">{renderPrefix(link)}</div> {link}
					</button>
				)}
			</div>
		</Modal>
	);
};

SelectLink.propTypes = {
	t: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired
};