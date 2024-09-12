import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Canvas } from '../Canvas';
import styles from './style.module.scss';


export function QRArtView ({ attributes, t, onMint, qrImage, onClear }) {

	useEffect(() => {
		// Отключение правой кнопки мыши
		const handleContextMenu = (event) => event.preventDefault();
		document.addEventListener('contextmenu', handleContextMenu);

		// Предотвращение перетаскивания изображений
		const handleDragStart = (event) => event.preventDefault();
		document.addEventListener('dragstart', handleDragStart);

		// Очистка слушателей при размонтировании компонента
		return () => {
			document.removeEventListener('contextmenu', handleContextMenu);
			document.removeEventListener('dragstart', handleDragStart);
		};
	}, []);

	const draw = (ctx) => {
		if (!(qrImage instanceof Blob || qrImage instanceof File)) {
			console.error('Invalid qrImage object');
			return;
		}

		const img = new Image();
		const url = URL.createObjectURL(qrImage);
		img.src = url;

		img.onload = () => {
			// Отрисовка QR-кода
			ctx.drawImage(img, 0, 0, 320, 320);

			// Добавление водяного знака
			ctx.font = '20px Arial';
			ctx.fillStyle = 'rgba(255, 255, 255)'; // Полупрозрачный белый цвет
			ctx.textAlign = 'center';
			ctx.fillText('created by QR Mint', 170, 300);

			// Очистка URL объекта
			URL.revokeObjectURL(url);
		};

		img.onerror = () => {
			URL.revokeObjectURL(url);
		};
	};

	return (
		<div className={classNames('flex', styles['container-mob'])}>
			<div style={{ marginTop: 15 }}>
				<div className={styles.canvas_container}>
					<Canvas draw={draw} width={320} height={320} />
					<div className={styles['canvas-overloy']} />
				</div>
				<button
					onClick={onClear}
					className="btn flex text-center justify-center items-center appearance-none py-1 focus:outline-none cursor-pointer select-none overflow-hidden z-10 w-full relative uppercase duration-100 font-semibold px-2 rounded dark:text-white h-11"
				>
					{t('remove')}
				</button>
			</div>
			<div style={{ marginTop: 15 }} className="ml-5 w-full flex flex-col justify-between">
				<div>
					<div><b>{t('home.mint.attributes')}:</b> <span className="text-xl	font-sans">{attributes.map((attr) => attr.value)?.join(', ')}</span></div>
					<div><b>{t('home.mint.price')}:</b> <span className="text-xl	font-sans">20 TON</span></div>
				</div>
				<button
					onClick={onMint}
					className="btn flex text-center justify-center items-center appearance-none py-1 focus:outline-none cursor-pointer select-none overflow-hidden z-10 w-full relative uppercase duration-100 font-semibold px-2 rounded dark:text-white h-11"
				>
					{t('mint')}
				</button>
			</div>
		</div>
	);
}

QRArtView.propTypes = {
	attributes: PropTypes.array.isRequired,
	onMint: PropTypes.func.isRequired,
	qrImage: PropTypes.string,
	text: PropTypes.string,
	t: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired
};
