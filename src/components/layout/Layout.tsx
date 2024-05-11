import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <Header />
      <AnimatePage>{children}</AnimatePage>
      <Footer />
    </div>
  );
};

export default Layout;
