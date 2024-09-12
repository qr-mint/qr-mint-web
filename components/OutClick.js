import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OnOutsiceClick = ({
	container,
	onOutsideClick,
	mouseEvent = 'click',
	touchEvent = 'touchend',
	children,
}) => {
	let node = useRef(null);

	const checkInsideContainer = container && container.current;

	useEffect(() => {
		const currContainer = checkInsideContainer;
		const handleEvents = (event) => {
			// if clicked inside the component then dont respond
			if (node.current && node.current.contains(event.target)) {
				return;
			}

			// if a container is present and it is clicked inside of that then respond
			if (container && container.current.contains(event.target)) {
				return onOutsideClick(event);
			}

			// respond
			return onOutsideClick(event);
		};

		if (checkInsideContainer) {
			currContainer.addEventListener(mouseEvent, handleEvents);
			currContainer.addEventListener(touchEvent, handleEvents);
		} else {
			document.addEventListener(mouseEvent, handleEvents);
			document.addEventListener(touchEvent, handleEvents);
		}

		return () => {
			if (checkInsideContainer) {
				currContainer.removeEventListener(mouseEvent, handleEvents);
				currContainer.removeEventListener(touchEvent, handleEvents);
			} else {
				document.removeEventListener(mouseEvent, handleEvents);
				document.removeEventListener(touchEvent, handleEvents);
			}
		};
	}, [ container, checkInsideContainer, mouseEvent, onOutsideClick, touchEvent ]);

	return { ...children, ref: node };
};

OnOutsiceClick.propTypes = {
	container: PropTypes.any,
	onOutsideClick: PropTypes.func,
	mouseEvent: PropTypes.string,
	touchEvent: PropTypes.string,
	children: PropTypes.element,
	display: PropTypes.string,
};

export default OnOutsiceClick;
