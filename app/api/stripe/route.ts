import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const formData = await request.json()
  const quantity = parseInt(formData.quantity)

  try {
    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : '',
      {
        apiVersion: '2022-11-15',
      }
    )

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `https://www.trump2024coffee.com?success=true`,
      cancel_url: `https://www.trump2024coffee.com?canceled=true`,
    })

    const response = await fetch('https://api.printful.com/orders', {
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
            quantity: quantity,
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

    const printfulOrder = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Order confirmed successfully',
      sessionUrl: session.url,
      printfulOrder,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error })
  }
}
