import { useRef, useEffect } from 'react';

const useCanvas = (draw, options = {}) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext(options.context || '2d');
		let frameCount = 0;
		let animationFrameId;
		frameCount++;
		draw(context, frameCount);
		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [draw]);
	return canvasRef;
};

export default useCanvas;
