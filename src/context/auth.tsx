import {
  Accessor,
  ParentProps,
  Setter,
  createContext,
  createSignal,
} from "solid-js";
import { User } from "../models/user";

const providerValue = () => {
  const [user, setUser] = createSignal<Partial<User>>({});

  return { setUser, user };
};

export const AuthContext = createContext<{
  setUser: Setter<Partial<User>>;
  user: Accessor<Partial<User>>;
}>(providerValue());

export const AuthProvider = (props: ParentProps) => (
  <AuthContext.Provider value={providerValue()}>
    {props.children}
  </AuthContext.Provider>
);
