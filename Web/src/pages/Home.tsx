import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Renova</h1>
          <nav className="flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/planos-publicos" className="font-medium hover:text-primary transition-colors">
              Planos
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            Transforme seu corpo, renove sua energia
          </h1>
          <Link to="/planos-publicos">
            <Button size="lg" className="text-lg px-8 py-6">
              Conheça nossos planos
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Sobre Nós</h2>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Academia Renova tem como propósito inspirar recomeços e superar limites, 
              promovendo saúde, motivação e autoconfiança em cada conquista. Acreditamos em 
              dinâmicas que desafiam o corpo e a mente, onde todos são bem-vindos para testar 
              e descobrir seus verdadeiros potenciais.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 Renova Academia. Todos os direitos reservados.</p>
            <a
              href="https://www.instagram.com/renova.academia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@renova.academia</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
