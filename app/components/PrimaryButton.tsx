import { ComponentPropsWithoutRef } from 'react';
const PrimaryButton = ({
  type,
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      type={type}
      className={
        'bg-[#474887] hover:bg-[#5C5D9F] text-white p-2 rounded flex flex-row items-center justify-center px-4 uppercase font-bold' +
        ' ' +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
