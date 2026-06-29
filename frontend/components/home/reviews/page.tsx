"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { getFeaturedFeedbacks } from "@/services/feedback.service";

type Review = {
  _id: string;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getFeaturedFeedbacks();
        setReviews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-3xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-orange-500 font-semibold uppercase tracking-wider">
            Testimonials
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-500 text-base md:text-lg">
            Pithoragarh people trust us for their favorite meals and fast
            delivery.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="group relative bg-[#fafafa] border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote */}
              <div className="absolute top-6 right-6 text-orange-100">
                <Quote size={50} />
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-orange-400 text-orange-400"
                  />
                ))}
              </div>

              {/* Empty Stars */}
              <div className="flex gap-1 mt-1">
                {[...Array(5 - review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="text-gray-300"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="mt-6 text-gray-600 leading-relaxed relative z-10">
                "{review.comment}"
              </p>

              {/* User */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-500">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.user.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Verified Customer
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}