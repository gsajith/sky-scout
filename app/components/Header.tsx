'use client';
import { FaPaperPlane } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../auth/AuthProvider';
import PrimaryButton from './PrimaryButton';
import Link from 'next/link';

const Header = () => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-row items-center container max-w-3xl justify-between p-4 lg:mb-8 xl:mb-8 2xl:mb-8 mt-4">
      <Link href="/">
        <div className="text-2xl font-bold flex flex-row">
          <FaPaperPlane className="mr-2" />
          Sky Scout
        </div>
      </Link>
      {logout && (
        <PrimaryButton
          type="button"
          onClick={() => logout()}
          className="sm:hidden xs:hidden 2xs:hidden"
        >
          <FiLogOut className="mr-2" />
          Logout
        </PrimaryButton>
      )}
    </div>
  );
};

export default Header;
