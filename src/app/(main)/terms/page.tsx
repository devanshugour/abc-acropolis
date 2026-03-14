export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="section-pad border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container max-w-3xl">
          <h1 className="hero-title">Terms of Use</h1>
          <p className="section-subtitle mt-2 text-sm">
        Last updated: {new Date().toLocaleDateString("en-IN")}
      </p>
      <div className="mt-10 space-y-6 text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-text-main">1. Acceptance</h2>
          <p>
            By using ABC Acropolis (&quot;the platform&quot;), you agree to these terms. The platform is 
            operated for the Acropolis college community — students, faculty, and club members.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">2. Use of the platform</h2>
          <p>
            You may use the platform to browse events, news, gallery, and contact the club. When you 
            register for events or submit content (e.g. comments), you agree to provide accurate 
            information and to use the service in a lawful and respectful manner.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">3. Conduct</h2>
          <p>
            You must not misuse the platform, harass others, post offensive content, or attempt to 
            gain unauthorised access. We reserve the right to suspend or terminate access for 
            violations.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">4. Intellectual property</h2>
          <p>
            Content on the platform (text, images, logos) is owned by ABC Acropolis or used with 
            permission. You may not copy or redistribute it for commercial use without consent.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">5. Disclaimer</h2>
          <p>
            The platform is provided &quot;as is&quot;. We do not guarantee uninterrupted or error-free service. 
            Event details and news are subject to change; please verify important information 
            independently.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">6. Changes</h2>
          <p>
            We may update these terms. Continued use after changes constitutes acceptance. For 
            questions, contact us via the Contact page.
          </p>
        </section>
      </div>
        </div>
      </section>
    </div>
  );
}
