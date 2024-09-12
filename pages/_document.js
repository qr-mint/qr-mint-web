import React, { Html, Head, Main, NextScript } from 'next/document';

const yandexScript = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(98167722, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });`;

export default function Document () {
	return (
		<Html lang="en">
			<Head>
				<script dangerouslySetInnerHTML={{ __html: yandexScript }} type="text/javascript" />
				<noscript><div><img src="https://mc.yandex.ru/watch/90771200" style={{ 'position': 'absolute', 'left': '-9999px' }} alt="" /></div></noscript>
			</Head>
			<body className="bg-1">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
