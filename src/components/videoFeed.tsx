import { useState, useRef, useEffect } from "react";
import { Heart, Share2 } from "lucide-react";
import { useVideos } from "../hooks/useVideos";
import { Video, User } from "../types/user";
import { BottomNav, Navbar } from "./navbar";
// import { useStore } from "../store/store";

export default function VideoFeed() {
  const { videos, loading, refetch: fetchVideos, error } = useVideos();
  const [localVideos, setLocalVideos] = useState(videos);
  // const {videos, loading, error, fetchPlayerProfile} = useStore()
  // @ts-ignore
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setLocalVideos(videos);
  }, [videos]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && !loading) {
      fetchVideos();
    }
  };

  const handleLike = (videoId: string, liked: boolean) => {
    setLocalVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? { ...video, likes: video.likes + (liked ? 1 : -1) }
          : video,
      ),
    );
  };

  const onProfileClick = (user: User) => {
    setSelectedUser(user);
  };

  if (loading && !localVideos.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!localVideos.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        No videos found
      </div>
    );
  }
  localVideos.map((video) => console.log(video));
  return (
    <>
      <div className="h-screen overflow-y-auto" onScroll={handleScroll}>
        {localVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onLike={handleLike}
            onProfileClick={onProfileClick}
          />
        ))}
        {loading && (
          <div className="flex justify-center p-4">Loading more...</div>
        )}
      </div>
      <Navbar />
    </>
  );
}

function VideoCard({
  video,
  onLike,
  onProfileClick,
}: {
  video: Video;
  onLike: (id: string, liked: boolean) => void;
  onProfileClick: (user: User) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(video.id, !isLiked);
  };

  return (
    <div>
      <Navbar />
      <div className="relative h-screen w-full bg-black snap-start flex items-center justify-center">
        <video
          ref={videoRef}
          className="h-full w-full object-contain md:max-w-[400px] md:max-h-[calc(100vh-80px)]"
          loop
          muted
          playsInline
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute bottom-20 left-4 right-4">
          <p className="text-white text-sm mb-2">{video.description}</p>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center">
          <button
            onClick={() => onProfileClick(video.user)}
            className="flex items-center"
          >
            <div className="relative">
              <img
                src={video.user.profileImage || "/ripple.png"}
                alt={`${video.user.username}'s profile`}
                className="h-12 w-12 rounded-full border-2 border-white"
              />
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                {video.user.tier}
              </div>
            </div>
            <span className="ml-2 text-lg font-semibold text-white">
              @{video.user.username}
            </span>
          </button>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-4">
          <button></button>
          <button className="flex flex-col items-center" onClick={handleLike}>
            <Heart
              className={`h-8 w-8 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
            />
            <span className="text-sm text-white">
              {video.likes + (isLiked ? 1 : 0)}
            </span>
          </button>
          {/* <button className="flex flex-col items-center"> */}
          {/*   <MessageCircle className="h-8 w-8 text-white" /> */}
          {/*   <span className="text-sm text-white">{video.comments}</span> */}
          {/* </button> */}
          <button className="flex flex-col items-center">
            <Share2 className="h-8 w-8 text-white" />
            <span className="text-sm text-white">Share</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
