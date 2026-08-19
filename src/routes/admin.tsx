import { createFileRoute, Link } from "@tanstack/react-router";
import AdminDashboard from "@/pages/admin";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  component: AdminRoute,
  head: () => ({
    meta: [
      { title: "BEC | Admin Dashboard" },
      { name: "description", content: "Manage BEC posts, reviews, events, members and messages." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel | Bangladesh Executive Chamber" },
      {
        property: "og:description",
        content: "Manage BEC posts, reviews, events, members and messages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AdminRoute() {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="py-32 text-center text-gray-500">Checking your access…</div>;
  }

  if (!session) {
    return (
      <div className="py-32 text-center">
        <h1 className="mb-3 text-2xl font-extrabold text-[#14202d]">Sign in required</h1>
        <p className="mb-6 text-gray-500">You need to sign in to access the BEC admin panel.</p>
        <Link to="/auth" className="bec-button bec-primary">
          Go to sign in
        </Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="py-32 text-center">
        <h1 className="mb-3 text-2xl font-extrabold text-[#14202d]">Access restricted</h1>
        <p className="text-gray-500">Your account does not have administrator permissions yet.</p>
      </div>
    );
  }

  return <AdminDashboard />;
}
