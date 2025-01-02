import { ReactNode } from 'react';
import Searchbar from '../../component/searchbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Searchbar />
      <div>{children}</div>
    </div>
  );
};
export default Layout;
