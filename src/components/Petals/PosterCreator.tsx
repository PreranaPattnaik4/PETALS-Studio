"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  Download, 
  Share2, 
  Image as ImageIcon, 
  Type, 
  Sticker, 
  Trash2, 
  Maximize2, 
  Minimize2,
  Sparkles,
  Upload,
  RefreshCw,
  Wand2,
  Palette,
  User,
  Info,
  CheckCircle2,
  Clock,
  Undo2,
  Redo2,
  BookOpen
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { useToast } from '@/hooks/use-toast';
import { generateLore, type GenerateLoreOutput } from '@/ai/flows/generate-lore-flow';

interface StickerItem {
  id: string;
  url: string;
  x: number;
  y: number;
  scale: number;
  type: string;
}

interface CanvasState {
  bgImage: string;
  title: string;
  description: string;
  stickers: StickerItem[];
}

type CreatorMode = 'manual' | 'wall-art' | 'birthday-card' | 'lore-weaver';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function PosterCreator() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const loreCardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mode & UI State
  const [mode, setMode] = useState<CreatorMode>('manual');
  const [activeTab, setActiveTab] = useState<'background' | 'stickers' | 'text' | 'guide'>('stickers');
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual Designer State
  const [bgImage, setBgImage] = useState(PlaceHolderImages.find(img => img.id === 'crystal-rose-universe')?.imageUrl || "");
  const [title, setTitle] = useState("A Tale of Magic");
  const [description, setDescription] = useState("Where petals bloom and wonders never cease.");
  const [stickers, setStickers] = useState<StickerItem[]>([]);

  // History State for Undo/Redo
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Lore Weaver State
  const [loreConcept, setLoreConcept] = useState("");
  const [generatedLore, setGeneratedLore] = useState<GenerateLoreOutput | null>(null);

  const characterStickers = PlaceHolderImages.filter(img => 
    img.id.startsWith('char-') || img.id === 'petals-logo'
  );

  const backgroundPresets = PlaceHolderImages.filter(img => 
    img.id.startsWith('gallery-') || img.id === 'crystal-rose-universe'
  );

  // Initialize history
  useEffect(() => {
    if (history.length === 0) {
      const initialState: CanvasState = { bgImage, title, description, stickers };
      setHistory([initialState]);
      setHistoryIndex(0);
    }
  }, []);

  const saveToHistory = (newState: CanvasState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    // Limit history to 20 steps
    if (newHistory.length > 20) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevState = history[prevIndex];
      setBgImage(prevState.bgImage);
      setTitle(prevState.title);
      setDescription(prevState.description);
      setStickers(prevState.stickers);
      setHistoryIndex(prevIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextState = history[nextIndex];
      setBgImage(nextState.bgImage);
      setTitle(nextState.title);
      setDescription(nextState.description);
      setStickers(nextState.stickers);
      setHistoryIndex(nextIndex);
    }
  };

  const handleStateChange = (updates: Partial<CanvasState>) => {
    const current: CanvasState = { bgImage, title, description, stickers };
    const next = { ...current, ...updates };
    
    // Apply state locally
    if (updates.bgImage !== undefined) setBgImage(updates.bgImage);
    if (updates.title !== undefined) setTitle(updates.title);
    if (updates.description !== undefined) setDescription(updates.description);
    if (updates.stickers !== undefined) setStickers(updates.stickers);

    saveToHistory(next);
  };

  const optimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new (window as any).Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDimension = 2500;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height *= maxDimension / width;
              width = maxDimension;
            } else {
              width *= maxDimension / height;
              height = maxDimension;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast({ variant: "destructive", title: "Unsupported Format", description: "JPG, PNG, or WebP only." });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({ variant: "destructive", title: "Too Large", description: "Max size is 5 MB." });
        return;
      }
      try {
        const optimized = await optimizeImage(file);
        handleStateChange({ bgImage: optimized });
        toast({ title: "Background Uploaded" });
      } catch (err) {
        toast({ variant: "destructive", title: "Upload Failed" });
      }
    }
  };

  const addSticker = (url: string) => {
    const newSticker: StickerItem = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      x: 40,
      y: 40,
      scale: 1,
      type: 'sticker'
    };
    handleStateChange({ stickers: [...stickers, newSticker] });
  };

  const removeSticker = (id: string) => {
    handleStateChange({ stickers: stickers.filter(s => s.id !== id) });
  };

  const updateSticker = (id: string, scale: number) => {
    const newStickers = stickers.map(s => s.id === id ? { ...s, scale } : s);
    setStickers(newStickers); // Don't save history for scaling until let go if dragging, but simple here
  };

  const handleWeaveLore = async () => {
    if (!loreConcept.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generateLore({ concept: loreConcept });
      setGeneratedLore(result);
      toast({ title: "Lore Woven", description: "Your magical story is ready." });
    } catch (err) {
      toast({ variant: "destructive", title: "Weaving Failed", description: "The magic is faint. Try again soon." });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsset = async (ref: React.RefObject<HTMLDivElement>, fileName: string) => {
    setIsExporting(true);
    try {
      if (ref.current) {
        const url = await toPng(ref.current, { cacheBust: true, quality: 1 });
        const link = document.createElement('a');
        link.download = `${fileName}-${Date.now()}.png`;
        link.href = url;
        link.click();
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Download Failed" });
    } finally {
      setIsExporting(false);
    }
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Check out my PETALS Studio creation! ✨");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Mode Switcher */}
      <div className="flex flex-wrap justify-center gap-4 p-1.5 bg-rose-pink/5 rounded-3xl border border-rose-pink/10 w-fit mx-auto">
        <Button 
          variant={mode === 'manual' ? 'default' : 'ghost'} 
          onClick={() => setMode('manual')}
          className={`rounded-2xl px-6 h-12 text-[10px] font-bold uppercase tracking-widest ${mode === 'manual' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          <Palette className="mr-2 w-3.5 h-3.5" /> Manual Designer
        </Button>
        <Button 
          variant={mode === 'lore-weaver' ? 'default' : 'ghost'} 
          onClick={() => setMode('lore-weaver')}
          className={`rounded-2xl px-6 h-12 text-[10px] font-bold uppercase tracking-widest ${mode === 'lore-weaver' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          <BookOpen className="mr-2 w-3.5 h-3.5" /> Lore Weaver
        </Button>
        <Button 
          disabled
          variant="ghost" 
          className="rounded-2xl px-6 h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50"
        >
          🌹 Wall Art <span className="ml-2 text-[8px] bg-rose-pink/10 px-2 py-0.5 rounded-full">Soon</span>
        </Button>
        <Button 
          disabled
          variant="ghost" 
          className="rounded-2xl px-6 h-12 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50"
        >
          🎂 Birthday Card <span className="ml-2 text-[8px] bg-rose-pink/10 px-2 py-0.5 rounded-full">Soon</span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 flex flex-col gap-6 order-2 lg:order-1">
          <div className="glass-morphism rounded-[2.5rem] p-8 space-y-8">
            
            {mode === 'manual' ? (
              <>
                <div className="flex gap-1 p-1 bg-rose-pink/10 rounded-2xl">
                  {(['stickers', 'background', 'text', 'guide'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-1.5 ${
                        activeTab === tab ? "bg-white text-rose-pink shadow-sm" : "text-muted-foreground hover:text-rose-pink"
                      }`}
                    >
                      {tab === 'stickers' && <Sticker className="w-3.5 h-3.5" />}
                      {tab === 'background' && <ImageIcon className="w-3.5 h-3.5" />}
                      {tab === 'text' && <Type className="w-3.5 h-3.5" />}
                      {tab === 'guide' && <Info className="w-3.5 h-3.5" />}
                      {tab === 'guide' ? 'Guide' : tab}
                    </button>
                  ))}
                </div>

                <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    {activeTab === 'stickers' && (
                      <motion.div key="stickers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4">
                        {characterStickers.map((char) => (
                          <button key={char.id} onClick={() => addSticker(char.imageUrl)} className="relative aspect-square rounded-2xl overflow-hidden border border-rose-pink/10 hover:border-rose-pink group transition-all">
                            <Image src={char.imageUrl} alt={char.id} fill className="object-cover group-hover:scale-110 transition-transform" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                    {activeTab === 'background' && (
                      <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full h-12 rounded-xl border-dashed">
                          <Upload className="mr-2 w-4 h-4" /> Custom Upload
                        </Button>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".jpg,.jpeg,.png,.webp" />
                        <div className="grid grid-cols-2 gap-3">
                          {backgroundPresets.map((bg) => (
                            <button key={bg.id} onClick={() => handleStateChange({ bgImage: bg.imageUrl })} className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${bgImage === bg.imageUrl ? "border-rose-pink" : "border-transparent"}`}>
                              <Image src={bg.imageUrl} alt={bg.id} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {activeTab === 'text' && (
                      <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <Input placeholder="Main Title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => handleStateChange({ title })} className="bg-white/50 h-12 rounded-xl" />
                        <Textarea placeholder="Lore Snippet" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => handleStateChange({ description })} className="bg-white/50 rounded-xl min-h-[100px]" />
                      </motion.div>
                    )}
                    {activeTab === 'guide' && (
                      <motion.div key="guide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-rose-pink/5 space-y-4 text-xs italic text-muted-foreground font-headline">
                        <p className="font-bold not-italic text-rose-pink uppercase tracking-widest mb-4">Studio Standards</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Max Upload: 5 MB</div>
                          <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Formats: JPG, PNG, WebP</div>
                          <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Resolution: Auto-optimized</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-8 border-t border-rose-pink/10 space-y-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0} className="flex-1 rounded-xl">
                      <Undo2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1} className="flex-1 rounded-xl">
                      <Redo2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={() => downloadAsset(canvasRef, 'manual-art')}
                    disabled={isExporting}
                    className="w-full bg-rose-pink text-white h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-rose-pink/20"
                  >
                    {isExporting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    Save Art
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-pink text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" /> Lore Concept
                  </div>
                  <Textarea 
                    placeholder="E.g. A library hidden in a crystal rose, protected by an owl guardian..." 
                    value={loreConcept}
                    onChange={(e) => setLoreConcept(e.target.value)}
                    className="bg-white/50 rounded-2xl border-rose-pink/20 min-h-[120px]"
                  />
                  <Button 
                    onClick={handleWeaveLore}
                    disabled={isGenerating || !loreConcept.trim()}
                    className="w-full bg-rose-pink text-white h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
                    Weave Lore
                  </Button>
                </div>

                {generatedLore && (
                  <div className="pt-8 border-t border-rose-pink/10 space-y-4">
                    <Button 
                      onClick={() => downloadAsset(loreCardRef, 'petals-lore')}
                      className="w-full bg-white text-rose-pink border border-rose-pink h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Story Card
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => { setLoreConcept(""); setGeneratedLore(null); }}
                      className="w-full h-12 text-muted-foreground hover:text-rose-pink text-[10px] font-bold uppercase"
                    >
                      Clear & Redo
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Canvas Display */}
        <div className="flex-1 w-full order-1 lg:order-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {mode === 'manual' ? (
              <motion.div 
                key="manual-canvas"
                ref={canvasRef}
                className="relative aspect-[3/4] w-full max-w-[480px] overflow-hidden rounded-[3rem] shadow-2xl bg-white border border-rose-pink/10"
              >
                <Image src={bgImage} alt="Canvas BG" fill className="object-cover pointer-events-none" />
                <div className="absolute inset-x-6 bottom-6 p-8 glass-morphism rounded-[2.5rem] text-center space-y-3 pointer-events-none">
                  <h2 className="font-headline text-3xl text-foreground">{title}</h2>
                  <p className="text-xs italic font-headline text-muted-foreground leading-relaxed line-clamp-3">
                    {description}
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3 opacity-20">
                    <div className="h-px w-8 bg-rose-pink" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em]">PETALS STUDIO</span>
                    <div className="h-px w-8 bg-rose-pink" />
                  </div>
                </div>

                {stickers.map((s) => (
                  <motion.div
                    key={s.id}
                    drag
                    dragMomentum={false}
                    initial={{ x: s.x, y: s.y, scale: 0.5 }}
                    animate={{ scale: s.scale }}
                    className="absolute w-32 h-32 cursor-move z-20 group/sticker"
                    style={{ top: s.y, left: s.x }}
                  >
                    <div className="relative w-full h-full">
                      <Image src={s.url} alt="sticker" fill className="object-contain drop-shadow-xl" />
                      <button onClick={() => removeSticker(s.id)} className="absolute -top-4 -right-4 bg-rose-pink text-white p-1.5 rounded-full opacity-0 group-hover/sticker:opacity-100 transition-opacity">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="lore-display"
                className="w-full max-w-[600px] flex flex-col items-center"
              >
                {generatedLore ? (
                  <div 
                    ref={loreCardRef}
                    className="w-full aspect-square bg-white rounded-[4rem] p-16 shadow-2xl border border-rose-pink/10 flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-rose-pink/5 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #F7B7C3 0%, transparent 70%)' }} />
                    <div className="relative z-10 w-20 h-20 rounded-full border border-rose-pink/20 p-4 mb-4">
                      <Image src={PlaceHolderImages.find(i => i.id === 'petals-logo')?.imageUrl || ""} alt="Logo" fill className="object-cover p-4 opacity-30" />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <h3 className="font-headline text-5xl text-foreground leading-tight">{generatedLore.title}</h3>
                      <div className="w-16 h-1 bg-rose-pink/20 mx-auto rounded-full" />
                      <p className="text-xl text-muted-foreground italic font-headline leading-relaxed max-w-md mx-auto">
                        {generatedLore.content}
                      </p>
                    </div>
                    <div className="relative z-10 pt-10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-rose-pink">Lore Weaver • PETALS Studio</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6 opacity-30 py-24">
                    <BookOpen className="w-20 h-20 mx-auto text-rose-pink animate-pulse" />
                    <p className="font-headline italic text-2xl">Weave your story to see it bloom here.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
