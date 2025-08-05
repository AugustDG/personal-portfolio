import Terminal from "../components/Terminal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-terminal-bg-light dark:bg-terminal-bg-dark p-2 md:p-4">
      <div className="w-full max-w-none mx-auto">
        <Terminal />
      </div>
    </main>
  );
}
