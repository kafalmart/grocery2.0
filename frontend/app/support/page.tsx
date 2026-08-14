"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  Send,
  MessageSquare,
  ShieldCheck,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Clock,
  FileText,
  ExternalLink,
  ShoppingBag,
  CreditCard,
  AlertCircle,
} from "lucide-react";

export default function SupportPage() {
  // Support Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "General Inquiry",
      subject: "",
      message: "",
    });
    setSubmitted(false);
  };

  const faqs = [
    {
      question: "How do I track my order or delivery status?",
      answer:
        "You can track your order in real-time by going to the 'Orders' section in the KafalMart app or website. Alternatively, you can contact our phone support with your Order ID for immediate assistance.",
      icon: ShoppingBag,
    },
    {
      question: "What is the Refund & Complaint policy?",
      answer:
        "If you received damaged, missing, or incorrect items, you can request a refund or replacement within 24 hours of delivery. Please review our complete Refund Policy for full eligibility guidelines.",
      link: "/policy",
      linkText: "Read Refund Policy",
      icon: CreditCard,
    },
    {
      question: "How can I request Account Deletion or Data Removal?",
      answer:
        "To request permanent deletion of your KafalMart account and associated personal data, select 'Account & Data Deletion Request' in the support form above, or send an email directly to order.kafalmart@gmail.com with your registered email and phone number. Our privacy team processes all deletion requests within 48 hours in compliance with privacy regulations.",
      icon: Trash2,
    },
    {
      question: "What areas does KafalMart deliver to?",
      answer:
        "We currently deliver fresh groceries, food, and daily essentials across Pithoragarh, Uttarakhand and surrounding local zones. Enter your location at checkout to see exact delivery times.",
      icon: MapPin,
    },
    {
      question: "What are your customer support working hours?",
      answer:
        "Our customer helpline (+91 8439051530) is active daily from 8:00 AM to 9:00 PM IST. Email support (order.kafalmart@gmail.com) is monitored 24/7.",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <HelpCircle className="h-4 w-4" />
              App & Customer Support
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
              How can we help you today?
            </h1>

            <p className="mt-4 text-lg text-emerald-100 leading-relaxed">
              Have a question about your order, delivery, account, or need help with the KafalMart app? We're here to assist you every step of the way.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-emerald-100">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-300" /> Daily Support: 8:00 AM - 9:00 PM IST
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-300" /> Fast Resolution Guaranteed
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Quick Contact Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {/* Phone Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Phone Support</h3>
                <p className="text-xs text-slate-500">Speak directly with us</p>
              </div>
            </div>
            <p className="mt-4 text-slate-600 text-sm">
              Call our support helpline for urgent order updates or delivery queries.
            </p>
            <a
              href="tel:+918439051530"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              +91 8439051530
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Email Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email Us</h3>
                <p className="text-xs text-slate-500">24/7 Email assistance</p>
              </div>
            </div>
            <p className="mt-4 text-slate-600 text-sm">
              Send us your detailed inquiries, order receipts, or feature requests.
            </p>
            <a
              href="mailto:order.kafalmart@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 break-all"
            >
              order.kafalmart@gmail.com
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>

          {/* Address Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Headquarters</h3>
                <p className="text-xs text-slate-500">Main Operating Hub</p>
              </div>
            </div>
            <p className="mt-4 text-slate-600 text-sm">
              KafalMart Operations Center, Pithoragarh, Uttarakhand, India.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-slate-500">
              Pithoragarh, Uttarakhand
            </span>
          </div>
        </div>

        {/* Main Content Grid: Form + FAQs */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Interactive Support Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Send Support Ticket</h2>
                <p className="text-xs text-slate-500">We usually respond within a few hours</p>
              </div>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-emerald-50 p-6 text-center border border-emerald-200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Ticket Received!</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. Your support request regarding <span className="font-semibold text-slate-800">{formData.category}</span> has been logged. Our support team will reach out to you shortly at <span className="font-semibold text-slate-800">{formData.email}</span>.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Issue Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order & Delivery Issue">Order & Delivery Issue</option>
                    <option value="Refund & Payment Query">Refund & Payment Query</option>
                    <option value="App Bug / Technical Issue">App Bug / Technical Issue</option>
                    <option value="Account & Data Deletion Request">Account & Data Deletion Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your question"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please describe your issue, including any Order ID if applicable..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition disabled:opacity-50"
                >
                  {submitting ? (
                    "Submitting Ticket..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Support Ticket
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400 mt-2">
                  Need quick answers? Check our Frequently Asked Questions on the right.
                </p>
              </form>
            )}
          </div>

          {/* FAQ Accordion Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="mt-1 text-sm text-slate-500">
                Find quick answers to common questions about KafalMart service, payments, and account controls.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const IconComponent = faq.icon;
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-50/50 transition"
                    >
                      <span className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-emerald-600 shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                        <p>{faq.answer}</p>
                        {faq.link && (
                          <div className="mt-3">
                            <Link
                              href={faq.link}
                              className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700 text-xs uppercase tracking-wider"
                            >
                              {faq.linkText} <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* App Store Compliance Box: Account & Data Deletion Notice */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900">Account & Personal Data Privacy</h4>
                  <p className="mt-1 text-xs text-amber-800 leading-relaxed">
                    KafalMart respects your privacy choices. Under Apple App Store guidelines, users have the right to request deletion of their user profile and associated personal data at any time. Submit your request using the form on this page or email <span className="font-semibold text-amber-950">order.kafalmart@gmail.com</span> with subject line <span className="font-semibold text-amber-950">"Account Deletion Request"</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Need Legal Information?</h4>
                <p className="text-xs text-slate-500">Read our Terms of Service and Complaint Policies</p>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-emerald-600">
                <Link href="/terms" className="hover:underline flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" /> Terms & Conditions
                </Link>
                <Link href="/policy" className="hover:underline flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
