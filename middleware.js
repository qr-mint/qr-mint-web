import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

const langs = [ 'ru', 'en' ];

export async function middleware (req) {
	if (
		req.nextUrl.pathname.startsWith('/_next') ||
		req.nextUrl.pathname.includes('/api/') ||
		PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return;
	}

	if (req.nextUrl.locale === 'default') {
		let locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
		if (!langs.includes(locale)) {
			locale = 'en';
		}
		return NextResponse.redirect(
			new URL(
				`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
				req.url,
			),
		);
	}
}
