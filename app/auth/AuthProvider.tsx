'use client';
import { LoginResponse } from '@/helpers/bsky';
import { useLocalStorageState } from '@/helpers/hooks';
import { BskyAgent } from '@atproto/api';
import * as jwt from 'jsonwebtoken';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

type Auth = {
  agent: BskyAgent | null;
  authLoading: boolean;
  loginResponseData: LoginResponse | null;
  setLoginResponseData: ((value: LoginResponse | null) => void) | null;
  logout: (() => void) | null;
};
const AuthContext = createContext<Auth>({
  agent: null,
  authLoading: true,
  loginResponseData: null,
  setLoginResponseData: null,
  logout: null
});
export function AuthProvider({ children }: PropsWithChildren) {
  const agent = useRef<BskyAgent>(
    new BskyAgent({
      service: 'https://bsky.social'
    })
  ).current;

  // ****************************** AUTH ******************************
  const [authLoading, setAuthLoading] = useState(true);
  const [loginResponseData, setLoginResponseData] =
    useLocalStorageState<LoginResponse | null>('@loginResponseData', null);

  const accessJwt = !!loginResponseData?.accessJwt
    ? (jwt.decode(loginResponseData.accessJwt) as jwt.JwtPayload)
    : null;
  const loginExpiration = accessJwt?.exp;
  const timeUntilLoginExpire = loginExpiration
    ? loginExpiration * 1000 - Date.now()
    : null;

  useEffect(() => {
    if (timeUntilLoginExpire) {
      const timeout = setTimeout(() => {
        setLoginResponseData(null);
      }, Math.max(timeUntilLoginExpire, 0));

      return () => clearTimeout(timeout);
    }
  }, [timeUntilLoginExpire]);
  useEffect(() => {
    setAuthLoading(false);
    if (loginResponseData && !agent.session) {
      agent.resumeSession(loginResponseData);
    }
  }, [loginResponseData]);
  // ****************************** END AUTH ******************************

  return (
    <AuthContext.Provider
      value={{
        agent,
        authLoading,
        loginResponseData,
        setLoginResponseData,
        logout: loginResponseData ? () => setLoginResponseData(null) : null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
