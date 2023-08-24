'use client'

import { Container, Grid, Title, Space, Text } from '@mantine/core'

const Page = () => {
  return (
    <Container size={'xl'}>
      <Grid gutter={20}>
        <Grid.Col span={12}>
          <Title order={1}>Welcome to Webdev Solutions LLC one-item store!</Title>
          <Text>
            Here at Webdev Solutions LLC one-item store, we specialize in delivering
            just one premium quality product - the 2024 Coffee Mug.
          </Text>
          <Text>
            Our mission is to provide coffee enthusiasts with a unique mug that not
            only serves its functional purpose but also represents a piece of
            history.
          </Text>
          <Space h={20} />
          <Title order={2}>Why Only One Product?</Title>
          <Text>
            By focusing on a single product, we ensure unmatched quality, dedicated
            customer service, and a seamless shopping experience.
          </Text>
        </Grid.Col>

        <Grid.Col span={12}>
          <Title order={2}>Legitimacy and Trust</Title>
          <Text>
            As a dedicated e-commerce store, we uphold the highest standards of
            quality and service. Here are some factors that make us a legitimate
            business:
          </Text>
          <ul>
            <li>SSL Secured Website - Your information is safe with us.</li>
            <li>
              30-day Return Policy - Not satisfied? Return within 30 days for a full
              refund.
            </li>
            <li>Transparent Pricing - No hidden fees, ever.</li>
            <li>Customer Reviews - Check out what our customers have to say!</li>
          </ul>
          <Space h={20} />
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Page
