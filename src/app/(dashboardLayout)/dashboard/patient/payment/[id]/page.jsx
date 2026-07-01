"use client";

import { useParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/home/CheckoutForm";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const { id } = useParams();

  const [appointment, setAppointment] =
    useState(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/appointment/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Appointment:", data);
        console.log(
          "Consultation Fee:",
          data.consultationFee
        );

        setAppointment(data);
      });
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-slate-900 rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-white">
          Complete Payment
        </h1>

        <p className="text-slate-400 mt-3">
          Appointment ID: {id}
        </p>

        {appointment && (
          <div className="mt-8 space-y-3">

            <p className="text-white">
              Doctor:
              <span className="text-cyan-400 ml-2">
                {appointment.doctorName}
              </span>
            </p>

            <p className="text-white">
              Consultation Fee:
              <span className="text-green-400 ml-2 font-bold text-xl">
                ৳
                {
                  appointment.consultationFee
                }
              </span>
            </p>
          </div>
        )}

        <div className="mt-10">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              appointmentId={id}
              amount={
                appointment?.consultationFee
              }
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}