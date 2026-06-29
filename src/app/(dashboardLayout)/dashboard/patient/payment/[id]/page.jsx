"use client";

import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/home/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-900 rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-white">
          Complete Payment
        </h1>

        <p className="text-slate-400 mt-3">
          Appointment ID: {id}
        </p>

        <div className="mt-10">
          <Elements stripe={stripePromise}>
            <CheckoutForm appointmentId={id} />
          </Elements>
        </div>
      </div>
    </div>
  );
}