import {
  Search,
  UtensilsCrossed,
  MessageCircle,
  Truck,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Restaurants",
    description:
      "Browse top-rated restaurants and cuisines near you.",
  },
  {
    icon: UtensilsCrossed,
    title: "Choose Your Meal",
    description:
      "Explore menus and select your favorite dishes.",
  },
  {
    icon: MessageCircle,
    title: "Order on WhatsApp",
    description:
      "Place your order instantly through WhatsApp.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get fresh food delivered right to your doorstep.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="text-orange-500 font-semibold uppercase tracking-wider">
            Simple Process
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
            How It Works
          </h2>

          <p className="mt-4 text-gray-500 text-base md:text-lg">
            Order your favorite food in just a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-orange-100 text-orange-500 text-sm font-bold flex items-center justify-center">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition">
                <step.icon className="w-8 h-8 text-orange-500" />
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}