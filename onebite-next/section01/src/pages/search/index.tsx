import SearchableLayout from '@/components/SearchableLayout';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import BookItem from '@/components/BookItem';
import fetchBooks from '../lib/fetch-books';
import { BookData } from '@/types';
import Head from 'next/head';

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  // 쿼리스트링은 페이지의 경로에는 영향을 주지 않으므로
  // userouter로 router의 query라는 프로퍼티를 가져와서 사용하면 됨
  const router = useRouter();
  const q = router.query.q;

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, []);
  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
