const SplitImage = ({ children }: { children: React.ReactNode }) => {
  return <div className='grid grid-cols-2 items-start gap-4'>{children}</div>;
};

export const Split = ({ children }: { children: React.ReactNode }) => {
  return <div className='mb-0! flex flex-col space-y-4'>{children}</div>;
};

export default SplitImage;
