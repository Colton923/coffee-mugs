'use client'

import {
  Container,
  Grid,
  Flex,
  Title,
  Button,
  Center,
  TextInput,
  Space,
  NumberInput,
  Select,
  Text,
  Badge,
  Image,
} from '@mantine/core'
import coffeeMug from 'public/theMug.png'
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
import { states } from '../static/states'
import type { AddressValidRequest } from './api/addressValid/route'
import { IconCreditCard } from '@tabler/icons-react'

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
    try {
      const addressValidRequest: AddressValidRequest = {
        address: {
          addressLines: [data.addressLineOne, data.addressLineTwo],
          locality: data.city,
          regionCode: 'US',
        },
      }
      const addressRes = await fetch('/api/addressValid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addressValidRequest),
      })

      const addressValidData = await addressRes.json()
      if (!addressValidData) {
        alert('Invalid address. Please check your information.')
        return
      }
      // Step 2: Create Stripe Order
      const stripeRes = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const stripeData = await stripeRes.json()

      if (!stripeData.sessionUrl) {
        alert('There was an error processing your payment. Please try again.')
        return
      }

      // Step 3: Redirect to Stripe Checkout
      window.location.href = stripeData.sessionUrl
    } catch (err) {
      alert('There was an error processing your payment. Please try again.')
    }
  }

  const NameErrorHandler = () => {
    const name = watch('name')
    //Allow spaces in name
    const test = RegExp(/^[a-zA-Z\s]*$/)

    if (name) {
      if (test.test(name) && name.length > 1) {
        return null
      } else if (name.length <= 1 || name.length > 25) {
        return 'Please enter a valid name'
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
      } else if (address.length <= 1 || address.length > 50) {
        return 'Please enter a valid address'
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
      } else if (city.length <= 1 || city.length > 25) {
        return 'Please enter a valid city'
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
      } else if (state.length !== 2) {
        return 'Please enter a valid state'
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
      } else if (email.length <= 1 || email.length > 50) {
        return 'Please enter a valid email'
      } else {
        return 'Please enter a valid email'
      }
    }
  }

  return (
    <Container size={'xl'} style={{ paddingTop: 50 }}>
      <Flex direction="column" justify="center" wrap={'wrap'}>
        <Center>
          <Title color="red" ta={'center'} order={1}>
            The 2024 Coffee Mug
          </Title>
        </Center>
        <Space h={20} />
        <Center>
          <Text fz={'sm'} color="red">
            Free Shipping on all orders!
          </Text>
        </Center>
        <Space h={20} />
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter={20}>
          <Grid.Col span={12} md={6}>
            <Flex direction="column" justify="center" wrap={'wrap'}>
              <Center>
                <div
                  style={{
                    display: 'flex',
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 1000,
                  }}
                >
                  <Badge color="green" variant="light" size="lg">
                    ${19.99 * watch('quantity')}
                  </Badge>
                </div>
                <div
                  style={{
                    display: 'flex',
                    position: 'fixed',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 1000,
                  }}
                >
                  <Badge color="green" variant="light" size="lg">
                    <Flex direction="row" align="center">
                      <Text mr={'xs'}>Powered By Stripe</Text>
                      <IconCreditCard size={30} />
                    </Flex>
                  </Badge>
                </div>
                <Image
                  src={coffeeMug.src}
                  alt="Coffee mug"
                  width={300}
                  height={300}
                />
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
                <Select
                  data={states}
                  label={'State'}
                  miw={'300px'}
                  withAsterisk
                  required
                  error={StateErrorHandler()}
                  onChange={(value: string) => {
                    setValue('state', value)
                  }}
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
            <Space h={20} />
            <Center>
              <Button type="submit" color="red">
                {`Checkout - $${19.99 * watch('quantity')}`}
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  )
}
