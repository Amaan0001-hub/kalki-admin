import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Ticker } from "@/components/landing/Ticker";
import { Features } from "@/components/landing/Features";
import { Process } from "@/components/landing/Process";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { Security } from "@/components/landing/Security";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import LoginPage from "./(auth)/login/page";


export default function HomePage() {
  return (
    <>
    
      <main>
       <LoginPage/>
      
      </main>
      
    </>
  );
}
