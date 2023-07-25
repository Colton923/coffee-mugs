import '@styles/global.scss'
interface Props {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="Trump 2024 Coffee Mugs" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="favicon.ico" />
        <title>Trump 2024 Coffee Mug</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
