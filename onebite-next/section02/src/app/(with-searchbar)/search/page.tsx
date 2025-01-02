import ClientComponent from '@/component/client-component';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  return (
    <div>
      search page: {query}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
};
export default Page;
