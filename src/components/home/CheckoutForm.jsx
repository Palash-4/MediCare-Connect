"use client";

import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutForm({
  appointmentId,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Temporary success flow
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/${appointmentId}`,
        {
          method: "PATCH",
        }
      );

      const data =
        await res.json();

      if (
        data.modifiedCount > 0
      ) {
        toast.success(
          "Payment Successful!"
        );

        router.push(
          "/dashboard/patient/appointments"
        );
      } else {
        toast.error(
          "Payment update failed"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Payment Information
        </h2>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <CardElement
            options={{
              style: {
                base: {
                  color:
                    "#ffffff",
                  fontSize:
                    "18px",
                  "::placeholder":
                    {
                      color:
                        "#94a3b8",
                    },
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={
          !stripe || loading
        }
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-2xl text-lg font-bold text-white hover:scale-[1.02] transition"
      >
        {loading
          ? "Processing..."
          : "Pay Consultation Fee"}
      </button>
    </form>
  );
}