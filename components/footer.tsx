export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c0c0f] py-6 text-gray-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-medium text-white">Rovic Joy Botones</p>
        <p>Full-stack software engineer · .NET · React Native · React</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
