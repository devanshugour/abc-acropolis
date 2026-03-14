"use client";

import { useRef } from "react";
import { ContactForm } from "./ContactForm";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      <section className="section-pad-lg border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container text-center">
          <h1 className="hero-title">Contact Us</h1>
          <p className="section-subtitle mx-auto mt-6 max-w-2xl">
            Have a question, feedback, or want to get involved? We’d love to hear from you.
          </p>
          <button
            type="button"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary mt-8"
          >
            <Send className="h-4 w-4" />
            Send a message
          </button>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-container">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Get in touch</h2>
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
          <div ref={formRef} className="card p-6">
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
