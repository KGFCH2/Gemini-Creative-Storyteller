import React from 'react'
import { Sparkles, FileText, ImageIcon, Mic } from 'lucide-react'

const InterleavedStoryBoard = ({ nodes = [], audioUrl, stickyOffset = "top-24" }) => {
    if (!nodes || nodes.length === 0) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 max-w-4xl mx-auto">
            {/* Audio Interface acts as a Global Control for the storyline */}
            {audioUrl && (
                <div className={`flex justify-center pt-4 sticky ${stickyOffset} z-40 mb-8`}>
                    <div className="bg-[#1e293b]/90 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border-2 border-indigo-500/30 w-full max-w-2xl transform transition-transform hover:scale-[1.01]">
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                                <Mic size={20} className="text-white md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1 w-full relative">
                                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <Sparkles size={12} /> Cinematic Narration Protocol
                                </p>
                                <div className="w-full relative group">
                                    <audio
                                        src={audioUrl}
                                        controls
                                        className="h-10 w-full rounded-full bg-[#0f172a] shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Seamless Native Node Rendering */}
            <div className="relative border-l-2 md:border-l-[3px] border-[#334155] pl-5 md:pl-8 ml-3 md:ml-12 space-y-12 md:space-y-16">
                
                {nodes.map((node, index) => {
                    const isText = node.type === 'text';
                    const isImage = node.type === 'image';

                    if (isText) {
                        return (
                            <div key={index} className="relative group">
                                {/* Timeline Dot */}
                                <div className="absolute -left-7.25 md:-left-10.75 top-6 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#1e293b] border-[3px] md:border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 transition-transform group-hover:scale-125"></div>
                                
                                <article className="bg-[#1e293b] p-6 md:p-8 rounded-[20px] md:rounded-[30px] rounded-tl-none border border-[#334155] shadow-xl hover:border-indigo-400 transition-colors duration-500">
                                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                                        <FileText size={16} className="text-blue-400" />
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-blue-300">Narrative Construct</span>
                                    </div>
                                    <p className="text-[#cbd5e1] text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                                        {node.content}
                                    </p>
                                </article>
                            </div>
                        );
                    }

                    if (isImage && node.image_url) {
                        return (
                            <div key={index} className="relative group perspective-[1000px]">
                                {/* Timeline Dot */}
                                <div className="absolute -left-7.25 md:-left-10.75 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#1e293b] border-[3px] md:border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 transition-transform group-hover:scale-125"></div>
                                
                                <div className="aspect-video overflow-hidden rounded-[20px] md:rounded-[40px] border-4 md:border-[6px] border-[#1e293b] bg-[#020617] shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform transition-all duration-700 hover:scale-[1.02] hover:border-blue-500">
                                    <img
                                        src={node.image_url}
                                        alt={`Generated Scene Construct`}
                                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    
                                    {/* Cinematic Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                                        <p className="text-white font-black text-sm md:text-md uppercase tracking-[0.3em] flex items-center gap-3">
                                            <ImageIcon size={20} className="text-blue-400" /> Native Vision Data
                                        </p>
                                        <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                                            <div className="w-1/3 h-full bg-blue-500 animate-pulse"></div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        );
                    }

                    return null;
                })}

                {/* End of Timeline Marker */}
                <div className="absolute -left-3.5 md:-left-4 -bottom-2 w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] z-10 flex items-center justify-center">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white"></div>
                </div>

            </div>
        </div>
    );
};

export default InterleavedStoryBoard;
