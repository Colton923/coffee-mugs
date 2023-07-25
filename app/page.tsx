'use client'

import {
  MantineProvider,
  Container,
  Grid,
  Flex,
  Title,
  Button,
  Center,
  TextInput,
  Space,
  NumberInput,
} from '@mantine/core'
import Image from 'next/image'
import coffeeMug from 'public/asdfjkl;.jpg'
import { useForm } from 'react-hook-form'

export interface Checkout {
  name: string
  addressLineOne: string
  addressLineTwo: string
  city: string
  state: string
  zip: any
  email?: string
  quantity: number
}

//One product page site
export default function Index() {
  const { register, handleSubmit, watch, setValue } = useForm<Checkout>({
    defaultValues: {
      name: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      quantity: 1,
    },
    delayError: 3000,
  })

  const onSubmit = async (data: Checkout) => {
    await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        window.location.href = data
      })
  }

  const NameErrorHandler = () => {
    const name = watch('name')
    //Allow spaces in name
    const test = RegExp(/^[a-zA-Z\s]*$/)
    if (name) {
      if (test.test(name)) {
        return null
      } else {
        return 'Please enter a valid name'
      }
    }
  }

  const AddressErrorHandler = () => {
    const address = watch('addressLineOne')
    const test = RegExp(/^[a-zA-Z0-9\s,'-]*$/)
    if (address) {
      if (test.test(address)) {
        return null
      } else {
        return 'Please enter a valid address'
      }
    }
  }

  const CityErrorHandler = () => {
    const city = watch('city')
    const test = RegExp(/^[a-zA-Z\s]*$/)
    if (city) {
      if (test.test(city)) {
        return null
      } else {
        return 'Please enter a valid city'
      }
    }
  }

  const StateErrorHandler = () => {
    const state = watch('state')
    const test = RegExp(/^[a-zA-Z]+$/)
    if (state) {
      if (test.test(state)) {
        return null
      } else {
        return 'Please enter a valid state'
      }
    }
  }

  const ZipErrorHandler = () => {
    const zip = watch('zip')
    const test = RegExp(/^[0-9]+$/)
    if (zip) {
      if (test.test(zip)) {
        if (zip.length === 5) {
          return null
        } else {
          return 'Please enter a valid zip code'
        }
      } else {
        return 'Please enter a valid zip code'
      }
    }
  }

  const EmailErrorHandler = () => {
    const email = watch('email')
    const test = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    if (email) {
      if (test.test(email)) {
        return null
      } else {
        return 'Please enter a valid email'
      }
    }
  }

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
      <Container size={'xl'} style={{ paddingTop: 50 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid gutter={20}>
            <Grid.Col span={12} md={6}>
              <Flex direction="column" justify="center" wrap={'wrap'}>
                <Center>
                  <Image src={coffeeMug} alt="Coffee mug" />
                </Center>
                <Center>
                  <Title color="red" ta={'center'} order={1}>
                    The Trump 2024 Coffee Mug
                  </Title>
                </Center>
                <Center>
                  <Title color="red" order={2}>
                    $24.99
                  </Title>
                </Center>
              </Flex>
            </Grid.Col>
            <Grid.Col span={12} md={6}>
              <Center>
                <Flex direction="column" justify="center" wrap={'wrap'}>
                  <TextInput
                    placeholder={'Donald'}
                    label={'Name'}
                    {...register('name')}
                    miw={'300px'}
                    withAsterisk
                    error={NameErrorHandler()}
                    required
                  />
                  <TextInput
                    placeholder={'1234 Main St'}
                    label={'Address Line 1'}
                    miw={'300px'}
                    {...register('addressLineOne')}
                    withAsterisk
                    required
                    error={AddressErrorHandler()}
                  />
                  <TextInput
                    placeholder={'Apt 1'}
                    label={'Address Line 2'}
                    miw={'300px'}
                    {...register('addressLineTwo')}
                    error={AddressErrorHandler()}
                  />
                  <TextInput
                    placeholder={'City'}
                    label={'City'}
                    miw={'300px'}
                    {...register('city')}
                    withAsterisk
                    required
                    error={CityErrorHandler()}
                  />
                  <TextInput
                    placeholder={'State'}
                    label={'State'}
                    miw={'300px'}
                    {...register('state')}
                    withAsterisk
                    required
                    error={StateErrorHandler()}
                  />
                  <TextInput
                    label={'Zip'}
                    placeholder={'90210'}
                    miw={'300px'}
                    {...register('zip')}
                    required
                    error={ZipErrorHandler()}
                  />
                  <TextInput
                    placeholder={'Email'}
                    label={'Email'}
                    miw={'300px'}
                    {...register('email')}
                    required
                    error={EmailErrorHandler()}
                  />
                </Flex>
              </Center>
              <Space h={20} />
              <Center>
                <NumberInput
                  label="Quantity"
                  placeholder="1"
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={(value: number) => {
                    setValue('quantity', value)
                  }}
                />
              </Center>
              <Center>
                <Button type="submit" color="red">
                  Checkout
                </Button>
              </Center>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
    </MantineProvider>
  )
}
