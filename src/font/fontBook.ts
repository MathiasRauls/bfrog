import localFont from 'next/font/local';

export const puff = localFont({
	src: [
		{
			path: './dynapuff.ttf',
			weight: '100 900',
			style: 'normal',
		},
	],
	variable: '--font-puff',
	display: 'swap',
})
export const pix = localFont({
	src: [
		{
			path: './micro.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-pix',
	display: 'swap',
})