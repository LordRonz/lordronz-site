import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
