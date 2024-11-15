import { Outlet } from "@tanstack/react-router";
import {
  ResizablePanel,
  ResizablePanelGroup,
  Topbar,
} from "../components/Export";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen overflow-x-hidden w-screen bg-black text-white">
      <Topbar />
      <ResizablePanelGroup
        className="h-full flex-1 overflow-hidden p-2"
        direction="horizontal"
      >
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          Left Sidebar
        </ResizablePanel>

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {/* Right Sidebar */}
        <ResizablePanel
          defaultSize={20}
          maxSize={25}
          minSize={0}
          collapsedSize={0}
        >
          Friends Activity
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
