import { Header } from "../../components";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
