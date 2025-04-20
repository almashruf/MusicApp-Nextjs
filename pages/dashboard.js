// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import AudioPlayer from "../components/AudioPlayer";
import { Menu, X, Play, Pause, Moon, Sun, Wind, CloudRain } from "lucide-react";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState("focus");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const soundOptions = [
    { id: "focus", name: "Focus", icon: <Sun className="w-6 h-6" /> },
    { id: "sleep", name: "Sleep", icon: <Moon className="w-6 h-6" /> },
    { id: "relax", name: "Relax", icon: <Wind className="w-6 h-6" /> },
    { id: "rain", name: "Rain", icon: <CloudRain className="w-6 h-6" /> },
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSoundChange = (soundId) => {
    setActiveSound(soundId);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // This will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Dashboard - Endel</title>
        <meta name="description" content="Your personalized soundscapes dashboard" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-red-600">endel</span>
          </Link>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hello, {user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Soundscapes</h1>

          {/* Sound Player */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm mb-12">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Now Playing: {activeSound.charAt(0).toUpperCase() + activeSound.slice(1)}
              </h2>
              
              {/* Sound Options */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {soundOptions.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => handleSoundChange(sound.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition shadow-sm ${
                      activeSound === sound.id
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-red-200"
                    }`}
                  >
                    {sound.icon}
                    <span>{sound.name}</span>
                  </button>
                ))}
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition mb-8"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>

              {/* Visualizer */}
              <div className="w-full h-24 bg-gradient-to-r from-red-50 via-red-100 to-red-50 rounded-xl overflow-hidden relative shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-end h-16 gap-1">
                    {Array.from({ length: 32 }).map((_, i) => {
                      const height = isPlaying ? Math.floor(Math.random() * 64) + 4 : 4
                      return (
                        <div
                          key={i}
                          className="w-1 bg-red-500/60 rounded-full transition-all duration-150"
                          style={{
                            height: `${height}px`,
                            opacity: isPlaying ? 0.6 + Math.random() * 0.4 : 0.3,
                          }}
                        ></div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Audio Player (Hidden but functional) */}
              <div className="hidden">
                <AudioPlayer isPlaying={isPlaying} soundType={activeSound} audioSrc={`/audio/sample.mp3`} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}