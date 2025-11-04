export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Welcome to Notebook Pilot
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern web application built with Next.js 16, TypeScript, and Tailwind CSS
          </p>
        </div>

        

      </main>
    </div>
  );
}