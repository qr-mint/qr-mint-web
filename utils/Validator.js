
const url = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

class Validator {
	static retweetURL (str = '') {
		return !!str.match(/https:\/\/twitter.com\/.+status\//);
	}

	static discordInviteURL (url) {
		return url.includes('https://discord.com/invite/') || url.includes('https://discord.gg/');
	}

	static url (website = '') {
		return !!website.match(url);
	}
}

module.exports = Validator;
