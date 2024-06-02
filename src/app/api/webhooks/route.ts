import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// this is a route handler, handling the request from stripe webhook as we just 
// configured the webhook URL in the Stripe dashboard to point to this endpoint.
// essentially the same as microservice: stripe payment service -> our ordering service
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );


    // verify the event is from stripe
    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }

      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Invalid request metadata");
      }

      // these info are provided by user in stripe hosted checkout page
      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      // sync db
      await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state!,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state!,
            },
          },
        },
      });
    }

    // ! where this response is sent to? - stripe
    return NextResponse.json({ result: event, ok: true });

  } catch (err) {
    console.error(err);
    // send this to sentry (optional, more used in enterprise level app)

    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
