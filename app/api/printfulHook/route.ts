import { NextResponse } from 'next/server'
import Stripe from 'stripe'
// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
  const buf = await request.arrayBuffer()
  const payload = Buffer.from(buf).toString('utf-8')
  const sig = request.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err: any) {
    console.log(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const formData = session.metadata
    if (!formData) {
      return NextResponse.json(
        { success: false, error: 'No metadata found' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.printful.com/orders?confirm=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.PRINTFUL_TOKEN,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID as string,
      },

      body: JSON.stringify({
        recipient: {
          name: formData.name,
          email: formData.email,
          address1: formData.addressLineOne,
          address2: formData.addressLineTwo,
          city: formData.city,
          state_code: formData.state,
          country_code: 'US',
          zip: formData.zip,
        },
        items: [
          {
            sync_variant_id: '64ea4d664d0374',
            quantity: formData.quantity,
            name: 'Enamel Mug Trump',
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
    console.log(printfulOrder)

    return NextResponse.json({
      success: true,
      message: 'Order confirmed successfully',
    })
  }

  return NextResponse.json({ success: true })
}
