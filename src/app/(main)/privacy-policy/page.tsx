export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold text-text-main">Privacy Policy</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Last updated: {new Date().toLocaleDateString("en-IN")}
      </p>
      <div className="prose prose-invert mt-10 space-y-6 text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-text-main">1. Introduction</h2>
          <p>
            ABC Acropolis (&quot;we&quot;, &quot;our&quot;) respects your privacy. This policy describes how we collect, 
            use, and protect your information when you use our college club platform, including events, 
            newspaper, gallery, and related services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">2. Information we collect</h2>
          <p>
            We may collect your name, email, profile image (if you sign in with Google), and any information 
            you provide when registering for events, submitting contact forms, or commenting on content. 
            We also collect session and usage data to improve our services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">3. How we use your information</h2>
          <p>
            We use your information to operate the platform, manage event registrations, display your 
            profile where relevant, respond to inquiries, and send you updates about club activities 
            where you have opted in.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">4. Data sharing</h2>
          <p>
            We do not sell your personal data. We may share information with Acropolis Group of 
            Institutions for administrative and event-management purposes. We may disclose data if 
            required by law.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">5. Security</h2>
          <p>
            We use industry-standard measures to protect your data. Access to personal information 
            is restricted to authorised personnel and systems.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">6. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data. Contact us 
            via the Contact page for any privacy-related requests.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-text-main">7. Contact</h2>
          <p>
            For privacy questions, contact us through the Contact page or at the address provided 
            in the footer.
          </p>
        </section>
      </div>
    </div>
  );
}
