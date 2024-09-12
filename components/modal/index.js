import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Portal from '../Portal';
import styles from './style.module.scss';

const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24"
		viewBox="0 -960 960 960"
		width="24"
	>
		<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
	</svg>
);

const Modal = ({ onClose, children, className }) => {
	const dialog = (
		<>
			<div
				className={classNames(styles.modal, styles.fade, styles.show, className)}
				id="signin-via-wallet"
				tabIndex="-1"
				role="dialog"
				aria-modal="true"
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<div className={styles.modal__dialog}>
					<div className={styles.modal__content}>
						<button
							onClick={onClose}
							type="button"
							className={styles['btn-close']}
							data-bs-dismiss="modal"
							aria-label="Close"
						>
							<span>
								<CloseIcon />
							</span>
						</button>
						<div className={styles.modal__wrapper}>{children}</div>
					</div>
				</div>
			</div>
			<div className={classNames(styles.modal__backdrop, styles.fade, styles.show)} />
		</>
	);

	return <Portal>{dialog}</Portal>;
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	children: PropTypes.element,
	className: PropTypes.string,
};

export default Modal;
