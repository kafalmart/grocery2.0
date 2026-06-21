import Link from "next/link";
import {
  FileText,
  Package,
  Truck,
  Shield,
  AlertTriangle,
  Scale,
  Phone,
  MapPin,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
              <FileText className="h-4 w-4" />
              Terms & Conditions
            </div>

            <h1 className="mt-6 text-4xl font-bold md:text-5xl">
              Terms & Conditions
            </h1>

            <p className="mt-4 text-lg text-emerald-50">
              These Terms & Conditions govern your access to and use of
              Kafalmart's website, mobile application, and related services.
            </p>

            <p className="mt-2 text-sm text-emerald-100">
              Last updated: June 2026
            </p>

          </div>

        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[280px_1fr]">

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="font-semibold text-slate-900">
              Contents
            </h3>

            <nav className="mt-4 space-y-3 text-sm">

              <a href="#services" className="block text-slate-600 hover:text-green-600">
                Nature of Services
              </a>

              <a href="#orders" className="block text-slate-600 hover:text-green-600">
                Order Acceptance
              </a>

              <a href="#delivery" className="block text-slate-600 hover:text-green-600">
                Delivery Charges
              </a>

              <a href="#products" className="block text-slate-600 hover:text-green-600">
                Product Responsibility
              </a>

              <a href="#food" className="block text-slate-600 hover:text-green-600">
                Food Delivery Services
              </a>

              <a href="#parcel" className="block text-slate-600 hover:text-green-600">
                Intercity Parcel Services
              </a>

              <a href="#privacy" className="block text-slate-600 hover:text-green-600">
                Customer Information & Privacy
              </a>

              <a href="#obligations" className="block text-slate-600 hover:text-green-600">
                User Obligations
              </a>

              <a href="#fraud" className="block text-slate-600 hover:text-green-600">
                Fraudulent Claims
              </a>

              <a href="#liability" className="block text-slate-600 hover:text-green-600">
                Limitation of Liability
              </a>

              <a href="#modifications" className="block text-slate-600 hover:text-green-600">
                Modifications
              </a>

              <a href="#law" className="block text-slate-600 hover:text-green-600">
                Governing Law
              </a>

              <a href="#contact" className="block text-slate-600 hover:text-green-600">
                Contact Information
              </a>

            </nav>

          </div>
        </aside>

        <main className="space-y-8">

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">

            <div className="flex items-start gap-4">

              <AlertTriangle className="mt-1 h-6 w-6 text-amber-600" />

              <div>

                <h2 className="text-lg font-bold text-amber-900">
                  Important Notice
                </h2>

                <p className="mt-2 text-amber-800">
                  Kafalmart acts primarily as a delivery and logistics
                  facilitator connecting customers with restaurants,
                  merchants, vendors, and parcel service providers in Pithoragarh, Uttarakhand.
                </p>

              </div>

            </div>

          </div>

          <section
            id="services"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900">
                1. Nature of Services
              </h2>
            </div>

            <p className="mt-5 text-slate-600">
              Kafalmart is a technology-enabled platform that facilitates the delivery of:
            </p>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Restaurant Food Orders</li>
              <li>• Groceries</li>
              <li>• Dairy Products</li>
              <li>• Stationery Items</li>
              <li>• Intercity Parcels</li>
              <li>• Other products and services available on the platform</li>
            </ul>

            <p className="mt-6 text-slate-600">
              Kafalmart primarily acts as a delivery and logistics facilitator.
            </p>

          </section>

          <section
            id="orders"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              2. Order Acceptance
            </h2>

            <p className="mt-4 text-slate-600">
              All orders are subject to acceptance and availability.
            </p>

            <p className="mt-5 font-semibold text-slate-800">
              Kafalmart reserves the right to refuse, cancel, or modify any order due to:
            </p>

            <ul className="mt-4 space-y-3 text-slate-700">
              <li>• Product unavailability</li>
              <li>• Operational limitations</li>
              <li>• Pricing errors</li>
              <li>• Fraud prevention measures</li>
              <li>• Legal or regulatory requirements</li>
            </ul>

          </section>

          <section
            id="delivery"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900">
                3. Delivery Charges
              </h2>
            </div>

            <p className="mt-5 text-slate-600">
              Delivery charges displayed on the platform apply to the delivery and logistics services provided by Kafalmart.
            </p>

            <div className="mt-6 rounded-2xl bg-green-50 p-5 text-green-800">
              By placing an order, customers acknowledge and agree to the delivery charges displayed at checkout.
            </div>

            <p className="mt-6 text-slate-600">
              Charges may vary based on distance, order value, location, service type, and operational requirements.
            </p>

          </section>

          <section
            id="products"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              4. Product Responsibility
            </h2>

            <p className="mt-4 text-slate-600">
              Restaurants, merchants, dairy suppliers, stationery vendors, and other sellers are solely responsible for:
            </p>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Product quality</li>
              <li>• Freshness</li>
              <li>• Packaging</li>
              <li>• Quantity</li>
              <li>• Product descriptions</li>
              <li>• Pricing accuracy</li>
              <li>• Compliance with applicable laws</li>
            </ul>

          </section>

          <section
            id="food"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              5. Food Delivery Services
            </h2>

            <p className="mt-4 text-slate-600">
              Restaurants remain solely responsible for food preparation, ingredients, hygiene standards, food quality, packaging, freshness, and safety.
            </p>

            <p className="mt-4 text-slate-600">
              Kafalmart's responsibility is limited to order collection and delivery.
            </p>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
              Food complaints are handled in accordance with our{" "}
              <Link
                href="/policy"
                className="font-semibold underline"
              >
                Refund & Complaint Policy
              </Link>
              .
            </div>

          </section>

          <section
            id="parcel"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              6. Intercity Parcel Services
            </h2>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Parcels must contain lawful items only.</li>
              <li>• Parcels must be properly packed and secured.</li>
              <li>• Parcel contents must be accurately described.</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-700">
              Kafalmart reserves the right to reject unsafe, prohibited, hazardous, restricted, or illegal parcels.
            </div>

          </section>

          <section
            id="privacy"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900">
                7. Customer Information & Privacy
              </h2>
            </div>

            <p className="mt-5 text-slate-600">
              Kafalmart may collect:
            </p>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Name</li>
              <li>• Mobile Number</li>
              <li>• Delivery Address</li>
              <li>• Email Address</li>
              <li>• Order Details</li>
              <li>• Location Information required for delivery</li>
            </ul>

            <p className="mt-6 text-slate-600">
              Information is collected solely for order processing, deliveries, customer support, service improvement, and legal compliance.
            </p>

            <p className="mt-4 text-slate-600">
              Kafalmart does not sell or rent customer information to unauthorized third parties.
            </p>

          </section>

          <section
            id="obligations"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              8. User Obligations
            </h2>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Provide accurate and complete information.</li>
              <li>• Use the platform lawfully and responsibly.</li>
              <li>• Cooperate with delivery personnel and support staff.</li>
              <li>• Refrain from abusive, fraudulent, or unlawful conduct.</li>
            </ul>

          </section>

          <section
            id="fraud"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              9. Fraudulent Claims
            </h2>

            <p className="mt-4 text-slate-600">
              False statements, manipulated evidence, AI-generated images, misrepresentation of facts, or fraudulent transactions are strictly prohibited.
            </p>

            <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-700">
              Kafalmart reserves the right to suspend accounts, deny claims, recover losses, and initiate legal proceedings.
            </div>

          </section>

          <section
            id="liability"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              10. Limitation of Liability
            </h2>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Product quality issues originating from third-party vendors</li>
              <li>• Restaurant-related deficiencies</li>
              <li>• Delays caused by weather, traffic, strikes, or natural disasters</li>
              <li>• Indirect, incidental, or consequential damages</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5 text-slate-700">
              Kafalmart's total liability shall not exceed the amount paid for the specific order.
            </div>

          </section>

          <section
            id="modifications"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold text-slate-900">
              11. Modifications
            </h2>

            <p className="mt-4 text-slate-600">
              Kafalmart reserves the right to amend, update, or modify these Terms & Conditions at any time.
            </p>

            <p className="mt-4 text-slate-600">
              Continued use of the platform constitutes acceptance of the revised Terms & Conditions.
            </p>

          </section>

          <section
            id="law"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >

            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900">
                12. Governing Law & Jurisdiction
              </h2>
            </div>

            <p className="mt-5 text-slate-600">
              These Terms & Conditions shall be governed by the laws of India.
            </p>

            <div className="mt-6 flex gap-3 rounded-2xl bg-slate-100 p-5 text-slate-700">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />

              <p>
                All disputes shall be subject to the exclusive jurisdiction of the competent courts in Pithoragarh, Uttarakhand.
              </p>

            </div>

          </section>

          <section
            id="contact"
            className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white shadow-lg"
          >

            <h2 className="text-2xl font-bold">
              13. Contact Information
            </h2>

            <p className="mt-4 text-emerald-50">
              For support, complaints, or legal inquiries:
            </p>

            <div className="mt-6 space-y-3">

              <p className="font-semibold">
                Kafalmart
              </p>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>Pithoragarh, Uttarakhand, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>+91 8439051530</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>+91 6398182416</span>
              </div>

            </div>

            <p className="mt-8 text-sm text-emerald-100">
              By using Kafalmart's services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
            </p>

          </section>

        </main>

      </div>
    </div>
  );
}