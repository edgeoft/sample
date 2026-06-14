import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listBookings, updateBookingStatus } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/toaster";
import { bookingStatuses, siteConfig } from "@/config/site";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: `Admin Dashboard | ${siteConfig.name}` },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const fetchBookings = useServerFn(listBookings);
  const updateStatus = useServerFn(updateBookingStatus);
  const qc = useQueryClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; status: string }) =>
      updateStatus({ data: vars }),
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Bookings Dashboard</h1>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
          <button
            onClick={signOut}
            className="rounded-md border border-input px-3 py-1.5 text-sm hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {error && (
          <p className="text-sm text-destructive">
            {(error as Error).message.includes("Forbidden")
              ? "Your account does not have admin access. Ask an existing admin to grant you the admin role."
              : (error as Error).message}
          </p>
        )}
        {data && (
          <div className="overflow-x-auto border border-border rounded-lg bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Preferred</th>
                  <th className="px-4 py-3 font-medium">Address</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.bookings.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      No bookings yet.
                    </td>
                  </tr>
                )}
                {data.bookings.map((b) => (
                  <tr key={b.id} className="border-t border-border align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(b.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{b.name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${b.phone}`} className="text-primary hover:underline">
                        {b.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">{b.email ?? "—"}</td>
                    <td className="px-4 py-3">{b.service_type}</td>
                    <td className="px-4 py-3">{b.preferred_date ?? "—"}</td>
                    <td className="px-4 py-3 max-w-xs">{b.address ?? "—"}</td>
                    <td className="px-4 py-3 max-w-xs text-xs">{b.notes ?? "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        disabled={mutation.isPending}
                        onChange={(e) =>
                          mutation.mutate({ id: b.id, status: e.target.value })
                        }
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                      >
                        {bookingStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
