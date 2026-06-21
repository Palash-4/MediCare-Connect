import DashboardSidebar from "@/components/home/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}