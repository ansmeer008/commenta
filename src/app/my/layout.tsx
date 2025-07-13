export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">내정보</h1>
      </header>

      <main>{children}</main>

      <footer className="mt-16 text-center text-sm text-gray-500">© Commenta</footer>
    </div>
  );
}
