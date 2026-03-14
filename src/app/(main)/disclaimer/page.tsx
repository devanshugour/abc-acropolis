export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold text-text-main">Disclaimer</h1>
      <p className="mt-2 text-sm text-text-secondary">
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
  );
}
