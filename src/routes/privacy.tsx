import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#fbfcfb] min-h-screen">
      <div className="bec-container max-w-4xl">
        <h1 className="text-4xl font-black text-[#14202d] mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p className="lead text-xl text-gray-500 mb-8">
            This is a placeholder for the Privacy Policy of the Bangladesh Executive Chamber.
            Please provide the official legal copy.
          </p>
          <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[#14202d] mb-4">Data Collection & Usage</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us.
            </p>
            <h2 className="text-2xl font-bold text-[#14202d] mb-4 mt-8">Information Sharing</h2>
            <p className="mb-4">
              We may share the information we collect about you as described in this policy or as described at the time of collection or sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
