export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-8 pb-5 text-center lg:px-20">{children}</section>
  );
}
