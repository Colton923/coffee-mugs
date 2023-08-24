'use client'

interface Props {
  children: React.ReactNode
}
import { Footer, MantineProvider, Flex } from '@mantine/core'
import {
  IconShoppingBag,
  IconMail,
  Icon3dCubeSphere,
  IconApiApp,
} from '@tabler/icons-react'
import Link from 'next/link'

const Provider = ({ children }: Props) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Open Sans, sans-serif',
        lineHeight: '1.5',
        colorScheme: 'dark',
      }}
    >
      {children}
      <Footer mt={'10px'} height={'100px'}>
        <Flex
          justify="space-evenly"
          align="center"
          wrap="wrap"
          direction="row"
          w={'100%'}
          h={'100%'}
        >
          <Link href="/">
            <Flex direction="column" align="center">
              <IconShoppingBag size={30} />
              One-Item-Shop
            </Flex>
          </Link>
          <a href="https://www.linkedin.com/in/colton-mcclintock-95279a152/">
            <Flex direction="column" align="center">
              <Icon3dCubeSphere size={30} />
              Connect
            </Flex>
          </a>
          <a href="mailto:c.mcclin@webdevsolutionsllc.com">
            <Flex direction="column" align="center">
              <IconMail size={30} />
              Customer Service
            </Flex>
          </a>
          <Link href="/webdevs">
            <Flex direction="column" align="center">
              <IconApiApp size={30} />
              Webdevs
            </Flex>
          </Link>
        </Flex>
      </Footer>
    </MantineProvider>
  )
}

export default Provider
