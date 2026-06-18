
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
  Check
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

export function PosterCreator() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bgImage, setBgImage] = useState(PlaceHolderImages.find(img => img.id === 'crystal-rose-universe')?.imageUrl || "");
  const [title, setTitle] = useState("A Tale of Magic");
  const [description, setDescription] = useState("Where petals bloom and wonders never cease.");
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [activeTab, setActiveTab] = useState<'background' | 'stickers' | 'text'>('stickers');
  const [isExporting, setIsExporting] = useState(false);

  const characterStickers = PlaceHolderImages.filter(img => 
    img.id.startsWith('char-') || img.id === 'petals-logo'
  );

  const backgroundPresets = PlaceHolderImages.filter(img => 
    img.id.startsWith('gallery-') || img.id === 'crystal-rose-universe'
  );

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPoster = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(canvasRef.current, { cacheBust: true, quality: 1 });
      const link = document.createElement('a');
      link.download = `petals-creation-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast({ title: "Success!", description: "Your magical poster has been downloaded." });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Failed to download poster. Please try again." });
    } finally {
      setIsExporting(false);
    }
  };

  const shareOnWhatsApp = async () => {
    const text = encodeURIComponent("Look at this magical poster I created with PETALS Studio! ✨");
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-6 order-2 lg:order-1">
        <div className="glass-morphism rounded-[2.5rem] p-6 space-y-6">
          <div className="flex gap-2 p-1 bg-rose-pink/10 rounded-2xl">
            {(['stickers', 'background', 'text'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? "bg-white text-rose-pink shadow-sm" 
                    : "text-muted-foreground hover:text-rose-pink"
                }`}
              >
                {tab === 'stickers' && <Sticker className="w-3.5 h-3.5 mx-auto mb-1" />}
                {tab === 'background' && <ImageIcon className="w-3.5 h-3.5 mx-auto mb-1" />}
                {tab === 'text' && <Type className="w-3.5 h-3.5 mx-auto mb-1" />}
                {tab}
              </button>
            ))}
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <AnimatePresence mode="wait">
              {activeTab === 'stickers' && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {characterStickers.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => addSticker(char.imageUrl)}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-rose-pink/10 hover:border-rose-pink group transition-all"
                    >
                      <Image src={char.imageUrl} alt={char.id} fill className="object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Sparkles className="text-white w-6 h-6" />
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {activeTab === 'background' && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-12 rounded-xl border-dashed border-2 border-rose-pink/30 bg-transparent text-rose-pink hover:bg-rose-pink/5"
                  >
                    <Upload className="mr-2 w-4 h-4" /> Upload Custom
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {backgroundPresets.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setBgImage(bg.imageUrl)}
                        className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                          bgImage === bg.imageUrl ? "border-rose-pink" : "border-transparent"
                        }`}
                      >
                        <Image src={bg.imageUrl} alt={bg.id} fill className="object-cover" />
                        {bgImage === bg.imageUrl && (
                          <div className="absolute top-2 right-2 bg-rose-pink text-white rounded-full p-1 shadow-md">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'text' && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Title</label>
                    <Input 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-white/50 h-12 rounded-xl border-rose-pink/20"
                      placeholder="Enter a caption..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lore Snippet</label>
                    <Textarea 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-white/50 rounded-xl border-rose-pink/20 min-h-[100px]"
                      placeholder="Write a magical story..."
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>

          <div className="pt-6 border-t border-rose-pink/10 space-y-3">
            <Button 
              onClick={downloadPoster}
              disabled={isExporting}
              className="w-full bg-rose-pink text-white h-12 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-rose-pink/20"
            >
              {isExporting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Download PNG
            </Button>
            <Button 
              variant="outline"
              onClick={shareOnWhatsApp}
              className="w-full border-rose-pink text-rose-pink h-12 rounded-2xl font-bold uppercase tracking-widest text-xs"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 w-full order-1 lg:order-2">
        <div className="relative p-8 bg-rose-pink/5 rounded-[4rem] border border-rose-pink/10 shadow-inner">
          <div 
            ref={canvasRef}
            className="relative aspect-[3/4] w-full max-w-[500px] mx-auto overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white group cursor-crosshair"
          >
            {/* Background Layer */}
            <Image 
              src={bgImage} 
              alt="Poster Background" 
              fill 
              className="object-cover pointer-events-none"
              priority
            />

            {/* Content Layer (Glassmorphism Overlay) */}
            <div className="absolute inset-x-8 bottom-8 p-8 glass-morphism rounded-[2.5rem] text-center space-y-3 pointer-events-none">
              <h2 className="font-headline text-3xl md:text-4xl text-foreground drop-shadow-sm">{title}</h2>
              <p className="text-sm italic font-headline text-muted-foreground leading-relaxed drop-shadow-sm">
                {description}
              </p>
              <div className="pt-4 flex items-center justify-center gap-2 opacity-50">
                <div className="h-px w-8 bg-rose-pink" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">PETALS STUDIO</span>
                <div className="h-px w-8 bg-rose-pink" />
              </div>
            </div>

            {/* Sticker Layer */}
            {stickers.map((sticker) => (
              <motion.div
                key={sticker.id}
                drag
                dragMomentum={false}
                initial={{ x: sticker.x, y: sticker.y, scale: 0.5 }}
                animate={{ scale: sticker.scale }}
                className="absolute w-32 h-32 cursor-move z-20 group/sticker"
                style={{ top: sticker.y, left: sticker.x }}
              >
                <div className="relative w-full h-full">
                  <Image src={sticker.url} alt="sticker" fill className="object-contain drop-shadow-xl" />
                  
                  {/* Sticker Controls */}
                  <div className="absolute -top-4 -right-4 flex gap-1 opacity-0 group-hover/sticker:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateSticker(sticker.id, { scale: sticker.scale + 0.1 }); }}
                      className="bg-white text-rose-pink p-1.5 rounded-full shadow-lg border border-rose-pink/20"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateSticker(sticker.id, { scale: Math.max(0.2, sticker.scale - 0.1) }); }}
                      className="bg-white text-rose-pink p-1.5 rounded-full shadow-lg border border-rose-pink/20"
                    >
                      <Minimize2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeSticker(sticker.id); }}
                      className="bg-rose-pink text-white p-1.5 rounded-full shadow-lg"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Aesthetic Grain/Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </div>

          {/* Tips */}
          <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground text-xs italic font-headline">
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-rose-pink" /> Click stickers to resize or delete</span>
            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-rose-pink" /> Drag characters to position them</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-y-auto custom-scrollbar ${className}`}>
      {children}
    </div>
  );
}
