import AppShowcaseManager from "@/components/admin/app-showcase-manager";

export default function AppShowcasePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">App Showcase Management</h1>
        <p className="text-gray-600">Customize the app showcase section with features and slider images</p>
      </div>

      <AppShowcaseManager />
    </div>
  );
} 