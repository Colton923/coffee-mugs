import { NextResponse } from 'next/server'

export type AddressValidRequest = {
  address: {
    regionCode: string
    locality: string
    addressLines: string[]
  }
}

export async function POST(request: Request) {
  const address = await request.json()

  try {
    const response = await fetch(
      `https://addressvalidation.googleapis.com/v1:validateAddress?key=${process.env.ADDRESS_VALIDATION_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
      }
    )

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
