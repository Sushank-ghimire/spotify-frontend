import {
  ActivityBar,
  LeftSideBar,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/Export";
import AudioPlayer from "./components/AudioPlayer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = false;
  return (
    <div className="h-screen overflow-x-hidden w-screen bg-black text-white">
      <ResizablePanelGroup
        className="h-full flex-1 overflow-hidden p-2"
        direction="horizontal"
      >
        <AudioPlayer />
        {/* Left Sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={25}
        >
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="bg-black rounded-lg h-full w-2 transition-colors" />

        {/* Main Content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          {children}
        </ResizablePanel>

        <ResizableHandle className="bg-black rounded-lg h-full w-2 transition-colors" />

        {/* Right Sidebar */}
        <ResizablePanel
          defaultSize={20}
          maxSize={25}
          minSize={0}
          collapsedSize={0}
        >
          <ActivityBar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
