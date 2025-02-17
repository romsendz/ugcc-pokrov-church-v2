export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-[35%] my-[5%]">{children}</div>;
}
