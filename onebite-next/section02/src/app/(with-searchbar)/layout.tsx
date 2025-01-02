import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>임시 서치바</div>
      <div>{children}</div>
    </div>
  );
};
export default Layout;
