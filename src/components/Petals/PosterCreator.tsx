"use client";

import React, { useState, useRef } from 'react';
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
  Cake,
  Palette,
  User,
  Loader2,
  Info,
  CheckCircle2,
  Clock
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

type CreatorMode = 'manual' | 'wall-art' | 'birthday-card';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export function PosterCreator() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const personalizedInputRef = useRef<HTMLInputElement>(null);

  // Manual Mode State
  const [bgImage, setBgImage] = useState(PlaceHolderImages.find(img => img.id === 'crystal-rose-universe')?.imageUrl || "");
  const [title, setTitle] = useState("A Tale of Magic");
  const [description, setDescription] = useState("Where petals bloom and wonders never cease.");
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [activeTab, setActiveTab] = useState<'background' | 'stickers' | 'text' | 'guide'>('stickers');
  
  // Mode State
  const [mode, setMode] = useState<CreatorMode>('manual');
  const [isExporting, setIsExporting] = useState(false);
  
  // Birthday Card sub-mode state
  const [birthdaySubMode, setBirthdaySubMode] = useState<'fixed' | 'personalized'>('fixed');
  const [birthdayName, setBirthdayName] = useState("");
  const [personalizedPhoto, setPersonalizedPhoto] = useState<string | null>(null);

  const characterStickers = PlaceHolderImages.filter(img => 
    img.id.startsWith('char-') || img.id === 'petals-logo'
  );

  const backgroundPresets = PlaceHolderImages.filter(img => 
    img.id.startsWith('gallery-') || img.id === 'crystal-rose-universe'
  );

  // Image Optimization Logic
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

  const validateFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Unsupported Format",
        description: "Please upload a JPG, PNG, or WebP image."
      });
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Image size must be less than 5 MB."
      });
      return false;
    }
    return true;
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
    setStickers([...stickers, newSticker]);
  };

  const removeSticker = (id: string) => {
    setStickers(stickers.filter(s => s.id !== id));
  };

  const updateSticker = (id: string, updates: Partial<StickerItem>) => {
    setStickers(stickers.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      try {
        const optimized = await optimizeImage(file);
        setBgImage(optimized);
        toast({ title: "Image Uploaded", description: "Your custom background has been added." });
      } catch (err) {
        toast({ variant: "destructive", title: "Upload Failed", description: "Could not process image." });
      }
    }
  };

  const handlePersonalizedPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      try {
        const optimized = await optimizeImage(file);
        setPersonalizedPhoto(optimized);
        toast({ title: "Photo Ready", description: "Your photo has been optimized." });
      } catch (err) {
        toast({ variant: "destructive", title: "Upload Failed", description: "Could not process image." });
      }
    }
  };

  const downloadPoster = async () => {
    if (mode !== 'manual') {
      toast({ title: "Feature Coming Soon", description: "AI image export is currently in development." });
      return;
    }
    
    setIsExporting(true);
    try {
      if (canvasRef.current) {
        const url = await toPng(canvasRef.current, { cacheBust: true, quality: 1 });
        const link = document.createElement('a');
        link.download = `petals-manual-creation-${Date.now()}.png`;
        link.href = url;
        link.click();
      }
      toast({ title: "Success!", description: "Your creation has been saved." });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Failed to download. Please try again." });
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
      {/* Top Mode Switcher */}
      <div className="flex flex-wrap justify-center gap-4 p-1.5 bg-rose-pink/5 rounded-3xl border border-rose-pink/10 w-fit mx-auto">
        <Button 
          variant={mode === 'manual' ? 'default' : 'ghost'} 
          onClick={() => setMode('manual')}
          className={`rounded-2xl px-8 h-12 text-xs font-bold uppercase tracking-widest ${mode === 'manual' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          <Palette className="mr-2 w-4 h-4" /> Manual Designer
        </Button>
        <Button 
          variant={mode === 'wall-art' ? 'default' : 'ghost'} 
          onClick={() => setMode('wall-art')}
          className={`relative rounded-2xl px-8 h-12 text-xs font-bold uppercase tracking-widest ${mode === 'wall-art' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          🌹 Wall Art Creator
          <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[8px] px-2 py-0.5 rounded-full border border-rose-pink/20 shadow-sm">Soon</span>
        </Button>
        <Button 
          variant={mode === 'birthday-card' ? 'default' : 'ghost'} 
          onClick={() => setMode('birthday-card')}
          className={`relative rounded-2xl px-8 h-12 text-xs font-bold uppercase tracking-widest ${mode === 'birthday-card' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          🎂 Birthday Card Creator
          <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[8px] px-2 py-0.5 rounded-full border border-rose-pink/20 shadow-sm">Soon</span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 flex flex-col gap-6 order-2 lg:order-1">
          <div className="glass-morphism rounded-[2.5rem] p-8 space-y-8">
            
            <div className="flex gap-1 p-1 bg-rose-pink/10 rounded-2xl">
              {(['stickers', 'background', 'text', 'guide'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-1.5 ${
                    activeTab === tab 
                      ? "bg-white text-rose-pink shadow-sm" 
                      : "text-muted-foreground hover:text-rose-pink"
                  }`}
                >
                  {tab === 'stickers' && <Sticker className="w-3.5 h-3.5" />}
                  {tab === 'background' && <ImageIcon className="w-3.5 h-3.5" />}
                  {tab === 'text' && <Type className="w-3.5 h-3.5" />}
                  {tab === 'guide' && <Info className="w-3.5 h-3.5" />}
                  {tab === 'guide' ? 'Studio' : tab}
                </button>
              ))}
            </div>

            <div className="h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'guide' ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="p-6 rounded-[2rem] bg-rose-pink/5 border border-rose-pink/10 space-y-4">
                      <h4 className="font-headline text-xl text-rose-pink">Studio Guidelines</h4>
                      <div className="space-y-4 text-sm italic font-headline text-muted-foreground">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-rose-pink mt-1 shrink-0" />
                          <p><span className="font-bold not-italic">Max Upload:</span> 5 MB</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-rose-pink mt-1 shrink-0" />
                          <p><span className="font-bold not-italic">Formats:</span> JPG, PNG, WebP</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-rose-pink mt-1 shrink-0" />
                          <p><span className="font-bold not-italic">Resolution:</span> Up to 4000px</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-rose-pink/10 text-[10px] italic leading-relaxed text-muted-foreground">
                        Manual designs are available now. AI-assisted creation is currently in development.
                      </div>
                    </div>
                  </motion.div>
                ) : mode === 'manual' ? (
                  <>
                    {activeTab === 'stickers' && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-2 gap-4">
                        {characterStickers.map((char) => (
                          <button key={char.id} onClick={() => addSticker(char.imageUrl)} className="relative aspect-square rounded-2xl overflow-hidden border border-rose-pink/10 hover:border-rose-pink group transition-all">
                            <Image src={char.imageUrl} alt={char.id} fill className="object-cover group-hover:scale-110 transition-transform" />
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'background' && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="space-y-2">
                          <Button onClick={() => fileInputRef.current?.click()} className="w-full h-14 rounded-2xl border-dashed border-2 border-rose-pink/30 bg-transparent text-rose-pink hover:bg-rose-pink/5 flex flex-col gap-1 items-center justify-center p-0">
                            <div className="flex items-center gap-2">
                              <Upload className="w-4 h-4" /> <span>Upload Background</span>
                            </div>
                          </Button>
                          <p className="text-[10px] text-center text-muted-foreground italic">
                            Upload a photo (JPG, PNG, WebP • Max 5 MB)
                          </p>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".jpg,.jpeg,.png,.webp" />
                        <div className="grid grid-cols-2 gap-4">
                          {backgroundPresets.map((bg) => (
                            <button key={bg.id} onClick={() => setBgImage(bg.imageUrl)} className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${bgImage === bg.imageUrl ? "border-rose-pink" : "border-transparent"}`}>
                              <Image src={bg.imageUrl} alt={bg.id} fill className="object-cover" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'text' && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <Input placeholder="Main Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-white/50 h-14 rounded-2xl border-rose-pink/20" />
                        <Textarea placeholder="Lore Snippet" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-white/50 rounded-2xl border-rose-pink/20 min-h-[120px]" />
                      </motion.div>
                    )}
                  </>
                ) : mode === 'wall-art' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                    <div className="w-16 h-16 rounded-3xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl">🌹 Wall Art Creator</h3>
                    <div className="p-4 rounded-xl bg-accent/10 border border-rose-pink/10 text-[11px] italic text-muted-foreground leading-relaxed">
                      AI generation is currently being fine-tuned. Use the manual designer to create signature art while you wait.
                    </div>
                    <Button 
                      disabled
                      className="w-full h-14 bg-rose-pink/20 text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs"
                    >
                      Coming Soon
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div className="flex gap-2 p-1 bg-rose-pink/10 rounded-2xl">
                      <button
                        onClick={() => setBirthdaySubMode('fixed')}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-1 ${
                          birthdaySubMode === 'fixed' ? "bg-white text-rose-pink shadow-sm" : "text-muted-foreground hover:text-rose-pink"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        🌸 PETALS Design
                      </button>
                      <button
                        onClick={() => setBirthdaySubMode('personalized')}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-1 ${
                          birthdaySubMode === 'personalized' ? "bg-white text-rose-pink shadow-sm" : "text-muted-foreground hover:text-rose-pink"
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        📸 Personalized Photo
                      </button>
                    </div>

                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 rounded-3xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-8 h-8" />
                      </div>
                      <h3 className="font-headline text-2xl">Birthday Magic Soon</h3>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        Our birthday card weavers are preparing the magical templates. This feature will be blooming soon.
                      </p>
                      <Button 
                        disabled
                        className="w-full h-14 bg-rose-pink/20 text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs"
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-8 border-t border-rose-pink/10 space-y-4">
              <Button 
                onClick={downloadPoster}
                disabled={isExporting || mode !== 'manual'}
                className="w-full bg-rose-pink text-white h-14 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs shadow-xl shadow-rose-pink/20"
              >
                {isExporting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                Download Creation
              </Button>
              <Button 
                variant="outline"
                onClick={shareOnWhatsApp}
                className="w-full border-rose-pink text-rose-pink h-14 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs"
              >
                <Share2 className="w-4 h-4 mr-2" /> Share on WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 w-full order-1 lg:order-2">
          <div className="relative p-12 bg-rose-pink/5 rounded-[5rem] border border-rose-pink/10 shadow-inner min-h-[750px] flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              {mode === 'manual' ? (
                <motion.div 
                  key="manual-canvas"
                  ref={canvasRef}
                  className="relative aspect-[3/4] w-full max-w-[500px] overflow-hidden rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white group cursor-crosshair"
                >
                  <Image src={bgImage} alt="Poster Background" fill className="object-cover pointer-events-none" priority />

                  <div className="absolute inset-x-8 bottom-8 p-10 glass-morphism rounded-[3rem] text-center space-y-4 pointer-events-none">
                    <h2 className="font-headline text-3xl md:text-4xl text-foreground">{title}</h2>
                    <p className="text-sm italic font-headline text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                    <div className="pt-4 flex items-center justify-center gap-3 opacity-30">
                      <div className="h-px w-12 bg-rose-pink" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em]">PETALS STUDIO</span>
                      <div className="h-px w-12 bg-rose-pink" />
                    </div>
                  </div>

                  {stickers.map((sticker) => (
                    <motion.div
                      key={sticker.id}
                      drag
                      dragMomentum={false}
                      initial={{ x: sticker.x, y: sticker.y, scale: 0.5 }}
                      animate={{ scale: sticker.scale }}
                      className="absolute w-36 h-36 cursor-move z-20 group/sticker"
                      style={{ top: sticker.y, left: sticker.x }}
                    >
                      <div className="relative w-full h-full">
                        <Image src={sticker.url} alt="sticker" fill className="object-contain drop-shadow-2xl" />
                        <div className="absolute -top-6 -right-6 flex gap-2 opacity-0 group-hover/sticker:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); updateSticker(sticker.id, { scale: sticker.scale + 0.1 }); }} className="bg-white text-rose-pink p-2 rounded-full shadow-lg border border-rose-pink/20"><Maximize2 className="w-4 h-4" /></button>
                          <button onClick={(e) => { e.stopPropagation(); updateSticker(sticker.id, { scale: Math.max(0.2, sticker.scale - 0.1) }); }} className="bg-white text-rose-pink p-2 rounded-full shadow-lg border border-rose-pink/20"><Minimize2 className="w-4 h-4" /></button>
                          <button onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }} className="bg-rose-pink text-white p-2 rounded-full shadow-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="ai-coming-soon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-6 max-w-sm"
                >
                  <div className="w-24 h-24 rounded-full bg-rose-pink/10 flex items-center justify-center mx-auto text-rose-pink animate-pulse">
                    <Clock className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20">
                      <Sparkles className="w-3.5 h-3.5" /> Coming Soon
                    </div>
                    <h2 className="font-headline text-3xl">AI Enchantment</h2>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      Our weavers are currently crafting the AI models for this mode. Please use the <strong>Manual Designer</strong> to create your magical posters in the meantime.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
