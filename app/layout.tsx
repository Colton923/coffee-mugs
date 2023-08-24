import Provider from '@components/Provider'
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
        <meta name="description" content="2024 Coffee Mug" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="favicon.ico" />
        <title>2024 Coffee Mug</title>
      </head>
      <body>
        <main>
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  )
}
