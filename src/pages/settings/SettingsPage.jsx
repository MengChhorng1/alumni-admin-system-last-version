import PageTransition from "../../components/animations/PageTransition";
import { useTheme } from "../../context/ThemeContext";
export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  return (
    <PageTransition>
      <h1 className="mb-2 text-3xl font-bold">Settings</h1>
      <p className="mb-6 text-slate-500">
        Profile, security, theme and notification settings.
      </p>
      <div className="glass max-w-2xl rounded-3xl p-6">
        <h2 className="font-semibold">Theme Settings</h2>
        <p className="mt-2 text-sm text-slate-500">Current theme: {theme}</p>
        <button onClick={toggleTheme} className="btn-primary mt-4">
          Toggle Dark / Light Mode
        </button>
      </div>
    </PageTransition>
  );
}
