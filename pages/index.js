"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import AudioPlayer from "../components/AudioPlayer"
import { Menu, X, Play, Pause, Download, Moon, Sun, Wind, CloudRain, Award, ArrowRight } from "lucide-react"

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSound, setActiveSound] = useState("focus")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const soundOptions = [
    { id: "focus", name: "Focus", icon: <Sun className="w-6 h-6" /> },
    { id: "sleep", name: "Sleep", icon: <Moon className="w-6 h-6" /> },
    { id: "relax", name: "Relax", icon: <Wind className="w-6 h-6" /> },
    { id: "rain", name: "Rain", icon: <CloudRain className="w-6 h-6" /> },
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSoundChange = (soundId) => {
    setActiveSound(soundId)
    if (!isPlaying) setIsPlaying(true)
  }

  const handleSignUp = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>Endel - Personalized Soundscapes</title>
        <meta name="description" content="Personalized soundscapes to help you focus, relax, and sleep." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-red-600">endel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-red-600 transition">
              Features
            </Link>
            <Link href="#science" className="text-gray-700 hover:text-red-600 transition">
              Science
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-red-600 transition">
              Pricing
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-red-600 transition">
              Log in
            </Link>
            <button
              onClick={handleSignUp}
              className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition"
            >
              Sign up free
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link href="#features" className="text-gray-700 hover:text-red-600 transition py-2">
                Features
              </Link>
              <Link href="#science" className="text-gray-700 hover:text-red-600 transition py-2">
                Science
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-red-600 transition py-2">
                Pricing
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-red-600 transition py-2">
                Log in
              </Link>
              <button
                onClick={handleSignUp}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition"
              >
                Sign up free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50 to-white/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,rgba(255,255,255,0)_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">Functional Sound for Your Mind</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-10">
              Personalized soundscapes to help you focus, relax, and sleep better.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
              <button
                onClick={handleSignUp}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>Try for free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlay}
                className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? "Pause" : "Listen"}</span>
              </button>
            </div>

            {/* Sound Options */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
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

            {/* Audio Player (Hidden but functional) */}
            <div className="hidden">
              <AudioPlayer isPlaying={isPlaying} soundType={activeSound} audioSrc={`/audio/sample.mp3`} />
            </div>

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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Personalized Sound Environment</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Endel creates personalized soundscapes that adapt to your needs in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Focus</h3>
              <p className="text-gray-600">
                Boost your productivity with soundscapes designed to help you concentrate and stay in the flow.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Moon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Sleep</h3>
              <p className="text-gray-600">
                Fall asleep faster and sleep better with scientifically proven sound environments.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Wind className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Relax</h3>
              <p className="text-gray-600">
                Reduce stress and anxiety with calming soundscapes that adapt to your environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Backed by Science</h2>
              <p className="text-xl text-gray-700 mb-6">
                Our technology is based on neuroscience research and sound design principles to create the most
                effective sound environments.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Neuroscience-based</span> - Developed with
                    neuroscientists to optimize brain function
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Adaptive technology</span> - Responds to your heart
                    rate, weather, and time of day
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Clinically validated</span> - Proven to improve focus
                    and sleep quality
                  </p>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center p-8 shadow-lg">
                <div className="w-full h-full rounded-full border border-red-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border border-red-100 animate-pulse"></div>
                  <div className="w-3/4 h-3/4 rounded-full border border-red-300 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full bg-white shadow-md flex items-center justify-center">
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-red-600" />
                      ) : (
                        <Play className="w-8 h-8 text-red-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What People Say</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join thousands of people who use Endel to improve their daily lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition shadow-sm hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah K.</h4>
                  <p className="text-sm text-gray-500">Designer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Endel has completely transformed my workday. I can focus for hours without getting distracted or
                stressed."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition shadow-sm hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Michael T.</h4>
                  <p className="text-sm text-gray-500">Developer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I've struggled with insomnia for years. Endel's sleep soundscapes have helped me fall asleep faster and
                stay asleep longer."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition shadow-sm hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-700 to-red-500 mr-3"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Emma R.</h4>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I use Endel for studying and meditation. It helps me stay focused during long study sessions and calm
                during stressful periods."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to Transform Your Sound Environment?
            </h2>
            <p className="text-xl text-gray-700 mb-10">
              Join thousands of people who use Endel to improve their focus, sleep, and relaxation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleSignUp}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>Try for free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900">Featured In</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-8 w-full flex items-center justify-center">
                  <div className="bg-gray-200 h-6 w-32 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold mb-4 inline-block">
                <span className="text-red-600">endel</span>
              </Link>
              <p className="text-gray-600 mb-4">Personalized soundscapes to help you focus, relax, and sleep better.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-red-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-red-600 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Download
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-red-600 transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Endel. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="#" className="text-gray-500 hover:text-red-600 transition text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-500 hover:text-red-600 transition text-sm">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-500 hover:text-red-600 transition text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
