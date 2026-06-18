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
  ImageIcon, 
  Type, 
  Sticker, 
  Trash2, 
  Sparkles,
  Upload,
  RefreshCw,
  Wand2,
  Palette,
  Info,
  CheckCircle2,
  Undo2,
  Redo2,
  BookOpen,
  Clock,
  Heart
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { useToast } from '@/hooks/use-toast';

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

type CreatorMode = 'manual' | 'lore-weaver' | 'wall-art' | 'birthday-card';
type ManualSidebarTab = 'stickers' | 'background' | 'text';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function PosterCreator() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mode & UI State
  const [mode, setMode] = useState<CreatorMode>('manual');
  const [activeTab, setActiveTab] = useState<ManualSidebarTab>('stickers');
  const [birthdayTab, setBirthdayTab] = useState<'fixed' | 'personalized'>('fixed');
  const [isExporting, setIsExporting] = useState(false);

  // Manual Designer State
  const [bgImage, setBgImage] = useState(PlaceHolderImages.find(img => img.id === 'crystal-rose-universe')?.imageUrl || "");
  const [title, setTitle] = useState("A Tale of Magic");
  const [description, setDescription] = useState("Where petals bloom and wonders never cease.");
  const [stickers, setStickers] = useState<StickerItem[]>([]);

  // History State for Undo/Redo
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Exactly 10 decorative stickers
  const decorativeStickers = PlaceHolderImages.filter(img => img.id.startsWith('sticker-')).slice(0, 10);
  
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
  }, [bgImage, title, description, stickers, history.length]);

  const saveToHistory = (newState: CanvasState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
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
      x: 100,
      y: 100,
      scale: 1,
      type: 'sticker'
    };
    handleStateChange({ stickers: [...stickers, newSticker] });
  };

  const removeSticker = (id: string) => {
    handleStateChange({ stickers: stickers.filter(s => s.id !== id) });
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

  const StudioGuide = () => (
    <div className="p-8 rounded-[2.5rem] bg-rose-pink/5 space-y-6 text-sm italic text-muted-foreground font-headline border border-rose-pink/10">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-4 h-4 text-rose-pink" />
        <p className="font-bold not-italic text-rose-pink uppercase tracking-[0.2em] text-[10px]">Studio Standards</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-[11px]"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Max Size: 5 MB</div>
        <div className="flex items-center gap-2 text-[11px]"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Res: 4000px Max</div>
        <div className="flex items-center gap-2 text-[11px]"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> JPG, PNG, WebP</div>
        <div className="flex items-center gap-2 text-[11px]"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Auto-Optimize</div>
      </div>
      <p className="pt-4 border-t border-rose-pink/10 text-[10px] leading-relaxed tracking-wide opacity-70">
        We recommend images between 2000px and 3000px for the most enchanting results.
      </p>
    </div>
  );

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
          variant={mode === 'wall-art' ? 'default' : 'ghost'} 
          onClick={() => setMode('wall-art')}
          className={`rounded-2xl px-6 h-12 text-[10px] font-bold uppercase tracking-widest ${mode === 'wall-art' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          <Sparkles className="mr-2 w-3.5 h-3.5" /> Wall Art
        </Button>
        <Button 
          variant={mode === 'birthday-card' ? 'default' : 'ghost'} 
          onClick={() => setMode('birthday-card')}
          className={`rounded-2xl px-6 h-12 text-[10px] font-bold uppercase tracking-widest ${mode === 'birthday-card' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          <Heart className="mr-2 w-3.5 h-3.5" /> Birthday Card
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        {/* Sidebar Controls - Width 650px, Hidden Scrollbars */}
        <div className="w-full lg:w-[650px] flex flex-col gap-6 order-2 lg:order-1 shrink-0">
          <div className="glass-morphism rounded-[3rem] p-10 space-y-10 h-[900px] flex flex-col shadow-2xl border-rose-pink/10 overflow-hidden">
            
            <AnimatePresence mode="wait">
              {mode === 'manual' ? (
                <motion.div key="manual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full overflow-hidden">
                  <div className="flex gap-2 p-1.5 bg-rose-pink/10 rounded-2xl overflow-x-auto no-scrollbar border border-rose-pink/5 mb-8">
                    {(['stickers', 'background', 'text'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 min-w-[120px] py-5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-2.5 ${
                          activeTab === tab ? "bg-white text-rose-pink shadow-lg" : "text-muted-foreground hover:text-rose-pink"
                        }`}
                      >
                        {tab === 'stickers' && <Sticker className="w-4 h-4" />}
                        {tab === 'background' && <ImageIcon className="w-4 h-4" />}
                        {tab === 'text' && <Type className="w-4 h-4" />}
                        <span className="truncate w-full text-center px-1">
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar pr-3">
                    {activeTab === 'stickers' && (
                      <div className="grid grid-cols-2 gap-8 mb-10">
                        {decorativeStickers.map((sticker) => (
                          <button key={sticker.id} onClick={() => addSticker(sticker.imageUrl)} className="relative aspect-square rounded-3xl overflow-hidden border-4 border-rose-pink/10 hover:border-rose-pink group transition-all bg-rose-pink/5 shadow-md">
                            <Image src={sticker.imageUrl} alt={sticker.id} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                          </button>
                        ))}
                      </div>
                    )}
                    {activeTab === 'background' && (
                      <div className="space-y-8 mb-10">
                        <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full h-16 rounded-3xl border-dashed border-rose-pink/40 hover:border-rose-pink text-rose-pink font-bold uppercase tracking-widest text-[11px] bg-rose-pink/5">
                          <Upload className="mr-3 w-5 h-5" /> Custom Studio Upload
                        </Button>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".jpg,.jpeg,.png,.webp" />
                        <div className="grid grid-cols-2 gap-6">
                          {backgroundPresets.map((bg) => (
                            <button key={bg.id} onClick={() => handleStateChange({ bgImage: bg.imageUrl })} className={`relative aspect-[3/4] rounded-3xl overflow-hidden border-4 transition-all duration-500 ${bgImage === bg.imageUrl ? "border-rose-pink shadow-2xl scale-[1.02]" : "border-transparent opacity-70 hover:opacity-100"}`}>
                              <Image src={bg.imageUrl} alt={bg.id} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === 'text' && (
                      <div className="space-y-8 py-4 mb-10">
                        <div className="space-y-3">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-3">Poster Title</label>
                          <Input placeholder="E.g. The Whispering Sea" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => handleStateChange({ title })} className="bg-white/50 h-16 rounded-[2rem] border-rose-pink/20 px-6 font-headline text-xl" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-3">Lore Snippet</label>
                          <Textarea placeholder="E.g. Beneath the silver moon, the waves carry secrets..." value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => handleStateChange({ description })} className="bg-white/50 rounded-[2rem] border-rose-pink/20 min-h-[220px] px-6 py-4 font-headline text-lg italic" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-rose-pink/10 space-y-6">
                    <StudioGuide />
                    <div className="flex gap-6">
                      <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0} className="flex-1 h-16 rounded-3xl border-rose-pink/20 hover:border-rose-pink transition-all bg-white/50">
                        <Undo2 className="w-6 h-6" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1} className="flex-1 h-16 rounded-3xl border-rose-pink/20 hover:border-rose-pink transition-all bg-white/50">
                        <Redo2 className="w-6 h-6" />
                      </Button>
                    </div>
                    <Button 
                      onClick={() => downloadAsset(canvasRef, 'manual-art')}
                      disabled={isExporting}
                      className="w-full bg-rose-pink text-white h-20 rounded-3xl font-bold uppercase tracking-[0.2em] text-[12px] shadow-2xl shadow-rose-pink/20 hover:shadow-3xl transition-all"
                    >
                      {isExporting ? <RefreshCw className="w-6 h-6 mr-4 animate-spin" /> : <Download className="w-6 h-6 mr-4" />}
                      Save Masterpiece
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="ai-modes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full overflow-hidden">
                   <div className="flex-1 overflow-y-auto no-scrollbar py-8">
                    <div className="text-center space-y-10">
                      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-rose-pink/10 text-rose-pink text-[11px] font-bold uppercase tracking-widest border border-rose-pink/20 mb-4">
                        <Clock className="w-4 h-4" /> Coming Soon
                      </div>
                      
                      {mode === 'lore-weaver' && (
                        <div className="space-y-10 px-6">
                          <div className="flex items-center justify-center gap-3 text-rose-pink text-[12px] font-bold uppercase tracking-[0.2em]">
                            <BookOpen className="w-5 h-5" /> Lore Concept
                          </div>
                          <Textarea 
                            placeholder="E.g. A library hidden in a crystal rose where every petal tells a forgotten memory..." 
                            disabled
                            className="bg-white/50 rounded-[3rem] border-rose-pink/20 min-h-[300px] opacity-50 p-12 italic font-headline text-xl"
                          />
                          <Button 
                            disabled
                            className="w-full max-w-md mx-auto bg-rose-pink/20 text-muted-foreground h-16 rounded-[2rem] font-bold uppercase tracking-widest text-[12px] cursor-not-allowed"
                          >
                            <Wand2 className="w-5 h-5 mr-4" /> Weave Lore (Soon)
                          </Button>
                        </div>
                      )}

                      {mode === 'wall-art' && (
                        <div className="space-y-10 px-6">
                          <div className="space-y-3 text-left">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-rose-pink px-3">Signature Wall Art</label>
                            <Input placeholder="Poster Title (e.g. Where Stories Bloom)" disabled className="bg-white/50 h-16 rounded-[2rem] opacity-50 border-rose-pink/20 px-6 font-headline text-lg" />
                          </div>
                          <div className="space-y-3 text-left">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-rose-pink px-3">Poetic Subtitle</label>
                            <Textarea placeholder="Subtitle (e.g. Every petal carries a dream)" disabled className="bg-white/50 rounded-[2rem] opacity-50 border-rose-pink/20 min-h-[120px] px-6 py-4 font-headline text-lg" />
                          </div>
                          <Button 
                            disabled
                            className="w-full max-w-md mx-auto bg-rose-pink/20 text-muted-foreground h-16 rounded-[2rem] font-bold uppercase tracking-widest text-[12px] cursor-not-allowed"
                          >
                            <Sparkles className="w-5 h-5 mr-4" /> Generate Wall Art (Soon)
                          </Button>
                        </div>
                      )}

                      {mode === 'birthday-card' && (
                        <div className="space-y-10 px-6">
                          <div className="flex gap-4 p-2.5 bg-rose-pink/10 rounded-[2.5rem] border border-rose-pink/10">
                            <button onClick={() => setBirthdayTab('fixed')} className={`flex-1 py-5 rounded-[2.2rem] text-[11px] font-bold uppercase tracking-widest transition-all ${birthdayTab === 'fixed' ? 'bg-white text-rose-pink shadow-lg' : 'text-muted-foreground'}`}>
                              🌸 Signature
                            </button>
                            <button onClick={() => setBirthdayTab('personalized')} className={`flex-1 py-5 rounded-[2.2rem] text-[11px] font-bold uppercase tracking-widest transition-all ${birthdayTab === 'personalized' ? 'bg-white text-rose-pink shadow-lg' : 'text-muted-foreground'}`}>
                              📸 Personalized
                            </button>
                          </div>
                          <div className="space-y-8">
                            {birthdayTab === 'personalized' && (
                              <div className="space-y-8">
                                <Button disabled variant="outline" className="w-full h-16 rounded-[2rem] border-dashed opacity-50 border-rose-pink/20">
                                  <ImageIcon className="mr-4 w-6 h-6" /> Upload Photo
                                </Button>
                                <Input placeholder="Recipient's Name" disabled className="bg-white/50 h-16 rounded-[2rem] opacity-50 border-rose-pink/20 px-6 font-headline text-lg" />
                              </div>
                            )}
                            <p className="text-xl italic text-muted-foreground text-center px-12 leading-relaxed font-headline">
                              {birthdayTab === 'fixed' ? "A signature studio-designed card with crystal rose theme and golden accents." : "A personalized keepsake placing your photo inside a magical PETALS frame."}
                            </p>
                          </div>
                          <Button 
                            disabled
                            className="w-full max-w-md mx-auto bg-rose-pink/20 text-muted-foreground h-16 rounded-[2rem] font-bold uppercase tracking-widest text-[12px] cursor-not-allowed"
                          >
                            <Heart className="w-5 h-5 mr-4" /> Generate Card (Soon)
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-rose-pink/10">
                    <StudioGuide />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Canvas Display - Proportional to sidebar */}
        <div className="flex-1 w-full order-1 lg:order-2 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            {mode === 'manual' ? (
              <motion.div 
                key="manual-canvas"
                ref={canvasRef}
                className="relative aspect-[3/4] w-full max-w-[640px] overflow-hidden rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(247,183,195,0.4)] bg-white border border-rose-pink/10"
              >
                <Image src={bgImage} alt="Canvas BG" fill className="object-cover pointer-events-none" />
                
                {/* Refined Text Overlay - More compact to show background */}
                <div className="absolute inset-x-10 bottom-10 py-6 px-10 glass-morphism rounded-[2.5rem] text-center space-y-3 pointer-events-none border border-white/40">
                  <h2 className="font-headline text-3xl text-foreground leading-[1.1]">{title}</h2>
                  <p className="text-sm italic font-headline text-muted-foreground leading-relaxed line-clamp-2">
                    {description}
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-5 opacity-30">
                    <div className="h-px w-12 bg-rose-pink" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-rose-pink">PETALS STUDIO</span>
                    <div className="h-px w-12 bg-rose-pink" />
                  </div>
                </div>

                {stickers.map((s) => (
                  <motion.div
                    key={s.id}
                    drag
                    dragMomentum={false}
                    initial={{ x: s.x, y: s.y, scale: 0.5 }}
                    animate={{ scale: s.scale }}
                    className="absolute w-44 h-44 cursor-move z-20 group/sticker"
                    style={{ top: s.y, left: s.x }}
                  >
                    <div className="relative w-full h-full">
                      <Image src={s.url} alt="sticker" fill className="object-contain drop-shadow-2xl" />
                      <button onClick={() => removeSticker(s.id)} className="absolute -top-6 -right-6 bg-rose-pink text-white p-3 rounded-full opacity-0 group-hover/sticker:opacity-100 transition-opacity shadow-2xl">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="soon-display"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[800px] flex flex-col items-center"
              >
                <div className="text-center space-y-12 py-40 px-20 glass-morphism rounded-[5rem] border border-rose-pink/10 shadow-[0_50px_100px_-20px_rgba(247,183,195,0.25)] w-full">
                  <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute inset-0 bg-rose-pink/20 blur-3xl animate-pulse rounded-full" />
                    {mode === 'lore-weaver' ? <BookOpen className="w-full h-full text-rose-pink relative" /> :
                     mode === 'wall-art' ? <Sparkles className="w-full h-full text-rose-pink relative" /> :
                     <Heart className="w-full h-full text-rose-pink relative" />}
                  </div>
                  <div className="space-y-8">
                    <h2 className="font-headline text-6xl text-foreground leading-tight">
                      {mode === 'lore-weaver' ? "Lore Weaver" : mode === 'wall-art' ? "Wall Art Creator" : "Birthday Card Studio"}
                    </h2>
                    <p className="font-headline italic text-4xl text-muted-foreground leading-relaxed">Your imagination is the seed.<br /><span className="text-rose-pink">Wait for it to bloom.</span></p>
                  </div>
                  <div className="h-px w-40 bg-rose-pink/20 mx-auto" />
                  <p className="text-base font-headline italic text-muted-foreground/60 max-w-lg mx-auto leading-relaxed">
                    Our AI models are currently in the studio's sacred greenhouse, being nurtured to provide the most enchanting and emotionally resonant results.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
