import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#fbfcfb] min-h-screen">
      <div className="bec-container max-w-4xl">
        <h1 className="text-4xl font-black text-[#14202d] mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p className="lead text-xl text-gray-500 mb-8">
            This is a placeholder for the Terms of Service for the Bangladesh Executive Chamber.
            Please provide the official legal copy.
          </p>
          <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#14202d] mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using our services, you agree to be bound by these Terms. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
            </p>
            <h2 className="text-2xl font-bold text-[#14202d] mb-4 mt-8">User Responsibilities</h2>
            <p className="mb-4">
              You are responsible for your use of the Services and for any content you provide, including compliance with applicable laws, rules, and regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
