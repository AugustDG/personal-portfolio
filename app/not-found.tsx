export default function NotFound() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-pixel from-retro-magenta via-retro-yellow to-retro-cyan bg-linear-to-r bg-clip-text text-4xl text-transparent">
        404
      </h1>
      <p className="text-retro-cyan max-w-sm">
        That page drifted into the neon void. Use the navigation to get back.
      </p>
    </div>
  );
}
