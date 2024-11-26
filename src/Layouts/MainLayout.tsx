import { useEffect, useState } from "react";
import {
  ActivityBar,
  LeftSideBar,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/Export";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScreenChange = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleScreenChange();
    handleScreenChange();
    window.addEventListener("resize", handleScreenChange);
    return () => window.removeEventListener("resize", handleScreenChange);
  }, []);
  return (
    <div className="h-screen overflow-x-hidden w-screen bg-black text-white">
      <ResizablePanelGroup
        className="h-full flex-1 overflow-hidden p-2"
        direction="horizontal"
        id={"mainLayout"}
      >
        <AudioPlayer />
        {/* Left Sidebar */}
        <ResizablePanel
          id="leftSidebar"
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={25}
        >
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="bg-black rounded-lg h-full w-2 transition-colors" />

        {/* Main Content */}
        <ResizablePanel id="mainContent" defaultSize={isMobile ? 80 : 60}>
          {children}
        </ResizablePanel>

        {!isMobile && (
          <>
            {" "}
            <ResizableHandle className="bg-black rounded-lg h-full w-2 transition-colors" />
            {/* Right Sidebar */}
            <ResizablePanel
              id="activityBar"
              defaultSize={20}
              maxSize={25}
              minSize={0}
              collapsedSize={0}
            >
              <ActivityBar />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
      <PlaybackControls />
    </div>
  );
};

export default MainLayout;
