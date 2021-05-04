import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signout } from "./userSlice";

const Signout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signout());
  });
  return <div>Signing out...</div>;
};

export default Signout;
