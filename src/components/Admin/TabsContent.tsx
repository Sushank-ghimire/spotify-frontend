import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent as Content,
  Songs,
  Album,
} from "../Export";
import Users from "./Users";

export const TabsContent = () => {
  return (
    <div className="w-[90vw] mx-auto p-2 rounded">
      <Tabs defaultValue="songs" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <Content value="songs">
          <Songs />
        </Content>
        <Content value="albums">
          <Album />
        </Content>
        <Content value="users">
          <Users />
        </Content>
      </Tabs>
    </div>
  );
};
