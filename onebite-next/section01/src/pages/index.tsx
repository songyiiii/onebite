// CSS Module
// 페이지별로 className이 겹쳐서 발생하는 오류를 자동으로 유니크한 클래스네임으로 변경해주어서 막아줌
// className이 중복으로 겹치는걸 원천 차단함
import SearchableLayout from '@/components/SearchableLayout';
import style from './index.module.css';
import { ReactNode } from 'react';
import BookItem from '@/components/BookItem';
import { InferGetStaticPropsType } from 'next';
import fetchBooks from './lib/fetch-books';
import fetchRandomBooks from './lib/fetch-random-books';
import Head from 'next/head';

// 약속된 이름의 함수를 만들어서 내보내면 해당 page는 SSR로 동작되도록 설정이 됨
// export const getServerSideProps = async () => {
//   // 사전 렌더링 과정에서 컴포넌트보다 먼저 실행되어서 컴포넌트에 필요한 데이터를 불러오는 함수
//   // 사전 렌더링하는 과정에서 딱 한번만 실행 됨
//   // 서버 측에서 실행됨

//   // 직렬방식 (순서대로 데이터를 불러옴)
//   // const allBooks = await fetchBooks();
//   // const recoBooks = await fetchRandomBooks();

//   // 병렬방식 (순서대로가 아닌 동시에 데이터를 불러옴)
//   // 조금 더 빠르게 페이지가 렌더링됨
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

// SSG
export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // ISR로 변경
    // revalidate: 재검증하다 라는 뜻
    // 기본적으로는 정적으로 제공하지만 일정시간이 지나면 업데이트됨
    // revalidate: 3,  //시간기반
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content='한입북스'/>
        <meta property='og:description' content='한입 북스에 등록된 도서들을 만나보세요'/>
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
