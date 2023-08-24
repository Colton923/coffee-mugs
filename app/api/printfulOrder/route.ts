import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const orderId = await request.json()

  try {
    // Call Printful API to confirm the order
    const printfulResponse = await fetch(
      `https://api.printful.com/orders/${orderId}/confirm`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        },
      }
    )

    if (!printfulResponse.ok) {
      throw new Error(
        `Printful API returned ${
          printfulResponse.status
        }: ${await printfulResponse.text()}`
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
