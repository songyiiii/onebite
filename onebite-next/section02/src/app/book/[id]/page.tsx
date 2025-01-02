const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  return <div>book/{id} page입니다</div>;
};
export default Page;
