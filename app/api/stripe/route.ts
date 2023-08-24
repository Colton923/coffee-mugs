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

    return NextResponse.json({
      success: true,
      message: 'Order confirmed successfully',
      sessionUrl: session.url,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error })
  }
}
