import { Home, DollarSign, User, Plus, GraduationCap} from "lucide-react";
import { Button } from "./ui/button";
import { ScreenContext } from "@/context/ScreenContext";
import { useContext } from "react";
export function Navbar() {
  const { setCurrentScreen } = useContext(ScreenContext);
  return (
    <div className="hidden lg:flex  flex-col justify-between w-16 bg-zinc-800 border-r border-zinc-700">
      <div>
        <div className="p-4">
          <h1 className="text-xl font-bold text-white">Brand</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-full my-4"
          onClick={() => setCurrentScreen("videofeed")}
        >
          <Home size={24} />
          <span className="sr-only">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="w-full my-4">
          <Plus size={24} />
          <span className="sr-only">Recent</span>
        </Button>
        <Button variant="ghost" size="icon" className="w-full my-4">
          <DollarSign size={24} />
          <span className="sr-only">Earnings</span>
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="w-full my-4"
        onClick={() => {
          setCurrentScreen("profile");
        }}
      >
        <User size={24} />
        <span className="sr-only">Profile</span>
      </Button>
    </div>
  );
}

export function BottomNav() {
  const { setCurrentScreen } = useContext(ScreenContext);
  return (
    <div className="lg:hidden  fixed bottom-0 left-0 right-0 h-16 bg-zinc-800 border-t border-zinc-700 flex items-center justify-around">
      <Button
        variant="ghost"
        size="icon"
        // onClick={() => setCurrentScreen("videofeed")}
        onClick={() => {
          setCurrentScreen("videofeed");
          window.location.hash = "#videofeed";
        }}
      >
        <Home className="text-white" size={24} />
        <span className="sr-only">Home</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        // onClick={() => setCurrentScreen("upload")}
        onClick={() => {
          setCurrentScreen("upload");
          window.location.hash = "#upload";
        }}
      >
        <Plus className="text-white" size={24} />
        <span className="sr-only">Recent</span>
      </Button>
      {/* <Button
        variant="ghost"
        size="icon"
        // onClick={() => setCurrentScreen("market")}
        onClick={() => {
          setCurrentScreen("market");
          window.location.hash = "#market";
          console.log("market button pressed");
        }}
      >
        <DollarSign className="text-white" size={24} />
        <span className="sr-only">Earnings</span>
      </Button> */}
      <Button
        variant="ghost"
        size="icon"
        // onClick={() => setCurrentScreen("market")}
        onClick={() => {
          setCurrentScreen("course");
          window.location.hash = "#course";
          console.log("course button pressed");
        }}
      >
        <GraduationCap className="text-white" size={24} />
        <span className="sr-only">Course</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setCurrentScreen("profile");
          window.location.hash = "#profile";
          console.log("profile button pressed");
        }}
      >
        <User className="text-white" size={24} />
        <span className="sr-only">Profile</span>
      </Button>
    </div>
  );
}
