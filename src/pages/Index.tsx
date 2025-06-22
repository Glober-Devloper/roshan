import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import CertificationsSection from '@/components/CertificationsSection';
import FooterSection from '@/components/FooterSection';
import ChatbotSection from '@/components/ChatbotSection';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/roshan-uploads/45b85894-f8dc-40f3-aa6c-600a8306e7ff.png';
      link.type = 'image/png';
      document.head.appendChild(link);
    }
    
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Reduced loading time for faster experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // Optimized badge hiding - single function with better selectors
    const hideBadge = () => {
      const selectors = [
        '.gpte-badge', 
        '[class*="roshan"]', 
        '[class*="badge"]',
        '[class*="gpt-badge"]', 
        '[class*="love-badge"]',
        '[class*="edit-with"]',
        '[class^="love"]',
        '[id*="roshan"]',
        '[id*="badge"]',
        '[data-roshan]',
        'div[style*="position: fixed"][style*="bottom"]',
        'div[style*="position:fixed"][style*="bottom"]',
        'div[style*="z-index: 999"]',
        'div[style*="z-index:999"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const el = element as HTMLElement;
          if (el) {
            el.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; height: 0 !important; width: 0 !important; max-height: 0 !important; max-width: 0 !important; overflow: hidden !important; position: absolute !important; left: -9999px !important; top: -9999px !important; z-index: -9999 !important;';
          }
        });
      });
      
      // Handle iframes
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (iframe.src && (
          iframe.src.includes('roshan') || 
          iframe.src.includes('gpt') || 
          iframe.src.includes('badge')
        )) {
          const el = iframe as HTMLElement;
          el.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important;';
        }
      });
    };
    
    // Run badge hiding once immediately and then with reduced frequency
    hideBadge();
    const intervalId = setInterval(hideBadge, 2000);
    
    // Create and inject a style to hide the badge via CSS
    const style = document.createElement('style');
    style.textContent = `
      .gpte-badge, [class*="roshan"], [class*="badge"], [class*="gpt-badge"], [class*="love-badge"], [class*="edit-with"], [class^="love"], [id*="roshan"], [id*="badge"], [data-roshan], div[style*="position: fixed"][style*="bottom"], div[style*="position:fixed"][style*="bottom"], div[style*="z-index: 999"], div[style*="z-index:999"] { 
        display: none !important; 
        opacity: 0 !important; 
        visibility: hidden !important; 
        pointer-events: none !important;
        height: 0 !important;
        width: 0 !important;
        max-height: 0 !important;
        max-width: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        z-index: -9999 !important;
      }
    `;
    document.head.appendChild(style);
    
    // Optimized MutationObserver with throttling
    let observerTimeout: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      if (observerTimeout) clearTimeout(observerTimeout);
      observerTimeout = setTimeout(hideBadge, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
    
    return () => {
      clearTimeout(timer);
      clearTimeout(observerTimeout);
      // Reset scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = '';
      // Clean up interval
      clearInterval(intervalId);
      // Disconnect observer
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Navigation />
          <main className="bg-black text-white">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <CertificationsSection />
            <FooterSection />
            <ChatbotSection />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
