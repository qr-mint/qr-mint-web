import React from 'react';
import PropTypes from 'prop-types';

import Modal from './index';

const SuccessIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="26"
		height="27"
		viewBox="0 0 26 27"
		fill="none"
	>
		<path
			d="M13 0.5C5.83203 0.5 0 6.33203 0 13.5C0 20.668 5.83203 26.5 13 26.5C20.168 26.5 26 20.668 26 13.5C26 6.33203 20.168 0.5 13 0.5ZM13 2.5C19.0859 2.5 24 7.41406 24 13.5C24 19.5859 19.0859 24.5 13 24.5C6.91406 24.5 2 19.5859 2 13.5C2 7.41406 6.91406 2.5 13 2.5ZM19.2812 8.78125L12 16.0625L7.71875 11.7812L6.28125 13.2188L11.2812 18.2188L12 18.9062L12.7188 18.2188L20.7188 10.2188L19.2812 8.78125Z"
			fill="#00EA78"
		/>
	</svg>
);

export const SuccessDialog = ({ t, title, subtitle, onClose }) => {
	return (
		<Modal onClose={onClose} className="success">
			<>
				<div className="notice">
					<SuccessIcon />
				</div>
				<h3>{title}</h3>
				<p>{subtitle}</p>
				<button className="btn btn-primary" onClick={onClose}>
					{t('components.successDialog.button')}
				</button>
			</>
		</Modal>
	);
};

SuccessDialog.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

export default SuccessDialog;
