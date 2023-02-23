import { Typography } from 'antd';
import { PropsWithChildren } from 'react';

import Divider from '../Divider';

const { Title } = Typography;

interface LayoutProps extends PropsWithChildren {
  title: string;
}

const Layout = ({ children, title }: LayoutProps) => (
  <div className="m-auto flex max-w-screen-lg flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
    <div className="w-full">
      <Title className="text-2xl">{title}</Title>
      <Divider />
    </div>
    <div className="w-full">{children}</div>
  </div>
);

export default Layout;
