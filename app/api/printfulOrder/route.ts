import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.json()

  try {
    // Call Printful API to confirm the order
    const response = await fetch('https://api.printful.com/orders?confirm=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + process.env.PRINTFUL_TOKEN,
      },

      body: JSON.stringify({
        recipient: {
          name: formData.name,
          address1: formData.addressLineOne,
          address2: formData.addressLineTwo,
          city: formData.city,
          zip: formData.zip,
          country_code: 'US',
          state_code: formData.state,
          email: formData.email,
        },
        items: [
          {
            external_id: 'Trump2024Coffee',
            variant_id: 3001,
            quantity: formData.quantity,
            retail_price: '19.95',
            name: 'The Mug',
            files: [
              {
                url: 'https://www.trump2024coffee.com/images/trump2024coffee.png',
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(
        `Printful API returned ${response.status}: ${await response.text()}`
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Order confirmed successfully',
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error })
  }
}
