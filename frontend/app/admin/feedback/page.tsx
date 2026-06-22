"use client";

import { useEffect, useState } from "react";
import { getAllFeedbacks } from "../../../services/feedback.service";

type Feedback = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  order: {
    _id: string;
    restaurant?: {
      name: string;
    };
  };
};

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const data = await getAllFeedbacks();
        setFeedbacks(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadFeedbacks();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Customer Feedback
        </h1>

        <div className="animate-pulse space-y-4">
          <div className="h-28 bg-gray-200 rounded-2xl" />
          <div className="h-28 bg-gray-200 rounded-2xl" />
          <div className="h-28 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Customer Feedback
        </h1>

        <p className="text-gray-500 mt-2">
          View reviews and ratings submitted for orders.
        </p>
      </div>

      {feedbacks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow">
          <div className="text-6xl mb-4">
            ⭐
          </div>

          <h2 className="text-2xl font-bold">
            No Feedback Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Customers haven't submitted any reviews.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-3xl p-6 shadow border"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">
                    {feedback.user.name}
                  </h3>

                  <p className="text-gray-500">
                    {feedback.user.email}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Order: #
                    {feedback.order._id
                      .slice(-8)
                      .toUpperCase()}
                  </p>

                  {feedback.order.restaurant && (
                    <p className="text-sm text-gray-400">
                      Restaurant:{" "}
                      {
                        feedback.order.restaurant
                          .name
                      }
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-yellow-500 text-xl">
                    {"⭐".repeat(
                      feedback.rating
                    )}
                  </div>

                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(
                      feedback.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              {feedback.comment && (
                <div className="mt-5 bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-700">
                    {feedback.comment}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}