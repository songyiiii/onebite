import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneBook from '../lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // 대체, 대비책
    // 존재하지않는 paths값으로 url요청을 하면 어떻게 할것인지에대한 옵션
    // false: 404 Notfound 페이지 반환
    // blocking: 즉시 생성 (Like SSR)
    // true: SSR방식 + 데이터가 없는 폴백 상태의 페이지부터 반환 (데이터는 후속으로)
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  // 데이터가 없을경우 자동으로 404페이지로 리다이렉트 시켜줌
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <Head>
            <title>한입북스</title>
            <meta property="og:image" content="/thumbnail.png" />
            <meta property="og:title" content="한입북스" />
            <meta
              property="og:description"
              content="한입 북스에 등록된 도서들을 만나보세요"
            />
          </Head>
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
          className={style.cover_img_container}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
