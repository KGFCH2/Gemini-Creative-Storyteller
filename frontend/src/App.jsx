import { useState, useEffect } from 'react'
import axios from 'axios'
import { History, BookOpen, Layers, X, Sparkles, ChevronRight, Github, ExternalLink, ShieldCheck, FileText, HelpCircle, Info, Book } from 'lucide-react'
import PromptPanel from './components/PromptPanel'
import InterleavedStoryBoard from './components/InterleavedStoryBoard'

const SplashLoader = ({ onFinish }) => {
    const [started, setStarted] = useState(false);

    // We no longer use a fixed 5s timer. 
    // We will let the video play to its natural end.

    return (
        <div className="fixed inset-0 z-100 bg-[#020617] flex items-center justify-center overflow-hidden animate-out fade-out duration-1000 fill-mode-forwards">
            <div className="relative w-full h-full">
                {!started && (
                    <div className="absolute inset-0 z-120 flex items-center justify-center bg-[#020617] bg-cinematic-grid">
                        <button
                            onClick={() => setStarted(true)}
                            className="group relative px-6 py-4 md:px-12 md:py-5 bg-blue-600 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 z-50 mx-4 md:mx-0"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative text-white font-black text-sm md:text-xl uppercase tracking-widest md:tracking-[0.2em] flex items-center gap-2 md:gap-4 text-center">
                                <Sparkles className="animate-pulse shrink-0" size={18} />
                                Initiate Story Engine
                            </span>
                        </button>
                    </div>
                )}
                
                {/* Always render video but hide/reveal softly to prevent loading flash */}
                <div className={`absolute inset-0 z-110 transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative w-full h-full overflow-hidden bg-black">
                        {/* 
                            We use scale-[1.15] alongside object-cover to intentionally bleed the edges of the video 
                            out of the viewport boundaries. This organically crops out the "Veo" watermark.
                            We removed loop and added onEnded to transition automatically.
                        */}
                        <video 
                            src={started ? "/Loader.mp4" : ""}
                            autoPlay
                            muted
                            playsInline
                            onEnded={onFinish}
                            className="absolute inset-0 w-full h-full object-cover scale-[1.15] transform origin-center"
                        />
                        
                        {/* Cinematic gradient overlays to blend edges and mask any edge artifacts further */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#020617] to-transparent z-10"></div>
                        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#020617] via-[#020617]/80 to-transparent z-10 flex items-end justify-center pb-12">
                            <p className="text-blue-300 font-bold uppercase tracking-[0.5em] text-sm animate-pulse shadow-black drop-shadow-lg">
                                Synthesizing Elements
                            </p>
                        </div>
                    </div>
                </div>
                
                {started && (
                    <button
                        onClick={onFinish}
                        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 px-4 py-2 md:px-6 md:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all z-130"
                    >
                        Skip
                    </button>
                )}
            </div>
        </div>
    );
};

const SUGGESTIVE_PROMPTS = [
    "A steampunk owl with mechanical wings delivering a secret letter in 19th-century London, cinematic lighting.",
    "A small bioluminescent turtle swimming through an underwater crystal cave, Ghibli style.",
    "A group of interstellar cats playing poker on a cosmic table made of nebulae, 3D render.",
    "A majestic dragon made of flowing water emerging from a mountain lake, hyper-realistic.",
    "An ancient tree house built into a giant glowing mushroom in a purple forest, Pixar style.",
    "A futuristic city where trees grow on flying platforms, golden hour lighting, synthwave aesthetic.",
    "A tiny robot gardener tending to a field of metallic flowers on Mars, macro photography style.",
    "A tea party hosted by a sophisticated fox in a Victorian library, warm cozy atmosphere.",
    "A knight in shining armor made of glass standing in a desert of white sand.",
    "A floating island with a waterfall that flows upwards into the clouds, surreal art style.",
    "A cyberpunk street market in Tokyo with neon signs reflecting in rain puddles.",
    "A polar bear wearing a space suit walking on the surface of the moon, starry background.",
    "A magical library where books are flying around like birds, cinematic masterpiece.",
    "A samurai cat protecting a bamboo forest from shadow spirits, traditional ink painting style.",
    "A friendly cloud that looks like a dog raining colorful candies over a small town.",
    "A vintage locomotive traveling through a tunnel made of iridescent rainbows.",
    "An explorer discovering a giant sleeping golem covered in moss and flowers.",
    "A futuristic underwater city protected by a massive glass dome, coral reef surrounding.",
    "A wizard brewing a potion that turns into a small galaxy inside the cauldron.",
    "A snowy village where the houses are carved inside giant pumpkins, twilight lighting."
];

const InfoModal = ({ type, onClose }) => {
    const content = {
        terms: {
            title: "Terms of Service",
            icon: <FileText className="text-blue-400" />,
            text: "Welcome to Gemini Creative Storyteller. By accessing our platform, you agree to the following terms: 1. Content Responsibility: You are solely responsible for the prompts provided. 2. AI Limitations: Content is generated by third-party AI (Google Gemini and INFIP/Flux). We do not guarantee 100% accuracy or appropriateness. 3. Usage: This tool is intended for creative and educational purposes. 4. Prohibited Acts: You may not use this service to generate harmful, graphic, or illegal content. We reserve the right to limit access if these terms are violated."
        },
        privacy: {
            title: "Privacy Policy",
            icon: <ShieldCheck className="text-indigo-400" />,
            text: "Your data security is our priority. 1. Local Storage: Your story history and preferences are stored exclusively on your local browser. We do not store your personal stories on our central servers. 2. No Tracking: We do not use cookies for tracking or sell your data to third parties. 3. External APIs: Prompts are sent to Google Gemini and INFIP for processing; please refer to their respective privacy policies regarding data handling. 4. Media Safety: Generated images and audio are served over secure connections."
        },
        faq: {
            title: "Frequently Asked Questions",
            icon: <HelpCircle className="text-purple-400" />,
            sections: [
                { q: "Why does it take over a minute to generate?", a: "The system is performing heavy lifting: it generates a full narrative, parses it for visual cues, creates 4-6 unique high-resolution images, and synthesizes a full voiceover simultaneously." },
                { q: "Can I download the stories?", a: "Currently, you can revisit stories in your 'Archives' section. We are working on a PDF/Export feature for the next version." },
                { q: "What models power this app?", a: "We use Gemini 2.0 Flash for logic, Flux-Schnell via INFIP for imagery, and Edge-TTS for high-quality neural narration." },
                { q: "Is there a limit to story length?", a: "The AI is optimized for 4-8 scene structures to maintain high media quality and consistent pacing." }
            ]
        },
        about: {
            title: "About the Project",
            icon: <Info className="text-emerald-400" />,
            text: "Gemini Creative Storyteller is an AI-powered web application that acts as your personal movie director. Users provide a simple text prompt, and the app generates a fully fleshed-out, multi-scene story in real time. The system utilizes a 'Creative Director' agent to intelligently interleave the narrative with AI-generated images and audio narration.",
            sections: [
                { q: "Inspiration", a: "Storytelling is one of the oldest forms of human expression. We wanted to take storytelling to the next level by combining the power of generative AI with a deeply immersive, cinematic user experience. Our goal was to build a platform where anyone can bring their imagination to life as a seamless, mixed-media storyboard." },
                { q: "How we built it", a: "Backend: Built with Python and FastAPI. We implemented a multi-agent system (story, image, audio agents) orchestrated by a Creative Director. Powered by Google Gemini. \nFrontend: React (Vite) and TailwindCSS with a heavy focus on futuristic glassmorphism and cinematic motion." },
                { q: "Challenges we ran into", a: "1. Agent Orchestration: Coordinating story, image, and audio synthesis cohesively was complex.\n2. API Resilience: Designing a failover system for 14+ API keys to handle rate limits and timeouts.\n3. UI Sync: Orchestrating the streaming display and audio playback in React's state." },
                { q: "Accomplishments", a: "• Successfully built the specialized Creative Director agent.\n• Robust, invisible API key failover system.\n• Breathtaking futuristic UI that feels like a professional cinematic dashboard." },
                { q: "What we learned", a: "We gained deep experience in multi-agent LLM orchestration, asynchronous media generation in FastAPI, and advanced TailwindCSS techniques for atmospheric interfaces." },
                { q: "What's Next?", a: "• AI Video: Moving from static images to animated scenes.\n• Voice Clones: Personalized character narration.\n• Branching Stories: User-driven plot choices.\n• Exporting: Shareable video files and PDF storybooks." }
            ]
        },
        docs: {
            title: "Technical Documentation",
            icon: <Book className="text-orange-400" />,
            text: "Gemini Creative Storyteller utilizes a distributed agent architecture to synthesize multimodal content on-the-fly.",
            sections: [
                { q: "Agent Architecture", a: "The 'CreativeDirectorAgent' parses the primary LLM stream to identify scene boundaries, triggers image production tasks in parallel, and merges them with neural TTS audio. This ensures the UI stays updated without waiting for the entire story to finish." },
                { q: "The Failover Logic", a: "The system is configured with a cascading failover mechanism. If the primary Gemini key fails or hits a quota (429/500/503), the agent automatically rotates to the next key in the pool, retrying the specific task until success." },
                { q: "Frontend Stack", a: "Powered by Vite and React 18, utilizing Axios for high-performance API communication. Styling is handled via TailwindCSS v4 with custom glass-blur utilities and Framer-like CSS animations for the splash loader." },
                { q: "Static Assets", a: "A custom directory management system in the backend handles the cleanup and serving of unique audio/image files, ensuring each session remains isolated and efficient." }
            ]
        }
    };

    const active = content[type];
    if (!active) return null;

    return (
        <div className="fixed inset-0 z-250 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#1e293b] w-full max-w-2xl rounded-2xl border-2 border-[#334155] overflow-hidden shadow-2xl">
                <div className="p-6 border-b-2 border-[#334155] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {active.icon}
                        <h3 className="text-lg font-black text-white uppercase tracking-tight">{active.title}</h3>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-full text-slate-400 transition-all duration-300"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {active.text && (
                        <div className="p-4 rounded-xl bg-[#0f172a]/30 border border-transparent hover:border-blue-500/30 hover:bg-[#0f172a]/50 transition-all duration-300 group">
                            <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                                {active.text}
                            </p>
                        </div>
                    )}
                    {active.sections && active.sections.map((s, i) => (
                        <div key={i} className="bg-[#0f172a] p-4 rounded-xl border border-[#334155] hover:border-blue-500/50 hover:bg-[#162033] transition-all duration-300 cursor-default group">
                            <p className="text-xs font-black text-blue-400 uppercase mb-1 group-hover:text-blue-300 transition-colors">{s.q}</p>
                            <p className="text-xs text-slate-400 font-medium group-hover:text-slate-300 transition-colors whitespace-pre-line">{s.a}</p>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-[#0f172a]/50 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-[#334155] text-white rounded-xl font-bold text-xs uppercase hover:bg-[#475569] transition-all">Understood</button>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [prompt, setPrompt] = useState('')
    const [voice, setVoice] = useState('female')
    const [loading, setLoading] = useState(false)
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [isFading, setIsFading] = useState(false)
    const [error, setError] = useState(null)
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('story_history')
        return saved ? JSON.parse(saved) : []
    })
    const [currentPage, setCurrentPage] = useState('home')
    const [selectedArchive, setSelectedArchive] = useState(null)
    const [activeInfo, setActiveInfo] = useState(null)

    useEffect(() => {
        localStorage.setItem('story_history', JSON.stringify(history))
    }, [history])

    const handleLoaderFinish = () => {
        setIsFading(true);
        setTimeout(() => {
            setIsAppLoading(false);
            setIsFading(false); // Reset fading so content is visible
        }, 1000); // Match fade-out duration
    };

    const [storyData, setStoryData] = useState({
        story: '',
        imageUrls: [],
        audioUrl: '',
        originalText: '',
        nodes: []
    })

    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true)
        setError(null)
        setStoryData({ story: '', imageUrls: [], audioUrl: '', originalText: '', nodes: [] })

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${API_BASE_URL}/generate`, {
                prompt: prompt,
                voice: voice
            })

            const data = response.data;
            const BASE_URL = API_BASE_URL;

            let finalStory = data.story || "";
            let finalImages = data.image_urls || [];
            let finalAudio = data.audio_url || "";
            let finalNodes = data.nodes || [];

            if (data.nodes && data.nodes.length > 0) {
                finalStory = data.nodes.filter(n => n.type === 'text').map(n => n.content).join("\n\n");
                finalImages = data.nodes.filter(n => n.type === 'image').map(n => n.image_url);
                const audioNode = data.nodes.find(n => n.audio_url);
                finalAudio = audioNode ? audioNode.audio_url : "";
            }

            const processPath = (path) => path?.startsWith('/static') ? `${BASE_URL}${path}` : path;
            
            // Apply path processing to nodes as well
            const processedNodes = finalNodes.map(node => ({
                ...node,
                image_url: node.image_url ? processPath(node.image_url) : undefined,
                audio_url: node.audio_url ? processPath(node.audio_url) : undefined,
            }));

            const newStoryData = {
                story: finalStory,
                imageUrls: finalImages.map(processPath),
                audioUrl: processPath(finalAudio),
                originalText: finalStory,
                nodes: processedNodes
            };

            setStoryData(newStoryData)

            // Save to history AFTER successful generation with correct data
            setHistory(prev => [{
                prompt: prompt,
                timestamp: new Date().toLocaleString(),
                ...newStoryData
            }, ...prev].slice(0, 15))

        } catch (err) {
            console.error("Error generating story:", err)
            setError(err.response?.data?.detail || "An error occurred while generating the story. Please check your backend connection.")
        } finally {
            setLoading(false)
        }
    }

    const handleVoiceChange = async (newVoice) => {
        setVoice(newVoice);
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        if (storyData.originalText && !loading) {
            try {
                const response = await axios.post(`${API_BASE_URL}/generate-audio-only`, {
                    text: storyData.originalText,
                    voice: newVoice
                });
                const audioUrl = response.data.audio_url?.startsWith('/static')
                    ? `${API_BASE_URL}${response.data.audio_url}`
                    : response.data.audio_url;
                setStoryData(prev => ({ ...prev, audioUrl }));
            } catch (err) {
                console.error("Failed to update voice:", err);
            }
        }
    }

    return (
        <div className={`relative min-h-screen text-[#f8fafc] bg-[#0f172a] overflow-x-hidden selection:bg-blue-500/30 transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            {isAppLoading && <SplashLoader onFinish={handleLoaderFinish} />}
            {!isAppLoading && (
                <>
                    {/* Simple Solid Navbar */}
                    <nav className="sticky top-0 z-50 w-full px-4 py-3 border-b-2 border-[#1e293b] bg-[#1e293b]">
                        <div className="container mx-auto flex items-center justify-between max-w-6xl">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setCurrentPage('home')}
                            >
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <Layers size={18} className="text-white" />
                                </div>
                                <span className="text-lg font-bold uppercase tracking-tight hover:text-blue-400 transition-colors hidden sm:block">
                                    Gemini Creative Storyteller
                                </span>
                                <span className="text-sm font-bold uppercase tracking-tight hover:text-blue-400 transition-colors block sm:hidden">
                                    Storyteller
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCurrentPage('home')}
                                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${currentPage === 'home' ? 'bg-blue-600 text-white' : 'bg-[#334155] text-gray-400 hover:text-white'}`}
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => setCurrentPage('archives')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${currentPage === 'archives' ? 'bg-blue-600 text-white' : 'bg-[#334155] text-gray-400 hover:text-white'}`}
                                >
                                    <History size={16} />
                                    <span>Archives</span>
                                    {history.length > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-md bg-black/20 text-[10px]">{history.length}</span>}
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div className="relative z-10 container mx-auto px-4 py-6 flex flex-col items-center max-w-6xl">
                        {currentPage === 'home' ? (
                            <main className="w-full space-y-6">
                                <header className="text-center space-y-2 mt-4 md:mt-0">
                                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#f8fafc]">
                                        Gemini <span className="text-blue-400">Creative</span> <span className="text-indigo-300">Storyteller</span>
                                    </h1>
                                    <p className="text-xs text-blue-400/80 font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                                        <Sparkles size={14} className="text-blue-400" />
                                        <span className="bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Cinematic Engine</span>
                                        <Sparkles size={14} className="text-indigo-300" />
                                    </p>
                                </header>

                                <div className="bg-[#1e293b] p-6 rounded-2xl border-2 border-[#334155]">
                                    <PromptPanel
                                        prompt={prompt}
                                        setPrompt={setPrompt}
                                        voice={voice}
                                        setVoice={handleVoiceChange}
                                        handleGenerate={handleGenerate}
                                        loading={loading}
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-900/20 border-2 border-red-500/20 p-4 rounded-xl text-red-200 text-center text-sm font-bold">
                                        {error}
                                    </div>
                                )}

                                {loading ? (
                                    <div className="bg-[#1e293b] p-10 rounded-2xl border-2 border-[#334155] flex flex-col items-center gap-6 text-center animate-in fade-in duration-700">
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                                            <Sparkles className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={24} />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-indigo-300 font-black uppercase text-sm tracking-[0.2em]">Engaging Cinematic Engine</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                                                It often takes <span className="text-indigo-400/80">60 to 80 seconds</span> to generate the story and images simultaneously.
                                            </p>
                                        </div>
                                    </div>
                                ) : storyData.nodes && storyData.nodes.length > 0 && (
                                    <div className="space-y-6 w-full max-w-4xl">
                                        <InterleavedStoryBoard nodes={storyData.nodes} audioUrl={storyData.audioUrl} />
                                    </div>
                                )}

                                {/* Suggestive Prompt Library */}
                                <div className="mt-12 space-y-6">
                                    <div className="flex items-center gap-3 border-b-2 border-[#1e293b] pb-3">
                                        <div className="bg-indigo-600/20 p-2 rounded-lg">
                                            <Sparkles size={18} className="text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-[#e2e8f0] font-black text-sm uppercase tracking-[0.2em] leading-none">Creative <span className="text-indigo-300">Prompt</span> Library</h3>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-wider">Tap to inspire your next masterpiece</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {SUGGESTIVE_PROMPTS.map((p, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setPrompt(p);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="text-left group relative bg-[#1e293b] hover:bg-[#2e3e5a] border-2 border-[#334155] hover:border-indigo-500/50 p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex flex-col justify-between min-h-25"
                                            >
                                                <p className="text-xs text-slate-300 font-medium leading-relaxed line-clamp-3 group-hover:text-indigo-100 italic transition-colors">"{p}"</p>
                                                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Select Concept</span>
                                                    <ChevronRight size={12} className="text-indigo-400" />
                                                </div>
                                                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/30 text-[8px] font-black text-slate-500 group-hover:text-indigo-400/50 uppercase tracking-tighter transition-colors">
                                                    #{idx + 1}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </main>
                        ) : (
                            <main className="w-full space-y-6 animate-in fade-in duration-300">
                                <header className="flex items-center justify-between border-b-2 border-[#1e293b] pb-4">
                                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                        <BookOpen size={24} className="text-blue-500" />
                                        PROject Archives
                                    </h2>
                                    <button
                                        onClick={() => setCurrentPage('home')}
                                        className="text-sm font-bold text-blue-400 hover:text-white flex items-center gap-1"
                                    >
                                        <X size={16} /> Close
                                    </button>
                                </header>

                                {history.length === 0 ? (
                                    <div className="bg-[#1e293b] p-12 rounded-2xl border-2 border-[#334155] text-center">
                                        <p className="text-gray-500 font-bold italic">No stories found in your library.</p>
                                        <button
                                            onClick={() => setCurrentPage('home')}
                                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm"
                                        >
                                            Start Creating
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {history.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-[#1e293b] border-2 border-[#334155] rounded-xl overflow-hidden hover:border-blue-500 transition-all cursor-pointer group"
                                                onClick={() => setSelectedArchive(item)}
                                            >
                                                {item.imageUrls[0] && (
                                                    <div className="aspect-video relative overflow-hidden">
                                                        <img src={item.imageUrls[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                                    </div>
                                                )}
                                                <div className="p-4 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md uppercase">Draft #{history.length - idx}</span>
                                                        <span className="text-[9px] text-gray-500 font-bold uppercase">{item.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm font-bold text-white line-clamp-1">"{item.prompt}"</p>
                                                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{item.story}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </main>
                        )}
                    </div>
                    <footer className="w-full mt-20 pb-10 border-t-2 border-[#1e293b]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-12 px-6">
                            <div className="space-y-4 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
                                        <Layers size={14} className="text-white" />
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-widest text-[#f8fafc]">
                                        Gemini Storyteller
                                    </span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed tracking-wider">
                                    A cinematic AI synthesizer bridging narrative and reality through interleaved multimodal synthesis.
                                </p>
                            </div>

                            <div className="text-center md:text-left group/platform">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                    <BookOpen size={14} className="text-blue-500 group-hover/platform:scale-125 group-hover/platform:rotate-12 transition-all duration-300" />
                                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Platform</h4>
                                </div>
                                <ul className="space-y-2">
                                    {['About', 'FAQs', 'Documentation'].map(item => (
                                        <li key={item}>
                                            <button 
                                                onClick={() => {
                                                    if (item === 'About') setActiveInfo('about');
                                                    else if (item === 'FAQs') setActiveInfo('faq');
                                                    else if (item === 'Documentation') setActiveInfo('docs');
                                                }}
                                                className="text-xs text-slate-400 hover:text-white font-bold transition-colors"
                                            >
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="text-center md:text-left group/legal">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                    <ShieldCheck size={14} className="text-indigo-400 group-hover/legal:scale-125 group-hover/legal:-rotate-12 transition-all duration-300" />
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Legal</h4>
                                </div>
                                <ul className="space-y-2">
                                    {['Terms', 'Privacy'].map(item => (
                                        <li key={item}>
                                            <button 
                                                onClick={() => setActiveInfo(item.toLowerCase())}
                                                className="text-xs text-slate-400 hover:text-white font-bold transition-colors"
                                            >
                                                {item} Policy
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="text-center md:text-left group/connect">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                                    <Sparkles size={14} className="text-emerald-400 group-hover/connect:scale-125 group-hover/connect:animate-pulse transition-all duration-300" />
                                    <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Connect</h4>
                                </div>
                                <a 
                                    href="https://github.com/KGFCH2/Gemini-Creative-Storyteller" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e293b] border-2 border-[#334155] hover:border-blue-500/50 text-slate-300 hover:text-white text-xs font-black transition-all group"
                                >
                                    <Github size={16} />
                                    <span>GitHub Source</span>
                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-4 px-6">
                            <p className="text-[9px] font-bold text-white uppercase tracking-[0.1em]">
                                © 2026 Gemini Creative Storyteller.
                            </p>
                            <div className="flex items-center gap-6">
                                <span className="text-[9px] font-bold text-white uppercase tracking-tighter">All rights synthesized.</span>
                            </div>
                        </div>
                    </footer>
                </>
            )}

            {activeInfo && <InfoModal type={activeInfo} onClose={() => setActiveInfo(null)} />}

            {/* Archive Modal */}
            {selectedArchive && (
                <div className="fixed inset-0 z-200 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#1e293b] w-full max-w-5xl h-[95vh] sm:h-auto sm:max-h-[90vh] rounded-2xl sm:rounded-3xl border-2 border-[#334155] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(37,99,235,0.2)]">
                        {/* Modal Header */}
                        <div className="p-6 border-b-2 border-[#334155] flex items-center justify-between bg-[#1e293b]">
                            <div>
                                <h3 className="text-xl font-black text-white line-clamp-1">"{selectedArchive.prompt}"</h3>
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Archived Session • {selectedArchive.timestamp}</p>
                            </div>
                            <button
                                onClick={() => setSelectedArchive(null)}
                                className="w-10 h-10 rounded-full bg-[#334155] hover:bg-red-500/20 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
                            {selectedArchive.nodes && selectedArchive.nodes.length > 0 ? (
                                <InterleavedStoryBoard nodes={selectedArchive.nodes} audioUrl={selectedArchive.audioUrl} stickyOffset="top-0" />
                            ) : (
                                <div className="bg-[#0f172a] p-8 rounded-2xl border-2 border-[#334155]">
                                    <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-4">Legacy Transcription</h4>
                                    <p className="text-gray-400 whitespace-pre-wrap">{selectedArchive.story}</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t-2 border-[#334155] flex justify-end gap-3 bg-[#1e293b]">
                            <button
                                onClick={() => {
                                    setPrompt(selectedArchive.prompt);
                                    setStoryData(selectedArchive);
                                    setSelectedArchive(null);
                                    setCurrentPage('home');
                                }}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase transition-all flex items-center gap-2"
                            >
                                <Layers size={14} /> Restore to Editor
                            </button>
                            <button
                                onClick={() => setSelectedArchive(null)}
                                className="px-6 py-2 bg-[#334155] hover:bg-[#475569] text-white rounded-xl font-black text-xs uppercase transition-all"
                            >
                                Close View
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
