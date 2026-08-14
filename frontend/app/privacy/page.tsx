import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Trash2,
  Phone,
  Mail,
  MapPin,
  FileText,
  UserCheck,
  Server,
  Share2,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | KafalMart",
  description:
    "KafalMart Privacy Policy explaining how we collect, use, store, and protect your personal data, and how to request account deletion.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              Privacy & Data Protection
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-lg text-emerald-100 leading-relaxed">
              At KafalMart, we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our web and mobile applications.
            </p>

            <p className="mt-3 text-xs text-emerald-200 font-medium">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Sticky Nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
              Contents
            </h3>

            <nav className="mt-4 space-y-2.5 text-sm">
              <a href="#overview" className="block text-slate-600 hover:text-emerald-600 font-medium transition">
                1. Overview & Scope
              </a>
              <a href="#collection" className="block text-slate-600 hover:text-emerald-600 font-medium transition">
                2. Information We Collect
              </a>
              <a href="#usage" className="block text-slate-600 hover:text-emerald-600 font-medium transition">
                3. How We Use Data
              </a>
              <a href="#sharing" className="block text-slate-600 hover:text-emerald-600 font-medium transition">
                4. Data Sharing & Partners
              </a>
              <a href="#security" className="block text-slate-600 hover:text-emerald-600 font-medium transition">
                5. Security & Storage
              </a>
              <a href="#deletion" className="block text-slate-600 hover:text-emerald-600 font-medium transition">
                6. Account Deletion & Rights
              </a>
              <a href="#contact" className="block text-slate-600 hover:text-emerald-600 font-medium transition">
                7. Contact Us
              </a>
            </nav>
          </div>
        </aside>

        {/* Content Body */}
        <main className="space-y-10 text-slate-700">
          {/* Section 1 */}
          <section id="overview" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Overview & Scope</h2>
            </div>

            <p className="mt-4 leading-relaxed">
              This Privacy Policy applies to the <span className="font-semibold text-slate-900">KafalMart</span> mobile application (iOS and Android), web platform, and related delivery services operated in Pithoragarh, Uttarakhand, India. By accessing or using our services, you consent to the practices described in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section id="collection" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Database className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-relaxed">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-emerald-600" /> Account & Profile Data
                </h3>
                <p>
                  When you register on KafalMart, we collect personal information including your full name, email address, phone number, and account credentials.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600" /> Delivery & Location Information
                </h3>
                <p>
                  To deliver groceries and restaurant orders accurately, we collect your delivery addresses and device location data (when permitted by your app settings).
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald-600" /> Transaction & Payment Details
                </h3>
                <p>
                  We store order history, items purchased, invoice totals, and payment confirmation statuses. Payments are processed securely via PCI-compliant payment gateways (UPI, Cards, Net Banking). KafalMart does not store raw credit card numbers or PINs.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
                  <Server className="h-4 w-4 text-emerald-600" /> Technical & Device Log Data
                </h3>
                <p>
                  We automatically gather IP address, device type, operating system, app version, crash reports, and performance analytics to ensure app stability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="usage" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. How We Use Your Information</h2>
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed">
              <li>To fulfill, deliver, and manage your grocery and food orders.</li>
              <li>To send order status updates, delivery notifications, and transactional receipts.</li>
              <li>To verify user identity and prevent unauthorized access or fraudulent activity.</li>
              <li>To provide customer support through our helpline and ticket system.</li>
              <li>To improve our app navigation, inventory availability, and overall user experience.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="sharing" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Share2 className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Data Sharing & Third Parties</h2>
            </div>

            <p className="mt-4 text-sm leading-relaxed">
              KafalMart does not sell your personal data. We share necessary data only with trusted partners required to complete your service:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-relaxed">
              <li><strong className="text-slate-900">Delivery Personnel:</strong> Your delivery address, recipient name, and phone number are shared with assigned delivery riders.</li>
              <li><strong className="text-slate-900">Restaurant & Merchant Partners:</strong> Order details are shared with merchants to prepare items.</li>
              <li><strong className="text-slate-900">Payment Service Providers:</strong> Encrypted transaction data is passed to authorized payment gateways for authorization.</li>
              <li><strong className="text-slate-900">Legal Compliance:</strong> We may disclose information if required by law or legal proceedings.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="security" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Security & Data Retention</h2>
            </div>

            <p className="mt-4 text-sm leading-relaxed">
              We employ strict security measures including SSL/TLS encryption for data transmission and access control for database storage. We retain personal data only for as long as your account remains active or as required by applicable tax, legal, and regulatory requirements.
            </p>
          </section>

          {/* Section 6 (Apple App Store Guideline 5.1.1(v) Compliance) */}
          <section id="deletion" className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Trash2 className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">6. Account Deletion & User Data Rights</h2>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-800">
              In accordance with Apple App Store policies and privacy laws, you have full control over your personal data:
            </p>

            <div className="mt-4 rounded-2xl bg-white p-6 border border-emerald-200 text-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-base">How to Request Account & Data Deletion:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                <li>
                  Visit our <Link href="/support" className="font-semibold text-emerald-600 hover:underline">Support Center (/support)</Link> and select <span className="font-semibold text-slate-900">"Account & Data Deletion Request"</span> in the support form.
                </li>
                <li>
                  Alternatively, send an email to <a href="mailto:order.kafalmart@gmail.com" className="font-semibold text-emerald-600 hover:underline">order.kafalmart@gmail.com</a> with the subject line <span className="font-semibold text-slate-900">"Account Deletion Request"</span> including your registered phone number or email.
                </li>
              </ol>

              <div className="mt-3 text-xs text-slate-500 border-t border-slate-100 pt-3">
                Upon verification, your account, personal details, delivery addresses, and saved data will be permanently deleted from our servers within 48 hours, except for anonymized legal financial records retained per regulatory requirements.
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="contact" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">7. Contact Information</h2>
            </div>

            <p className="mt-4 text-sm leading-relaxed">
              If you have any questions, concerns, or privacy grievances, please reach out to our privacy team:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-2xl border border-slate-200 p-4">
                <span className="block text-xs font-semibold text-slate-400 uppercase">Email</span>
                <a href="mailto:order.kafalmart@gmail.com" className="font-semibold text-emerald-600 hover:underline break-all">
                  order.kafalmart@gmail.com
                </a>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <span className="block text-xs font-semibold text-slate-400 uppercase">Phone</span>
                <a href="tel:+918439051530" className="font-semibold text-emerald-600 hover:underline">
                  +91 8439051530
                </a>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <span className="block text-xs font-semibold text-slate-400 uppercase">Address</span>
                <span className="font-semibold text-slate-800">
                  Pithoragarh, Uttarakhand, India
                </span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
