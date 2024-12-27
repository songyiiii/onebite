import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from './SearchableLayout.module.css'

const SearchableLayout = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // react에서 발생한 change이벤트 html의 Input타입에서 발생한 이벤트타입이다 라는 뜻
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) {
      return;
    }
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const q = router.query.q as string;
  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
};
export default SearchableLayout;
