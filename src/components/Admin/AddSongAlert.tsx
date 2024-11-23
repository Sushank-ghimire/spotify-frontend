import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  Input,
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "../Export";
import { Loader, Plus, Upload } from "lucide-react";
import { useMusicStore } from "../../stores/useMusicStore";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

type FormDataType = {
  title: string;
  artist: string;
  duration: number;
  album: string | null;
};

type FormDataFiles = {
  audioFile: File | null;
  imageFile: File | null;
};

const AddSongDialogue = () => {
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { albums, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    artist: "",
    duration: 0,
    album: "",
  });

  const [formFiles, setFormFiles] = useState<FormDataFiles>({
    audioFile: null,
    imageFile: null,
  });

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const audioInputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async () => {
    setIsLoading(true);
    try {
      if (!formFiles.audioFile || !formFiles.imageFile) {
        return toast.error("Image and audio both files are required.");
      }
      const formDta = new FormData();
      formDta.append("title", formData.title);
      formDta.append("artist", formData.artist);
      if (formData.album !== "none" && formData.album) {
        formDta.append("albumId", formData.album!);
      }
      formDta.append("duration", formData.duration.toString());
      formDta.append("imageFile", formFiles.imageFile);
      formDta.append("audioFile", formFiles.audioFile);

      // Sending Data to the backend
      const { data } = await axiosInstance.post(
        "/admin/songs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.status === 201) {
        setFormData({
          album: "",
          title: "",
          duration: 0,
          artist: "",
        });
        setFormFiles({
          audioFile: null,
          imageFile: null,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error while adding song");
      }
      toast.error("Error while adding song");
    }
  };

  return (
    <AlertDialog open={isDialogueOpen} onOpenChange={setIsDialogueOpen}>
      <AlertDialogTrigger>
        <Button className="text-white">
          <Plus className="font-bold" /> Add songs
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-900 border-zinc-700 overflow-auto max-h-[70vh]">
        <AlertDialogHeader>
          <AlertDialogTitle>Add new song</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new song to your music library
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <input
            required
            className="cursor-pointer"
            hidden
            onChange={(e) =>
              setFormFiles((prev) => ({
                ...prev,
                audioFile: e.target.files![0],
              }))
            }
            type="file"
            ref={audioInputRef}
            accept="audio/*"
          />

          <input
            required
            className="cursor-pointer"
            hidden
            onChange={(e) =>
              setFormFiles((prev) => ({
                ...prev,
                imageFile: e.target.files![0],
              }))
            }
            type="file"
            ref={imageInputRef}
            accept="image/*"
          />

          {/* image upload area */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {formFiles.imageFile ? (
                <div className="space-y-2">
                  <div className="text-emerald-500">Image selected:</div>
                  <div className="text-xs text-zinc-400">
                    {formFiles.imageFile.name.slice(0, 20)}
                  </div>
                  <div>{Math.round(formFiles.imageFile.size / 1024)} kb</div>
                </div>
              ) : (
                <div>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload song image
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* Audio Input Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
                className="w-full"
              >
                {formFiles.audioFile ? (
                  <div className="flex gap-2 flex-col">
                    {formFiles.audioFile.name.slice(0, 20)}
                    <span>
                      {Math.round(formFiles.audioFile.size / 1024)} kb
                    </span>
                  </div>
                ) : (
                  "Choose Audio File"
                )}
              </Button>
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          {/* Artist Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              required
              value={formData.artist}
              onChange={(e) =>
                setFormData({ ...formData, artist: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          {/* Duration Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <Input
              required
              value={formData.duration}
              min={0}
              type="number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              className="bg-zinc-800 border-zinc-700 appearance-none"
            />
          </div>

          {/* Select Album */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>

            <Select
              value={formData.album!}
              onValueChange={(value) =>
                setFormData({ ...formData, album: value })
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="none">No Album (Single)</SelectItem>

                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDialogueOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            type="submit"
            onClick={handleFormSubmit}
            className="text-white"
          >
            {isLoading ? (
              <Loader className="text-white animate-spin size-4" />
            ) : (
              "Add Song"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddSongDialogue;
