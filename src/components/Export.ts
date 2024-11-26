import { Button } from "./ui/button";
import Topbar from "./Topbar";
import SignedOutAuthButton from "./SignedOutAuthButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "./ui/resizable";
import ActivityBar from "../layouts/components/ActivityBar";
import LeftSideBar from "../layouts/components/LeftSideBar";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Loader from "./Loader";
import PlaylistSkeleton from "./skeletons/PlaylistSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MadeForYouSection from "./home/MadeForYouSection";
import FeaturedSection from "./home/FeaturedSection";
import FeaturedGridSkeleton from "./skeletons/FeatureGridSkeleton";
import UsersListSkeleton from "./skeletons/UserListSkeleton";
import SongsGridSkeleton from "./skeletons/SongsGridSkeleton";
import PlayButton from "./PlayButton";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Header from "./Admin/Header";
import DashboardStats from "./Admin/DashboardStats";
import { TabsContent as AdminTabs } from "./Admin/TabsContent";
import Songs from "./Admin/Songs";
import Album from "./Admin/Album";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "./ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import NotFoundPage from "./NotFound";

export {
  NotFoundPage,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
  Input,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Album,
  Songs,
  AdminTabs,
  DashboardStats,
  Header,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Slider,
  PlayButton,
  SongsGridSkeleton,
  UsersListSkeleton,
  FeaturedGridSkeleton,
  FeaturedSection,
  MadeForYouSection,
  PlaylistSkeleton,
  Loader,
  LeftSideBar,
  ActivityBar,
  Button,
  Topbar,
  SignedOutAuthButton,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
  ScrollArea,
  ScrollBar,
  Avatar,
  AvatarFallback,
  AvatarImage,
};
