'use client';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [formData, setFormData] = useState({ 
    name: '', 
    attending: 'Seve seve aranızda olacağız! ✨', 
    guests: '1' 
  });
  const [status, setStatus] = useState('');

  const GOOGLE_SCRIPT_URL = 'BURAYA_GOOGLE_APPS_SCRIPT_URL_YAPIŞTIRIN';
  
  // İletişim için WhatsApp numaranız (Ülke kodu ile, örn: 905xxxxxxxxx)
  const WHATSAPP_NUMBER = '15148844131';

  const isAttending = formData.attending.includes('Seve seve');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Yanıtınız iletiliyor...');

    const finalData = {
      ...formData,
      guests: isAttending ? formData.guests : '-'
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
      setStatus('Teşekkür ederiz! Yanıtınız başarıyla alındı.');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('');
        setFormData({ name: '', attending: 'Seve seve aranızda olacağız! ✨', guests: '1' });
      }, 2500);
    } catch (error) {
      setStatus('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-2 sm:p-4 py-8">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .elegant-font { font-family: 'Cormorant Garamond', serif; }

        @keyframes roseBloom {
          0% {
            opacity: 0;
            transform: scale(0.85) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        .animate-rose-bloom {
          animation: roseBloom 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes sparkleSweep {
          0% {
            transform: translateX(-100%) rotate(25deg);
          }
          100% {
            transform: translateX(200%) rotate(25deg);
          }
        }
        .animate-sparkle {
          animation: sparkleSweep 1.2s ease-in-out 0.3s forwards;
        }

        /* YENİ EKLENEN: Sağa-Sola Zıplama Animasyonu */
        @keyframes pointX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); } /* Parmağın ne kadar sağa gideceği */
        }
        .animate-point-x {
          animation: pointX 1s infinite ease-in-out;
        }
      `}} />

      {/* 1. KISIM: DAVETİYE GÖRSELİ VE HAYALET BUTON */}
      <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <img
          src="/davetiye-arkaplan.png"
          alt="Davetiye"
          className="w-full h-auto block"
        />

        {/* Orijinal Butonunuz (Hiç Dokunulmadı) */}
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            left: '11.5%',
            top: '39.1%',
            width: '11.66%',
            height: '5.7%',
            backgroundColor: 'transparent',
            border: 'none',
            zIndex: 20,
            cursor: 'pointer'
          }}
          title="LCV Formunu Aç"
          aria-label="LCV Formunu Aç"
        />

        {/* YATAYDA HAREKET EDEN YENİ PARMAK İŞARETİ */}
        <span 
          className="animate-point-x pointer-events-none select-none drop-shadow-md"
          style={{
            position: 'absolute',
            left: '5%',
            top: '39.5%',
            fontSize: '26px',
            zIndex: 20
          }}
          aria-hidden="true"
        >
          👉
        </span>
      </div>

      {/* 2. KISIM: RESMİN ALTINDAKİ YALIN YAZI (Tıklanınca İrtibat Pop-up'ı Açılır) */}
      <div className="mt-6 text-center elegant-font max-w-md px-4">
        <p 
          onClick={() => setIsContactOpen(true)}
          className="text-slate-300 hover:text-white text-lg tracking-wide cursor-pointer underline underline-offset-4 decoration-[#C5A880]/60 hover:decoration-white transition-all italic"
        >
          Yanıtınızı değiştirmek, doğrulamak veya başka bir konu için buradan bize ulaşın.
        </p>
      </div>

      {/* 3. KISIM: LCV FORM POP-UP */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
          
          <div className="relative w-full max-w-sm">

            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 z-50 w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-white hover:from-[#B0936C] hover:to-[#89683F] font-bold text-lg border-2 border-[#FDFBF7] shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all transform hover:scale-110"
              title="Kapat"
            >
              ✕
            </button>

            <div 
              className="w-full max-h-[95vh] relative flex flex-col overflow-hidden animate-rose-bloom elegant-font bg-[#FDFBF7] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[5px] border-[#C5A880] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 pt-10"
            >
              
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-tl-[3rem] rounded-br-[3rem]">
                <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sparkle" />
              </div>

              <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <img 
                  src="https://www.svgrepo.com/show/308892/rose-flower-nature-floral.svg" 
                  alt="Rose Background" 
                  className="w-full h-auto opacity-[0.04] rotate-12 scale-125 mix-blend-multiply"
                />
              </div>

              <div className="relative z-10 flex flex-col w-full h-full">
                
                <div className="text-center mb-6 pb-4 border-b border-[#C5A880]/30">
                  <p className="text-lg text-slate-700 italic tracking-wide">
                    Rhoneweg 12-14, 1043 AH Amsterdam
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                  
                  <div className="flex flex-col">
                    <label className="block text-xl font-bold text-slate-800 mb-2 italic">Kıymetli Misafirimiz,</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Adınız ve soyadınız..." 
                      className="w-full p-4 rounded-xl border-2 border-[#C5A880]/40 focus:outline-none focus:border-[#9E7B4F] focus:ring-2 focus:ring-[#9E7B4F]/20 text-slate-800 bg-white/95 backdrop-blur-sm text-lg transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] placeholder:text-slate-400 placeholder:italic" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="block text-xl font-bold text-slate-800 mb-2 italic">Katılım Durumunuz</label>
                    <select 
                      className="w-full p-4 rounded-xl border-2 border-[#C5A880]/40 focus:outline-none focus:border-[#9E7B4F] focus:ring-2 focus:ring-[#9E7B4F]/20 text-slate-800 bg-white/95 backdrop-blur-sm text-[16px] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] cursor-pointer" 
                      value={formData.attending} 
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                    >
                      <option value="Seve seve aranızda olacağız! ✨">Seve seve aranızda olacağız! ✨</option>
                      <option value="Maalesef katılamayacağız, kalbimiz sizinle. 🕊️">Maalesef katılamayacağız, kalbimiz sizinle. 🕊️</option>
                    </select>
                  </div>
                  
                  {isAttending && (
                    <div className="flex flex-col items-center animate-in fade-in duration-300 pb-6">
                      <label className="block text-xl font-bold text-slate-800 mb-2 italic text-center w-full">Kişi Sayısı</label>
                      <select 
                        className="w-1/2 p-4 rounded-xl border-2 border-[#C5A880]/40 focus:outline-none focus:border-[#9E7B4F] focus:ring-2 focus:ring-[#9E7B4F]/20 text-slate-800 bg-white/95 backdrop-blur-sm text-lg text-center transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] cursor-pointer"
                        value={formData.guests} 
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      >
                        <option value="1">1 Kişi</option>
                        <option value="2">2 Kişi</option>
                        <option value="3">3 Kişi</option>
                        <option value="4">4 Kişi</option>
                        <option value="5">5 Kişi</option>
                        <option value="6">6 Kişi</option>
                        <option value="7">7 Kişi</option>
                        <option value="8">8 Kişi</option>
                        <option value="9">9 Kişi</option>
                        <option value="10">10 Kişi</option>
                      </select>
                    </div>
                  )}

                  <div className="pt-2 flex justify-center">
                    <button 
                      type="submit" 
                      className="w-1/2 min-w-[160px] bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] hover:from-[#B0936C] hover:to-[#89683F] text-white text-xl font-bold tracking-wider py-3.5 px-6 rounded-2xl border-[2.5px] border-[#FDFBF7]/60 shadow-[0_8px_20px_-4px_rgba(157,123,79,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Yanıtı İlet
                    </button>
                  </div>

                  {status && (
                    <p className="text-center text-lg font-bold text-slate-700 mt-2 italic">{status}</p>
                  )}
                </form>
              </div>
              
            </div>
          </div>

        </div>
      )}

      {/* 4. KISIM: İRTİBAT & DÜZELTME POP-UP (Tamamen aynı tasarımsal dilde) */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
          
          <div className="relative w-full max-w-sm">

            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute -top-4 -right-4 z-50 w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] text-white hover:from-[#B0936C] hover:to-[#89683F] font-bold text-lg border-2 border-[#FDFBF7] shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all transform hover:scale-110"
              title="Kapat"
            >
              ✕
            </button>

            <div 
              className="w-full relative flex flex-col overflow-hidden animate-rose-bloom elegant-font bg-[#FDFBF7] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[5px] border-[#C5A880] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 pt-10"
            >
              
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-tl-[3rem] rounded-br-[3rem]">
                <div className="absolute -inset-full top-0 block w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-sparkle" />
              </div>

              <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <img 
                  src="https://www.svgrepo.com/show/308892/rose-flower-nature-floral.svg" 
                  alt="Rose Background" 
                  className="w-full h-auto opacity-[0.04] rotate-12 scale-125 mix-blend-multiply"
                />
              </div>

              <div className="relative z-10 flex flex-col w-full text-center space-y-6">
                
                <h3 className="text-2xl font-bold text-slate-800 italic pb-3 border-b border-[#C5A880]/30">
                  İletişim & Teyit
                </h3>

                <p className="text-lg text-slate-700 italic leading-relaxed">
                  Yanıtınızı güncellemek, katılım durumunuzu doğrulamak veya sorularınız için doğrudan bizimle iletişime geçebilirsiniz.
                </p>

                <div className="pt-2 flex justify-center">
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Merhaba,%20davetiye%20yanıtımı%20güncellemek/doğrulamak%20istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] hover:from-[#B0936C] hover:to-[#89683F] text-white text-lg font-bold tracking-wider py-3.5 px-6 rounded-2xl border-[2.5px] border-[#FDFBF7]/60 shadow-[0_8px_20px_-4px_rgba(157,123,79,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    WhatsApp İle İletişime Geç
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

    </main>
  );
}