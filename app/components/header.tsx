import { FaPaperPlane } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import PrimaryButton from './PrimaryButton';
import { useAuth } from '../AuthProvider';

const Header = () => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-row items-center container max-w-3xl justify-between p-4 lg:mb-24 xl:mb-24 2xl:mb-24 mt-4">
      <div className="text-2xl font-bold flex flex-row">
        <FaPaperPlane className="mr-2" />
        Sky Scout
      </div>
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
