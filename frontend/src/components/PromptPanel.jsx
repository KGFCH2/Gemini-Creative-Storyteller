import React from 'react';
import { Camera, Clapperboard, Sparkles, User, UserPlus, Loader2, Zap } from 'lucide-react';

const PromptPanel = ({ prompt, setPrompt, voice, setVoice, handleGenerate, loading }) => {
    return (
        <section className="transition-all duration-300">
            <div className="flex flex-col gap-4">
                <textarea
                    className="w-full bg-[#0f172a] border-2 border-[#334155] rounded-xl p-4 text-white text-base placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none h-28 custom-scrollbar font-medium"
                    placeholder="Describe your story idea..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={loading}
                />

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0f172a] p-2 sm:p-3 rounded-xl border-2 border-[#334155]">
                    <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                        <div className="flex bg-[#1e293b] rounded-lg p-1 border border-[#334155] w-full sm:w-auto">
                            <button
                                onClick={() => setVoice('female')}
                                className={`flex-1 sm:flex-none justify-center px-4 py-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-black flex items-center gap-2 transition-all duration-300 ${voice === 'female' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <User size={14} /> NOVA
                            </button>
                            <button
                                onClick={() => setVoice('male')}
                                className={`flex-1 sm:flex-none justify-center px-4 py-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-black flex items-center gap-2 transition-all duration-300 ${voice === 'male' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <UserPlus size={14} /> ORION
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        {loading && (
                            <div className="flex items-center gap-2 text-blue-400">
                                <Loader2 size={16} className="animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Synthesizing</span>
                            </div>
                        )}
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !prompt.trim()}
                            className={`w-full sm:w-auto px-6 py-3 sm:py-2 rounded-lg font-black text-xs sm:text-[10px] uppercase tracking-widest transition-all ${loading || !prompt.trim() ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}
                        >
                            {loading ? 'Processing' : 'Generate'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromptPanel;