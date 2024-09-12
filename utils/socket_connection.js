import io from 'socket.io-client';

export const createClient = () => {
	const host = process.env.SOCKET_URL;
	if (!host) throw new Error('Socker host is required');
	//namespace = process.env.SOCKET_NAMESPANE;

	//const target = host + namespace;
	console.log('Open socket connection at ' + host);

	return new Promise((resolve, reject) => {
		const socket = io(host, {
			transports: ['websocket'],
			upgrade: false,
			// query: {
			// 	key: config.socket.back_key
			// }
		});

		socket.on('connect', () => {
			resolve(socket);
		});

		socket.on('disconnect', () => {
			console.log('socket disconnected');
		});

		socket.on('connect_error', (err) => {
			console.log('Socker connection error', err);
			reject(err);
		});
	});
};

// ws://undefined/socket.io/?EIO=4&transport=websocket // Ошибка протокола, забыл ws или https
