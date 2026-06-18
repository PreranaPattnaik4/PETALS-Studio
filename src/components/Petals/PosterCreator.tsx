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
  Loader2,
  Heart,
  Camera
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
type ManualSidebarTab = 'stickers' | 'background' | 'personalized' | 'text' | 'guide';

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

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 flex flex-col gap-6 order-2 lg:order-1">
          <div className="glass-morphism rounded-[2.5rem] p-8 space-y-8 min-h-[500px] flex flex-col">
            
            <AnimatePresence mode="wait">
              {mode === 'manual' ? (
                <motion.div key="manual" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full space-y-8">
                  <div className="flex gap-1 p-1 bg-rose-pink/10 rounded-2xl overflow-x-auto custom-scrollbar no-scrollbar">
                    {(['stickers', 'background', 'personalized', 'text', 'guide'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 min-w-[60px] py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-1.5 ${
                          activeTab === tab ? "bg-white text-rose-pink shadow-sm" : "text-muted-foreground hover:text-rose-pink"
                        }`}
                      >
                        {tab === 'stickers' && <Sticker className="w-3.5 h-3.5" />}
                        {tab === 'background' && <ImageIcon className="w-3.5 h-3.5" />}
                        {tab === 'personalized' && <Camera className="w-3.5 h-3.5" />}
                        {tab === 'text' && <Type className="w-3.5 h-3.5" />}
                        {tab === 'guide' && <Info className="w-3.5 h-3.5" />}
                        <span className="truncate w-full text-center">
                          {tab === 'personalized' ? 'Perso' : tab === 'guide' ? 'Guide' : tab}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                    {activeTab === 'stickers' && (
                      <div className="grid grid-cols-2 gap-4">
                        {characterStickers.map((char) => (
                          <button key={char.id} onClick={() => addSticker(char.imageUrl)} className="relative aspect-square rounded-2xl overflow-hidden border border-rose-pink/10 hover:border-rose-pink group transition-all">
                            <Image src={char.imageUrl} alt={char.id} fill className="object-cover group-hover:scale-110 transition-transform" />
                          </button>
                        ))}
                      </div>
                    )}
                    {activeTab === 'background' && (
                      <div className="space-y-4">
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
                      </div>
                    )}
                    {activeTab === 'personalized' && (
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20">
                          <Clock className="w-3.5 h-3.5" /> Coming Soon
                        </div>
                        <div className="space-y-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-rose-pink">AI Personalized Design</p>
                          <p className="text-xs italic text-muted-foreground leading-relaxed">
                            Upload a photo and let our AI weavers transform it into a signature PETALS masterpiece.
                          </p>
                          <Button disabled variant="outline" className="w-full h-12 rounded-xl border-dashed opacity-50">
                            <Camera className="mr-2 w-4 h-4" /> Upload & PETAL-ize
                          </Button>
                        </div>
                        <div className="p-4 rounded-2xl bg-rose-pink/5 text-[10px] italic text-muted-foreground text-center">
                          Our AI models are being nurtured to help your personal photos bloom with magic.
                        </div>
                      </div>
                    )}
                    {activeTab === 'text' && (
                      <div className="space-y-4">
                        <Input placeholder="Main Title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => handleStateChange({ title })} className="bg-white/50 h-12 rounded-xl" />
                        <Textarea placeholder="Lore Snippet" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => handleStateChange({ description })} className="bg-white/50 rounded-xl min-h-[100px]" />
                      </div>
                    )}
                    {activeTab === 'guide' && (
                      <div className="p-6 rounded-2xl bg-rose-pink/5 space-y-4 text-xs italic text-muted-foreground font-headline">
                        <p className="font-bold not-italic text-rose-pink uppercase tracking-widest mb-4">Studio Standards</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Max Upload: 5 MB</div>
                          <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Formats: JPG, PNG, WebP</div>
                          <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-rose-pink" /> Resolution: Auto-optimized</div>
                        </div>
                      </div>
                    )}
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
                </motion.div>
              ) : mode === 'lore-weaver' ? (
                <motion.div key="lore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 flex flex-col h-full">
                  <div className="space-y-4 flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20 mb-4">
                      <Clock className="w-3.5 h-3.5" /> Coming Soon
                    </div>
                    <div className="flex items-center gap-2 text-rose-pink text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" /> Lore Concept
                    </div>
                    <Textarea 
                      placeholder="E.g. A library hidden in a crystal rose..." 
                      disabled
                      className="bg-white/50 rounded-2xl border-rose-pink/20 min-h-[120px] opacity-50"
                    />
                    <Button 
                      disabled
                      className="w-full bg-rose-pink/20 text-muted-foreground h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] cursor-not-allowed"
                    >
                      <Wand2 className="w-4 h-4 mr-2" /> Weave Lore (Soon)
                    </Button>
                  </div>
                  <div className="p-6 rounded-2xl bg-rose-pink/5 text-xs italic text-muted-foreground text-center">
                    Our weavers are currently crafting the AI models for the Lore Weaver. This portal will be blooming soon.
                  </div>
                </motion.div>
              ) : mode === 'wall-art' ? (
                <motion.div key="wall-art" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 flex flex-col h-full">
                  <div className="space-y-6 flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20 mb-4">
                      <Clock className="w-3.5 h-3.5" /> Coming Soon
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-rose-pink">Signature Wall Art</p>
                      <Input placeholder="Poster Title (e.g. Where Stories Bloom)" disabled className="bg-white/50 h-12 rounded-xl opacity-50" />
                      <Textarea placeholder="Poetic Subtitle (e.g. Every petal carries a dream)" disabled className="bg-white/50 rounded-xl opacity-50" />
                    </div>
                    <Button 
                      disabled
                      className="w-full bg-rose-pink/20 text-muted-foreground h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4 mr-2" /> Generate Wall Art (Soon)
                    </Button>
                  </div>
                  <div className="p-6 rounded-2xl bg-rose-pink/5 text-xs italic text-muted-foreground text-center">
                    Premium gallery-quality composition with enchanted particles is blooming soon.
                  </div>
                </motion.div>
              ) : (
                <motion.div key="birthday" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 flex flex-col h-full">
                  <div className="space-y-6 flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20 mb-4">
                      <Clock className="w-3.5 h-3.5" /> Coming Soon
                    </div>
                    
                    <div className="flex gap-1 p-1 bg-rose-pink/10 rounded-2xl">
                      <button onClick={() => setBirthdayTab('fixed')} className={`flex-1 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${birthdayTab === 'fixed' ? 'bg-white text-rose-pink' : 'text-muted-foreground'}`}>
                        🌸 Signature
                      </button>
                      <button onClick={() => setBirthdayTab('personalized')} className={`flex-1 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${birthdayTab === 'personalized' ? 'bg-white text-rose-pink' : 'text-muted-foreground'}`}>
                        📸 Personalized
                      </button>
                    </div>

                    <div className="space-y-4">
                      {birthdayTab === 'personalized' && (
                        <div className="space-y-4">
                          <Button disabled variant="outline" className="w-full h-12 rounded-xl border-dashed opacity-50">
                            <Camera className="mr-2 w-4 h-4" /> Upload Photo
                          </Button>
                          <Input placeholder="Recipient's Name" disabled className="bg-white/50 h-12 rounded-xl opacity-50" />
                        </div>
                      )}
                      <p className="text-[10px] italic text-muted-foreground text-center px-4">
                        {birthdayTab === 'fixed' ? "A fixed designer card with crystal rose theme." : "A personalized card placing your photo inside a magical frame."}
                      </p>
                    </div>

                    <Button 
                      disabled
                      className="w-full bg-rose-pink/20 text-muted-foreground h-12 rounded-xl font-bold uppercase tracking-widest text-[10px] cursor-not-allowed"
                    >
                      <Heart className="w-4 h-4 mr-2" /> Generate Card (Soon)
                    </Button>
                  </div>
                  <div className="p-6 rounded-2xl bg-rose-pink/5 text-xs italic text-muted-foreground text-center">
                    Enchanting birthday keepsakes are currently being woven by our artists.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="flex-1 w-full order-1 lg:order-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {mode === 'manual' ? (
              <motion.div 
                key="manual-canvas"
                ref={canvasRef}
                className="relative aspect-[3/4] w-full max-w-[560px] overflow-hidden rounded-[3rem] shadow-2xl bg-white border border-rose-pink/10"
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
                key="soon-display"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[720px] flex flex-col items-center"
              >
                <div className="text-center space-y-8 py-24 px-12 glass-morphism rounded-[4rem] border border-rose-pink/10 shadow-xl w-full">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-rose-pink/20 blur-2xl animate-pulse rounded-full" />
                    {mode === 'lore-weaver' ? <BookOpen className="w-full h-full text-rose-pink relative" /> :
                     mode === 'wall-art' ? <Sparkles className="w-full h-full text-rose-pink relative" /> :
                     <Heart className="w-full h-full text-rose-pink relative" />}
                  </div>
                  <div className="space-y-4">
                    <h2 className="font-headline text-4xl text-foreground">
                      {mode === 'lore-weaver' ? "Lore Weaver" : mode === 'wall-art' ? "Wall Art Creator" : "Birthday Card Studio"}
                    </h2>
                    <p className="font-headline italic text-2xl text-muted-foreground">Weave your magic to see it bloom here.</p>
                  </div>
                  <div className="h-px w-24 bg-rose-pink/20 mx-auto" />
                  <p className="text-sm font-headline italic text-muted-foreground/60 max-w-sm mx-auto">
                    Our AI models are currently in the sacred greenhouse, being nurtured to provide the most enchanting results.
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
