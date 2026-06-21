import Link from "next/link";
import {
  AlertTriangle,
  FileText,
  ShieldAlert,
  Phone,
  MessageCircle,
  Scale,
} from "lucide-react";

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
              <FileText className="h-4 w-4" />
              Refund & Complaint Resolution Policy
            </div>

            <h1 className="mt-6 text-4xl font-bold md:text-5xl">
              Food Order Refund & Complaint Policy
            </h1>

            <p className="mt-4 text-lg text-emerald-50">
              Kafalmart acts solely as a technology and delivery platform
              connecting customers with restaurant partners.
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
              <a href="#responsibility" className="block text-slate-600 hover:text-green-600">
                Restaurant Responsibility
              </a>

              <a href="#complaint" className="block text-slate-600 hover:text-green-600">
                Complaint Submission
              </a>

              <a href="#investigation" className="block text-slate-600 hover:text-green-600">
                Investigation & Resolution
              </a>

              <a href="#refund" className="block text-slate-600 hover:text-green-600">
                Refund Eligibility
              </a>

              <a href="#fraud" className="block text-slate-600 hover:text-green-600">
                Fraudulent Activities
              </a>

              <a href="#liability" className="block text-slate-600 hover:text-green-600">
                Limitation of Liability
              </a>

              <a href="#support" className="block text-slate-600 hover:text-green-600">
                Contact Support
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
                  Kafalmart does not prepare, package, or inspect food items.
                  Food quality, ingredients, hygiene, packaging, and safety are
                  the sole responsibility of the respective restaurant partner.
                </p>
              </div>

            </div>

          </div>

          <section
            id="responsibility"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              1. Restaurant Responsibility
            </h2>

            <p className="mt-4 text-slate-600">
              Any issues related to the following are the sole responsibility of
              the respective restaurant partner:
            </p>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Spoiled or stale food</li>
              <li>• Unpleasant smell or taste</li>
              <li>• Food contamination</li>
              <li>• Incorrect food preparation</li>
              <li>• Poor food quality</li>
              <li>• Missing food items packed by the restaurant</li>
              <li>• Packaging defects originating from the restaurant</li>
            </ul>

            <p className="mt-6 text-slate-600">
              Kafalmart acts solely as a delivery and technology platform and
              shall not be held liable for food quality, preparation standards,
              ingredients, or restaurant-related deficiencies.
            </p>
          </section>

          <section
            id="complaint"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              2. Complaint Submission Process
            </h2>

            <p className="mt-4 text-slate-600">
              Complaints must be submitted within a reasonable time after
              delivery through the designated complaint form.
            </p>

            <p className="mt-5 font-semibold text-slate-800">
              The complaint must include:
            </p>

            <ul className="mt-4 space-y-3 text-slate-700">
              <li>• Order details</li>
              <li>• Clear photographs of the food item(s)</li>
              <li>• Photographs of the packaging (if applicable)</li>
              <li>• A detailed description of the issue</li>
              <li>• Any additional evidence requested by our support team</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-red-700">
              Incomplete complaints may result in delays or rejection of the
              claim.
            </div>
          </section>

          <section
            id="investigation"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              3. Investigation & Resolution
            </h2>

            <ol className="mt-5 space-y-4 text-slate-700">
              <li>1. Kafalmart reviews the submitted information.</li>
              <li>2. Customers may be contacted for clarification.</li>
              <li>3. The complaint is forwarded to the restaurant partner.</li>
              <li>4. A final decision is made based on available evidence.</li>
            </ol>

            <p className="mt-6 text-slate-600">
              Resolution timelines may vary depending on the complexity of the
              issue and the response time of the restaurant partner.
            </p>
          </section>

          <section
            id="refund"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              4. Refund Eligibility
            </h2>

            <p className="mt-4 text-slate-600">
              Refunds, whether full or partial, are issued only after
              verification and approval by the concerned restaurant partner.
            </p>

            <p className="mt-4 text-slate-600">
              Once approved, Kafalmart will process the refund through the
              original payment method or any other method deemed appropriate.
            </p>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800">
              Kafalmart cannot guarantee refunds where the restaurant partner
              rejects the claim after investigation.
            </div>
          </section>

          <section
            id="fraud"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-7 w-7 text-red-600" />

              <h2 className="text-2xl font-bold text-slate-900">
                5. False Claims & Fraudulent Activities
              </h2>
            </div>

            <p className="mt-5 text-slate-600">
              Kafalmart maintains a zero-tolerance policy toward fraudulent
              refund requests.
            </p>

            <p className="mt-5 font-semibold text-slate-800">
              Fraudulent activities include:
            </p>

            <ul className="mt-4 space-y-3 text-slate-700">
              <li>• False statements</li>
              <li>• Fabricated complaints</li>
              <li>• Manipulated evidence</li>
              <li>• Edited or AI-generated images or videos</li>
              <li>• Misrepresentation of facts</li>
              <li>• Intentional misuse of the complaint process</li>
            </ul>

            <p className="mt-6 font-semibold text-slate-800">
              Kafalmart reserves the right to:
            </p>

            <ul className="mt-4 space-y-3 text-slate-700">
              <li>• Reject refund requests</li>
              <li>• Suspend or permanently block customer accounts</li>
              <li>• Recover wrongfully obtained refunds</li>
              <li>• Initiate legal proceedings under applicable Indian laws</li>
            </ul>

            <div className="mt-6 flex gap-3 rounded-2xl bg-red-50 p-5 text-red-700">
              <Scale className="mt-1 h-5 w-5 flex-shrink-0" />

              <p>
                Any legal disputes arising from fraudulent activities shall be
                subject to the jurisdiction of the competent courts in
                Pithoragarh, Uttarakhand.
              </p>
            </div>
          </section>

          <section
            id="liability"
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              6. Limitation of Liability
            </h2>

            <p className="mt-4 text-slate-600">
              Kafalmart serves only as an intermediary delivery platform.
            </p>

            <p className="mt-4 text-slate-600">
              To the maximum extent permitted by law, Kafalmart shall not be
              liable for:
            </p>

            <ul className="mt-5 space-y-3 text-slate-700">
              <li>• Food quality issues</li>
              <li>• Food safety concerns</li>
              <li>• Restaurant preparation errors</li>
              <li>• Ingredient-related disputes</li>
              <li>• Restaurant hygiene standards</li>
              <li>• Health reactions arising from food consumption</li>
            </ul>

            <p className="mt-6 text-slate-600">
              Such matters remain solely the responsibility of the respective
              restaurant partner.
            </p>
          </section>

          <section
            id="support"
            className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 text-white shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              7. Contact Support
            </h2>

            <p className="mt-4 text-emerald-50">
              For complaints, refund requests, or assistance, customers may
              contact Kafalmart Customer Support through our official channels.
            </p>

            <div className="mt-6 flex flex-col gap-4 md:flex-row">

              <Link
                href="tel:918439051530"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
              >
                <Phone className="h-5 w-5" />
                Contact Support
              </Link>

              <a
                href="https://wa.me/918439051530"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Support
              </a>

            </div>

            <p className="mt-6 text-sm text-emerald-100">
              By placing an order through Kafalmart, customers acknowledge and
              agree to the terms of this Refund & Complaint Resolution Policy.
            </p>

          </section>

        </main>

      </div>
    </div>
  );
}