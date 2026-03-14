"use client";

import { useRef } from "react";
import { ContactForm } from "./ContactForm";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      <section className="border-b border-accent-secondary/10 bg-bg-card/50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-text-main sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
            Have a question, feedback, or want to get involved? We’d love to hear from you.
          </p>
          <button
            type="button"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 font-semibold text-bg-main transition-colors hover:bg-accent-light"
          >
            <Send className="h-4 w-4" />
            Send a message
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-text-main">Get in touch</h2>
            <p className="mt-3 text-text-secondary">
              Reach out for event enquiries, partnerships, or general feedback. 
              We typically respond within 1–2 business days.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/20 text-accent-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-text-main">Campus</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Acropolis Group of Institutions, Bypass Road, Manglia Square, Manglia, 
                    Indore, Madhya Pradesh — 453771, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/20 text-accent-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-text-main">Email</p>
                  <a href="mailto:info@acropolis.in" className="mt-1 block text-sm text-accent-primary hover:text-accent-light">
                    info@acropolis.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/20 text-accent-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-text-main">Phone</p>
                  <p className="mt-1 text-sm text-text-secondary">0731-4730000 / 4730001</p>
                </div>
              </div>
            </div>
          </div>
          <div ref={formRef} className="rounded-2xl border border-accent-secondary/20 bg-bg-card p-6">
            <h2 className="text-xl font-semibold text-text-main">Send a message</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Fill out the form below and we’ll get back to you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
