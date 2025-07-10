import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        <p className="text-muted-foreground mb-8">Last updated: July 10, 2025</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By downloading, installing, or using KeepTouch ("the App"), you agree to be bound by these Terms of Use. 
            If you do not agree to these terms, please do not use the App.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-4">
            KeepTouch is a relationship management app that helps users maintain connections with important people 
            in their lives through reminders and AI-generated message suggestions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Subscription Services</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Auto-Renewable Subscriptions</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Monthly Premium</strong>: $2.99/month</li>
            <li><strong>Yearly Premium</strong>: $12.99/year (save 64%)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Features Include:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Unlimited contacts</li>
            <li>Unlimited AI-generated messages</li>
            <li>Advanced reminder settings</li>
            <li>Priority support</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Billing</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Payment will be charged to your Apple ID account at confirmation of purchase</li>
            <li>Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period</li>
            <li>Account will be charged for renewal within 24 hours prior to the end of the current period</li>
            <li>Subscriptions may be managed and auto-renewal may be turned off by going to your Account Settings after purchase</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Privacy and Data</h2>
          <p className="mb-4">
            Your privacy is important to us. Please review our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, 
            which explains how we collect, use, and protect your information.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Contact Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact information is stored locally on your device</li>
            <li>We do not upload or store your contacts on our servers</li>
            <li>You maintain full control over which contacts to add to the app</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Conduct</h2>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the App for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the App or its systems</li>
            <li>Interfere with or disrupt the App's functionality</li>
            <li>Use the App to send spam or unwanted communications</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
          <p className="mb-4">
            All content, features, and functionality of the App are owned by KeepTouch and are protected by 
            international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimers</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>The App is provided "as is" without warranties of any kind</li>
            <li>We do not guarantee that the App will be error-free or uninterrupted</li>
            <li>AI-generated messages are suggestions only; you are responsible for all communications sent</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by law, KeepTouch shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your use of the App.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any material changes 
            through the App or via email.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your access to the App immediately, without prior notice, for any reason, 
            including breach of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Information</h2>
          <p className="mb-4">If you have questions about these Terms, please contact us at:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Email: support@keeptouch.app</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed by the laws of the United States and the State of New York, 
            without regard to its conflict of law provisions.
          </p>

          <p className="mt-8 font-semibold">
            By using KeepTouch, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
}