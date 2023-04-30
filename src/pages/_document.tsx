import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-white font-sans break-words text-gray-700'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
