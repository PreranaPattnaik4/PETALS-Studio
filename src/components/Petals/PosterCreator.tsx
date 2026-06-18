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
  Loader2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { useToast } from '@/hooks/use-toast';
import { 
  generateWallArt, 
  generateBirthdayCard, 
  generatePersonalizedBirthdayCard 
} from '@/ai/flows/generate-creator-art-flow';

interface StickerItem {
  id: string;
  url: string;
  x: number;
  y: number;
  scale: number;
  type: string;
}

type CreatorMode = 'manual' | 'wall-art' | 'birthday-card';

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
  const [activeTab, setActiveTab] = useState<'background' | 'stickers' | 'text'>('stickers');
  
  // Mode State
  const [mode, setMode] = useState<CreatorMode>('manual');
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResultImage, setAiResultImage] = useState<string | null>(null);
  
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

  const handlePersonalizedPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast({ variant: "destructive", title: "File too large", description: "Please upload a photo smaller than 4MB." });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPersonalizedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiGeneration = async () => {
    setIsGenerating(true);
    setAiResultImage(null);
    try {
      let result = "";
      if (mode === 'wall-art') {
        result = await generateWallArt();
      } else if (mode === 'birthday-card') {
        if (birthdaySubMode === 'fixed') {
          result = await generateBirthdayCard();
        } else {
          if (!personalizedPhoto || !birthdayName) {
            toast({ variant: "destructive", title: "Missing Information", description: "Please upload a photo and enter a name." });
            setIsGenerating(false);
            return;
          }
          result = await generatePersonalizedBirthdayCard({
            photoDataUri: personalizedPhoto,
            name: birthdayName
          });
        }
      }
      setAiResultImage(result);
      toast({ title: "Magic Complete!", description: "Your AI creation is ready." });
    } catch (err: any) {
      console.error(err);
      toast({ variant: "destructive", title: "Enchantment Failed", description: "The magic faded too soon. Please try again." });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPoster = async () => {
    setIsExporting(true);
    try {
      if (aiResultImage) {
        const link = document.createElement('a');
        link.download = `petals-ai-creation-${Date.now()}.png`;
        link.href = aiResultImage;
        link.click();
      } else if (canvasRef.current) {
        const url = await toPng(canvasRef.current, { cacheBust: true, quality: 1 });
        const link = document.createElement('a');
        link.download = `petals-manual-creation-${Date.now()}.png`;
        link.href = url;
        link.click();
      }
      toast({ title: "Success!", description: "Your magical creation has been saved." });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Failed to download. Please try again." });
    } finally {
      setIsExporting(false);
    }
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Look at this magical PETALS creation I made! ✨");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Top Mode Switcher */}
      <div className="flex justify-center gap-4 p-1.5 bg-rose-pink/5 rounded-3xl border border-rose-pink/10 w-fit mx-auto">
        <Button 
          variant={mode === 'manual' ? 'default' : 'ghost'} 
          onClick={() => { setMode('manual'); setAiResultImage(null); }}
          className={`rounded-2xl px-8 h-12 text-xs font-bold uppercase tracking-widest ${mode === 'manual' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          <Palette className="mr-2 w-4 h-4" /> Manual Designer
        </Button>
        <Button 
          variant={mode === 'wall-art' ? 'default' : 'ghost'} 
          onClick={() => { setMode('wall-art'); setAiResultImage(null); }}
          className={`rounded-2xl px-8 h-12 text-xs font-bold uppercase tracking-widest ${mode === 'wall-art' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          🌹 Wall Art Creator
        </Button>
        <Button 
          variant={mode === 'birthday-card' ? 'default' : 'ghost'} 
          onClick={() => { setMode('birthday-card'); setAiResultImage(null); }}
          className={`rounded-2xl px-8 h-12 text-xs font-bold uppercase tracking-widest ${mode === 'birthday-card' ? 'bg-rose-pink text-white' : 'text-muted-foreground'}`}
        >
          🎂 Birthday Card Creator
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-96 flex flex-col gap-6 order-2 lg:order-1">
          <div className="glass-morphism rounded-[2.5rem] p-8 space-y-8">
            
            {/* MANUAL MODE */}
            {mode === 'manual' && (
              <>
                <div className="flex gap-2 p-1 bg-rose-pink/10 rounded-2xl">
                  {(['stickers', 'background', 'text'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
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

                <div className="h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  <AnimatePresence mode="wait">
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
                        <Button onClick={() => fileInputRef.current?.click()} className="w-full h-14 rounded-2xl border-dashed border-2 border-rose-pink/30 bg-transparent text-rose-pink hover:bg-rose-pink/5">
                          <Upload className="mr-2 w-4 h-4" /> Upload Custom
                        </Button>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
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
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* AI WALL ART MODE */}
            {mode === 'wall-art' && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-3xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-2xl">🌹 Wall Art Creator</h3>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  Generate a premium fantasy wall art piece featuring the signature PETALS crystal rose and luxury typography.
                </p>
                <Button 
                  onClick={handleAiGeneration} 
                  disabled={isGenerating}
                  className="w-full h-14 bg-rose-pink text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-rose-pink/20"
                >
                  {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                  {isGenerating ? "Weaving Art..." : "Generate Wall Art"}
                </Button>
              </div>
            )}

            {/* AI BIRTHDAY CARD MODE */}
            {mode === 'birthday-card' && (
              <div className="space-y-8">
                <div className="flex gap-2 p-1 bg-rose-pink/10 rounded-2xl">
                  <button
                    onClick={() => setBirthdaySubMode('fixed')}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-1 ${
                      birthdaySubMode === 'fixed' ? "bg-white text-rose-pink shadow-sm" : "text-muted-foreground hover:text-rose-pink"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    🌸 PETALS Birthday Card
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

                {birthdaySubMode === 'personalized' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <Input 
                      placeholder="Birthday Person's Name" 
                      value={birthdayName}
                      onChange={(e) => setBirthdayName(e.target.value)}
                      className="bg-white/50 h-14 rounded-2xl border-rose-pink/20"
                    />
                    <Button 
                      variant="outline"
                      onClick={() => personalizedInputRef.current?.click()}
                      className="w-full h-14 rounded-2xl border-dashed border-2 border-rose-pink/30 flex flex-col items-center justify-center p-0 overflow-hidden"
                    >
                      {personalizedPhoto ? (
                        <div className="relative w-full h-full">
                          <Image src={personalizedPhoto} alt="Personalized preview" fill className="object-cover opacity-50" />
                          <div className="absolute inset-0 flex items-center justify-center text-rose-pink font-bold text-[10px] uppercase tracking-widest">
                            <RefreshCw className="w-4 h-4 mr-2" /> Change Photo
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-rose-pink text-[10px] font-bold uppercase tracking-widest">
                          <Upload className="w-4 h-4" /> Upload Person's Photo
                        </div>
                      )}
                    </Button>
                    <input type="file" ref={personalizedInputRef} onChange={handlePersonalizedPhotoUpload} className="hidden" accept="image/*" />
                  </motion.div>
                )}

                <div className="text-center space-y-4">
                  <Button 
                    onClick={handleAiGeneration} 
                    disabled={isGenerating || (birthdaySubMode === 'personalized' && (!personalizedPhoto || !birthdayName))}
                    className="w-full h-14 bg-rose-pink text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-rose-pink/20"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Cake className="w-4 h-4 mr-2" />}
                    {isGenerating ? "Preparing Surprise..." : "Generate Birthday Card"}
                  </Button>
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-rose-pink/10 space-y-4">
              <Button 
                onClick={downloadPoster}
                disabled={isExporting || (mode !== 'manual' && !aiResultImage)}
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
          <div className="relative p-12 bg-rose-pink/5 rounded-[5rem] border border-rose-pink/10 shadow-inner min-h-[700px] flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              {aiResultImage ? (
                <motion.div 
                  key="ai-result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-[3/4] w-full max-w-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white"
                >
                  <Image src={aiResultImage} alt="AI Created Art" fill className="object-cover" priority unoptimized />
                  <div className="absolute top-4 right-4 bg-rose-pink/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> AI Enchanted
                  </div>
                </motion.div>
              ) : isGenerating ? (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-rose-pink/20 border-t-rose-pink animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-pink w-8 h-8 animate-pulse" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-headline text-2xl">Weaving Magic...</p>
                    <p className="text-sm text-muted-foreground italic">Bringing your vision to life in the PETALS universe.</p>
                  </div>
                </motion.div>
              ) : mode === 'manual' ? (
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
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-6 max-w-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-rose-pink/10 flex items-center justify-center mx-auto text-rose-pink">
                    <Wand2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-headline text-xl">Ready for Enchantment?</p>
                    <p className="text-sm text-muted-foreground italic">Use the sidebar to generate a custom AI creation.</p>
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
