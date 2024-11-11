import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = (props: Props) => {
  return <div className="h-screen w-screen ">{props.children}</div>;
};

export default MainLayout;
