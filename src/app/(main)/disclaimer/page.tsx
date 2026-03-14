export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      <section className="section-pad border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container max-w-3xl">
          <h1 className="hero-title">Disclaimer</h1>
          <p className="section-subtitle mt-2 text-sm">
        Last updated: {new Date().toLocaleDateString("en-IN")}
      </p>
      <div className="mt-10 space-y-6 text-text-secondary">
        <p>
          The information on ABC Acropolis is for general purposes only. We strive to keep event 
          dates, venues, and news accurate but do not guarantee completeness or timeliness. 
          Always confirm with the organisers or college authorities for official decisions.
        </p>
        <p>
          Views expressed in articles, comments, or user-generated content are those of the 
          authors and do not necessarily reflect the official position of ABC Acropolis or 
          Acropolis Group of Institutions.
        </p>
        <p>
          We are not responsible for external links or third-party content. Use of the platform 
          is at your own risk. For official academic or administrative matters, please contact 
          the institution directly.
        </p>
        </div>
        </div>
      </section>
    </div>
  );
}
