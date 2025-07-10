import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-primary hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: July 10, 2025</p>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p className="mb-4">
            KeepTouch ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you use our mobile application.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Information You Provide</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Account Information</strong>: Email address and password when you create an account</li>
            <li><strong>Profile Information</strong>: Name and other optional profile details</li>
            <li><strong>Contact Information</strong>: Contact details you choose to add to the app (stored locally on your device only)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Information Collected Automatically</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Usage Data</strong>: How you interact with the app, features used, and frequency of use</li>
            <li><strong>Device Information</strong>: Device type, operating system, and app version</li>
            <li><strong>Crash Reports</strong>: Technical information if the app crashes (via Sentry)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Information We Do NOT Collect</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>We do NOT access or upload your device's contact list</li>
            <li>We do NOT store your contacts on our servers</li>
            <li>We do NOT share your contact information with third parties</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain the app's functionality</li>
            <li>Process your subscription payments</li>
            <li>Send you important updates about your account</li>
            <li>Improve our app and develop new features</li>
            <li>Provide customer support</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Storage and Security</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Local Storage</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact information is stored locally on your device using secure iOS storage</li>
            <li>This data is included in your device backups (iCloud or iTunes)</li>
            <li>We cannot access this locally stored data</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Cloud Storage</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information is stored securely on Supabase servers</li>
            <li>All data is encrypted in transit using HTTPS</li>
            <li>We implement industry-standard security measures</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
          <p className="mb-4">We use the following third-party services:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Supabase</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Provides authentication and database services</li>
            <li><a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Their privacy policy</a></li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Apple In-App Purchase</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Processes subscription payments</li>
            <li><a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple's privacy policy</a></li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Sentry</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Provides error tracking and crash reporting</li>
            <li><a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Their privacy policy</a></li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">OpenAI (for AI-generated messages)</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Processes message generation requests</li>
            <li>Contact names and context are sent to generate suggestions</li>
            <li><a href="https://openai.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Their privacy policy</a></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and associated data</li>
            <li>Export your data</li>
            <li>Opt-out of non-essential communications</li>
          </ul>
          <p className="mb-4">To exercise these rights, contact us at support@keeptouch.app</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p className="mb-4">
            KeepTouch is not intended for children under 13. We do not knowingly collect personal information 
            from children under 13.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries other than your own. 
            We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Account data is retained while your account is active</li>
            <li>If you delete your account, we delete your data within 30 days</li>
            <li>Some information may be retained for legal compliance</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
          <p className="mb-4">We may update this privacy policy from time to time. We will notify you of any changes by:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Posting the new policy in the app</li>
            <li>Updating the "Last updated" date</li>
            <li>Sending you an email (for significant changes)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">If you have questions about this privacy policy or our data practices, please contact us:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Email: support@keeptouch.app</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">California Privacy Rights</h2>
          <p className="mb-4">
            California residents have additional rights under the CCPA. Please contact us for more 
            information about exercising these rights.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">European Privacy Rights</h2>
          <p className="mb-4">
            If you are in the European Economic Area, you have additional rights under GDPR. 
            Please contact us for more information.
          </p>

          <p className="mt-8 font-semibold">
            By using KeepTouch, you consent to the collection and use of your information as described in this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}