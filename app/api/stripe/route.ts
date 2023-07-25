import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import type { Checkout } from '../../page'

export async function POST(request: Request) {
  const formData = await request.json()
  const quantity = formData.quantity as number

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
      success_url: `https://trump2024coffee.com?success=true`,
      cancel_url: `https://trump2024coffee.com?canceled=true`,
    })

    return NextResponse.json(session.url)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}
