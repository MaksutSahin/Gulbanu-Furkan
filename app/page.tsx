'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'tr' | 'en' | 'nl'>('tr');
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const t = {
    tr: {
      noteStart: "Katılım için lütfen davetiyenin sol tarafındaki ",
      noteButton: "DAVETİ YANITLA", 
      noteEnd: " butonunu kullanınız.",
      contactLink: "Sorularınız veya katılım durumunuzu doğrulamak için buradan bize ulaşabilirsiniz.",
      formTitle: "Kıymetli Misafirimiz,",
      namePlaceholder: "Adınız ve soyadınız...",
      attendanceLabel: "Katılım Durumunuz",
      attendingYes: "Seve seve aranızda olacağız! ✨",
      attendingNo: "Maalesef katılamayacağız, kalbimiz sizinle. 🕊️",
      guestCountLabel: "Kişi Sayısı",
      submitBtn: "Yanıtı İlet",
      submitting: "Yanıtınız iletiliyor...",
      success: "Teşekkür ederiz! Yanıtınız başarıyla alındı.",
      error: "Bir hata oluştu, lütfen tekrar deneyin.",
      contactTitle: "İletişim & Teyit",
      contactDesc: "Yanıtınızı güncellemek, katılım durumunuzu doğrulamak veya sorularınız için doğrudan bizimle iletişime geçebilirsiniz.",
      whatsappBtn: "WhatsApp İle İletişime Geç",
      whatsappMsg: "Merhaba,%20davetiye%20yanıtımı%20güncellemek/doğrulamak%20istiyorum.",
      address: "Rhoneweg 12-14, 1043 AH Amsterdam",
      locationTitle: "Etkinlik Adresi",
      mapBtn: "Haritada Aç"
    },
    en: {
      noteStart: "Please use the ",
      noteButton: "RSVP",
      noteEnd: " button on the left side of the invitation.",
      contactLink: "Contact us here to update your RSVP or for any other questions.",
      formTitle: "Dear Guest,",
      namePlaceholder: "Your first and last name...",
      attendanceLabel: "Attendance Status",
      attendingYes: "Joyfully accepts! ✨",
      attendingNo: "Regretfully declines, our hearts are with you. 🕊️",
      guestCountLabel: "Number of Guests",
      submitBtn: "Submit RSVP",
      submitting: "Submitting your response...",
      success: "Thank you! Your response has been successfully received.",
      error: "An error occurred, please try again.",
      contactTitle: "Contact & Verification",
      contactDesc: "You can reach out to us directly to update your response, verify details, or ask any questions.",
      whatsappBtn: "Contact via WhatsApp",
      whatsappMsg: "Hello,%20I%20would%20like%20to%20update/verify%20my%20RSVP.",
      address: "Rhoneweg 12-14, 1043 AH Amsterdam",
      locationTitle: "Event Location",
      mapBtn: "Open in Maps"
    },
    nl: {
      noteStart: "Gebruik alstublieft de ",
      noteButton: "RSVP",
      noteEnd: " knop aan de linkerkant van de uitnodiging.",
      contactLink: "Neem hier contact met ons op om uw antwoord bij te werken of voor vragen.",
      formTitle: "Beste Gast,",
      namePlaceholder: "Uw voor- en achternaam...",
      attendanceLabel: "Aanwezigheidsstatus",
      attendingYes: "Wij zijn er graag bij! ✨",
      attendingNo: "Helaas kunnen we niet komen, onze harten zijn bij jullie. 🕊️",
      guestCountLabel: "Aantal Gasten",
      submitBtn: "Reactie Verzenden",
      submitting: "Uw reactie wordt verzonden...",
      success: "Dank u! Uw reactie is succesvol ontvangen.",
      error: "Er is een fout opgetreden, probeer het opnieuw.",
      contactTitle: "Contact & Verificatie",
      contactDesc: "U kunt rechtstreeks contact met ons opnemen om uw reactie bij te werken, details te verifiëren of vragen te stellen.",
      whatsappBtn: "Contact via WhatsApp",
      whatsappMsg: "Hallo,%20ik%20wil%20graag%20mijn%20RSVP%20bijwerken/verifiëren.",
      address: "Rhoneweg 12-14, 1043 AH Amsterdam",
      locationTitle: "Locatie Evenement",
      mapBtn: "Open in Maps"
    }
  };

  const [formData, setFormData] = useState({ 
    name: '', 
    attending: t.tr.attendingYes, 
    guests: '1' 
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      attending: 
        prev.attending === t.tr.attendingYes || 
        prev.attending === t.en.attendingYes || 
        prev.attending === t.nl.attendingYes
          ? t[lang].attendingYes 
          : t[lang].attendingNo
    }));
  }, [lang]);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxMDlp2V7CmJsM9fBrSImZg271D1BMs33y-Z4oX-aqepjxxehlMTyFDLkTU-WM5vKPA/exec';
  const WHATSAPP_NUMBER = '15148844131';

  const isAttending = formData.attending === t[lang].attendingYes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t[lang].submitting);

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

      setStatus(t[lang].success);
      setTimeout(() => {
        setIsOpen(false);
        setStatus('');
        setFormData({ name: '', attending: t[lang].attendingYes, guests: '1' });
      }, 2500);
    } catch (error) {
      setStatus(t[lang].error);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .elegant-font { font-family: 'Cormorant Garamond', serif; } 
        
        @keyframes pointX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-point-x {
          animation: pointX 1.33s infinite ease-in-out; 
        }

        @keyframes softGlow {
          0%, 100% { 
            background-color: rgba(212, 175, 55, 0.15); 
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
          }
          50% { 
            background-color: rgba(212, 175, 55, 0.45); 
            box-shadow: 0 0 25px rgba(212, 175, 55, 0.8);
          }
        }
        .animate-soft-glow {
          animation: softGlow 2s infinite ease-in-out;
        }
      `}} />

      {/* DİL SEÇİCİ */}
      <div className="fixed top-6 right-4 sm:right-8 z-50 flex items-center bg-[#1e293b]/70 backdrop-blur-md rounded-full p-1.5 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        {['tr', 'en', 'nl'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l as 'tr' | 'en' | 'nl')}
            className={`relative px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              lang === l 
                ? 'text-white drop-shadow-md' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            {lang === l && (
              <span className="absolute inset-0 bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] rounded-full -z-10 shadow-inner"></span>
            )}
            <span className="relative z-10">{l}</span>
          </button>
        ))}
      </div>

      <main className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4 py-12 relative overflow-x-hidden">
        
        {/* ÜST KISIM: AÇIKLAMA VE BUTON */}
        <div className="text-center elegant-font max-w-2xl px-4 mb-6 mt-16 sm:mt-4">
          <p className="text-slate-300 text-lg md:text-xl italic tracking-wide leading-[2.8] inline-block">
            {t[lang].noteStart}
            
            <button 
              onClick={() => setIsOpen(true)}
              title={lang === 'tr' ? "LCV Formunu Aç" : "Open RSVP Form"}
              className="group relative inline-flex items-center justify-center align-middle mx-1.5 px-3 py-1 bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] hover:from-[#B0936C] hover:to-[#89683F] text-white font-bold rounded-lg border border-white/20 shadow-[0_2px_10px_rgba(157,123,79,0.3)] transition-all duration-300 whitespace-nowrap not-italic text-sm md:text-base cursor-pointer"
            >
              <span className="inline-flex items-center animate-point-x mr-1.5">
                <svg viewBox="0 0 24 24" fill="gold" className="w-4 h-4 transform rotate-90 drop-shadow-sm">
                  <path d="M13 22H9c-1.4 0-2.7-.6-3.6-1.6l-4.4-4.7.9-.9c.3-.3.8-.4 1.2-.2l2.9 1.5V6c0-1.1.9-2 2-2s2 .9 2 2v7.2l1.6-1c.5-.3 1.1-.3 1.6.1l4.8 3.6c.6.4 1 1 1 1.7V20c0 1.1-.9 2-2 2z"/>
                </svg>
              </span>
              <span className="tracking-widest drop-shadow-md">{t[lang].noteButton}</span>
            </button>
            
            {t[lang].noteEnd}
          </p>
        </div>

        {/* DAVETİYE GÖRSELİ */}
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-slate-800">
          <img
            key={lang} 
            src={lang === 'tr' ? "/davetiye-arkaplan.png" : (lang === 'nl' ? "/davetiye-arkaplan-nl.png" : "/davetiye-arkaplan-en.png")}
            alt={lang === 'tr' ? "Davetiye" : "Invitation"}
            className="w-full h-auto block animate-in fade-in duration-700"
          />

          <div 
            className="absolute z-40 flex items-center justify-end pr-1 pointer-events-none"
            style={{
              left: '0%', 
              top: '39.1%', 
              width: '11.5%', 
              height: '5.7%'  
            }}
          >
            <span className="animate-point-x text-[#C5A780] drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] flex-shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="transform rotate-90"
              >
                <path d="M13 22H9c-1.4 0-2.7-.6-3.6-1.6l-4.4-4.7.9-.9c.3-.3.8-.4 1.2-.2l2.9 1.5V6c0-1.1.9-2 2-2s2 .9 2 2v7.2l1.6-1c.5-.3 1.1-.3 1.6.1l4.8 3.6c.6.4 1 1 1 1.7V20c0 1.1-.9 2-2 2z"/>
              </svg>
            </span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="animate-soft-glow rounded-full transition-all"
            style={{
              position: 'absolute',
              left: '11.5%',
              top: '39.1%',
              width: '11.66%',
              height: '5.7%',
              backgroundColor: 'transparent',
              border: 'none',
              zIndex: 30,
              cursor: 'pointer'
            }}
            aria-label="RSVP Form"
          ></button>
        </div>

        {/* ==================================================== */}
        {/* YENİ VE DÜZELTİLMİŞ LOKASYON WIDGET'I                */}
        {/* ==================================================== */}
        <div className="mt-8 w-full max-w-md flex flex-col items-center p-6 bg-slate-800 border border-[#C5A880]/30 rounded-xl shadow-lg relative">
          
          {/* Harita İkonu */}
          <div className="mb-3 text-[#C5A880]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          {/* Başlık ve Adres */}
          <h3 className="elegant-font text-xl md:text-2xl text-[#C5A880] mb-2 text-center tracking-wide">
            {t[lang].locationTitle}
          </h3>
          
          {/* break-words ve w-full ile taşma engellendi */}
          <p className="text-slate-300 text-sm md:text-base text-center mb-6 w-full break-words px-2">
            {t[lang].address}
          </p>

          {/* Aksiyon Butonu - Renk kontrastı düzeltildi, mobilde tam genişlik */}
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Rhoneweg 12-14, 1043 AH Amsterdam")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-[#C5A880] text-slate-900 text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#b0946c] transition-colors duration-300 shadow-md"
          >
            <span>{t[lang].mapBtn}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        {/* ==================================================== */}

        {/* İLETİŞİM LİNKİ - ALT KISIM */}
        <div className="mt-10 text-center max-w-md px-4">
          <button 
            onClick={() => setIsContactOpen(true)}
            className="text-slate-400 hover:text-[#C5A880] text-sm underline-offset-4 hover:underline transition-colors duration-300"
          >
            {t[lang].contactLink}
          </button>
        </div>
      </main>

      {/* LCV MODAL (RSVP FORMU) */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="bg-slate-800 border border-[#C5A880]/30 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-5 text-slate-400 hover:text-white text-xl transition-colors"
            >✕</button>
            
            <h2 className="elegant-font text-3xl text-[#C5A880] mb-6 text-center tracking-wide">
              {t[lang].formTitle}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input 
                  required 
                  type="text" 
                  placeholder={t[lang].namePlaceholder} 
                  className="w-full p-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition-all placeholder:text-slate-500"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-slate-300 mb-2 text-sm">{t[lang].attendanceLabel}</label>
                <select 
                  className="w-full p-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white outline-none focus:border-[#C5A880] transition-all"
                  value={formData.attending}
                  onChange={e => setFormData({...formData, attending: e.target.value})}
                >
                  <option value={t[lang].attendingYes}>{t[lang].attendingYes}</option>
                  <option value={t[lang].attendingNo}>{t[lang].attendingNo}</option>
                </select>
              </div>

              {isAttending && (
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">{t[lang].guestCountLabel}</label>
                  <select 
                    className="w-full p-3.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white outline-none focus:border-[#C5A880] transition-all"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: e.target.value})}
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              )}

              <button 
                type="submit" 
                disabled={!!status}
                className="w-full py-3.5 mt-4 bg-gradient-to-r from-[#C5A880] to-[#9E7B4F] hover:from-[#B0936C] hover:to-[#89683F] text-white font-bold tracking-widest uppercase rounded-lg shadow-[0_4px_15px_rgba(157,123,79,0.3)] disabled:opacity-70 transition-all"
              >
                {status || t[lang].submitBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* İLETİŞİM MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="bg-slate-800 border border-[#C5A880]/30 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative text-center">
            <button 
              onClick={() => setIsContactOpen(false)} 
              className="absolute top-4 right-5 text-slate-400 hover:text-white text-xl transition-colors"
            >✕</button>
            
            <h2 className="elegant-font text-3xl text-[#C5A880] mb-4 tracking-wide">
              {t[lang].contactTitle}
            </h2>
            
            <p className="text-slate-300 mb-8 leading-relaxed">
              {t[lang].contactDesc}
            </p>
            
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${t[lang].whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold tracking-wide rounded-lg shadow-lg transition-all"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.553 4.148 1.603 5.955L.252 23.364l5.525-1.448A11.97 11.97 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.996c-1.785 0-3.535-.48-5.068-1.39l-.363-.217-3.766.987.997-3.67-.238-.378A9.976 9.976 0 012.003 12.03c0-5.533 4.502-10.035 10.028-10.035 5.534 0 10.035 4.502 10.035 10.035 0 5.533-4.501 10.035-10.035 10.035zm5.502-7.535c-.302-.151-1.785-.882-2.062-.983-.277-.101-.48-.151-.682.151-.202.302-.782.983-.958 1.184-.176.201-.353.226-.655.075-2.022-.983-3.32-2.128-4.305-3.82-.126-.226-.013-.353.138-.504.138-.138.302-.352.453-.528.151-.176.202-.302.302-.504.101-.201.05-.377-.025-.528-.076-.151-.682-1.645-.933-2.253-.245-.595-.494-.515-.682-.524-.176-.009-.378-.009-.58-.009-.202 0-.529.076-.806.378-.277.302-1.058 1.033-1.058 2.518 0 1.485 1.083 2.92 1.234 3.12.151.202 2.128 3.245 5.157 4.555.719.31 1.28.495 1.718.634.721.229 1.378.197 1.895.12.58-.087 1.785-.73 2.037-1.435.252-.705.252-1.31.176-1.435-.075-.126-.277-.202-.579-.353z"/>
              </svg>
              {t[lang].whatsappBtn}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
