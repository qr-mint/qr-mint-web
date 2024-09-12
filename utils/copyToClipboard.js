export function copyToClipboard (text) {
	return new Promise((resolve) => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				resolve(text);
			})
			.catch(() => {
				const input = document.createElement('input');
				input.style.opacity = '0';
				input.style.position = 'fixed';
				input.value = text;
				document.body.appendChild(input);
				input.select();
				document.execCommand('copy', false, '');
				input.remove();
				resolve(text);
			});
	});
}
