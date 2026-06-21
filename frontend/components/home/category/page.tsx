import Link from "next/link";
import {
  Sandwich,
  ShoppingCart,
} from "lucide-react";

const categories = [
  {
    title: "Food",
    icon: Sandwich,
    description: "Fresh meals, snacks and beverages",
    link: "/restaurants",
    image: "/hero.png",
  },
  {
    title: "Grocery",
    icon: ShoppingCart,
    description: "Daily essentials and household items",
    link: "/grocery",
    image: "/grocery.png",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-6">
        

        <div className="grid md:grid-cols-2 gap-8 mt-14">
  {categories.map((item) => (
    <Link
      key={item.title}
      href={item.link}
      className="group relative overflow-hidden rounded-3xl h-[320px]"
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">

        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
          <item.icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-3xl font-bold text-white mt-5">
          {item.title}
        </h3>

        <p className="text-white/80 mt-2 max-w-sm">
          {item.description}
        </p>

        <div className="mt-5 text-orange-400 font-semibold">
          Explore →
        </div>
      </div>
    </Link>
  ))}
</div>
      </div>
    </section>
  );
}