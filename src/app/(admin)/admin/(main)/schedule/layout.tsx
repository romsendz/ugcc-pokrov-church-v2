export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-[20%] my-10 rounded-2xl bg-white p-8 shadow-lg">
      {children}
    </div>
  );
}
