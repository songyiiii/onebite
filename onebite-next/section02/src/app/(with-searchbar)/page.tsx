// 클라이언트 컴포넌트로 설정하는 명령문
// 'use client';

import ClientComponent from '../../component/client-component';
import styles from './page.module.css';
import ServerComponent from '../../component/server-component';

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
