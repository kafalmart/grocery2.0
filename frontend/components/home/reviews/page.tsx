import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    location: "Meerut",
    review:
      "The food arrived hot and fresh. The restaurant options are excellent and ordering through WhatsApp was incredibly simple.",
  },
  {
    name: "Priya Verma",
    location: "Noida",
    review:
      "Loved the variety of cuisines available. The delivery was quick and the food quality exceeded my expectations.",
  },
  {
    name: "Aman Gupta",
    location: "Ghaziabad",
    review:
      "One of the best food ordering experiences I've had. Easy ordering, fast support, and delicious meals every time.",
  },
];

export default function Reviews() {
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
            Pithoragarh people trust us for their
            favorite meals and fast delivery.
          </p>

        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="group relative bg-[#fafafa] border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-orange-100">
                <Quote size={50} />
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-orange-400 text-orange-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-6 text-gray-600 leading-relaxed relative z-10">
                "{review.review}"
              </p>

              {/* User */}
              <div className="mt-8 pt-6 border-t border-gray-200">

                <div className="flex items-center gap-4">

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-500">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {review.location}
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