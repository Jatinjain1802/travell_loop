import { Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, ArrowRight, 
  Star, Shield, Zap, Heart, Globe, Search 
} from 'lucide-react';
import { Button, Card, cn } from '@/components/common/UI';

export default function LandingPage() {
  return (
    <div className="space-y-32 py-10">
      {/* Hero Section - High Fidelity */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center space-y-12">
        {/* Background Mesh Gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="space-y-6 max-w-5xl animate-premium">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-glow mx-auto">
            <Zap className="h-4 w-4 fill-primary" />
            The Future of Travel Planning
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            Plan your next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-accent animate-gradient">Masterpiece.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Create professional itineraries, track expenses with precision, and explore the world with our AI-powered travel engine.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 animate-premium [animation-delay:200ms]">
          <Link to="/search">
            <Button size="xl" className="h-20 px-12 group shadow-2xl">
              Start Exploring
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Button variant="secondary" size="xl" className="h-20 px-12 glass border-white/5">
            Watch Demo
          </Button>
        </div>

        {/* Quick Search Bar - Accurate & Proper */}
        <div className="w-full max-w-4xl glass p-3 rounded-[32px] border-white/5 shadow-2xl animate-premium [animation-delay:400ms]">
          <div className="grid md:grid-cols-4 gap-2">
            <QuickSearchItem icon={MapPin} label="Location" placeholder="Where to?" />
            <QuickSearchItem icon={Calendar} label="Date" placeholder="Add dates" />
            <QuickSearchItem icon={Users} label="Travelers" placeholder="Add guests" />
            <Button className="h-full rounded-2xl">
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Destination Grid - Accurate Cards */}
      <section className="space-y-12">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-2 text-left">
            <h2 className="text-4xl font-black">Trending Destinations</h2>
            <p className="text-slate-500 font-bold">Hand-picked by our travel experts this week.</p>
          </div>
          <Button variant="ghost" className="group">
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DestinationCard 
            image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076"
            title="Ubud, Bali"
            rating="4.9"
            price="$1,200"
            tag="Adventure"
          />
          <DestinationCard 
            image="https://images.unsplash.com/photo-1506929197327-0e39634123d8?q=80&w=1964"
            title="Santorini, Greece"
            rating="5.0"
            price="$2,400"
            tag="Luxury"
          />
          <DestinationCard 
            image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070"
            title="Kyoto, Japan"
            rating="4.8"
            price="$1,850"
            tag="Culture"
          />
        </div>
      </section>

      {/* Features - Accurate & Minimal */}
      <section className="grid md:grid-cols-3 gap-12 pt-20 border-t border-white/5">
        <FeatureItem 
          icon={Globe} 
          title="World-Class Data" 
          desc="Access real-time travel data and hidden gems verified by locals."
        />
        <FeatureItem 
          icon={Shield} 
          title="Safe & Secure" 
          desc="Your data and travel documents are protected by enterprise encryption."
        />
        <FeatureItem 
          icon={Heart} 
          title="Built for You" 
          desc="Personalized AI suggestions that learn from your unique travel style."
        />
      </section>
    </div>
  );
}

function QuickSearchItem({ icon: Icon, label, placeholder }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary transition-colors">
        <Icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
      </div>
      <div className="text-left">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        <p className="text-sm font-bold text-white/80">{placeholder}</p>
      </div>
    </div>
  );
}

function DestinationCard({ image, title, rating, price, tag }) {
  return (
    <Card padding="none" className="group overflow-hidden">
      <div className="relative h-96 overflow-hidden">
        <img 
          src={image} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        <div className="absolute top-6 left-6 glass px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-black shadow-xl text-white">
          <Star className="h-4 w-4 text-accent fill-accent" />
          {rating}
        </div>
        <button className="absolute top-6 right-6 h-10 w-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-white">
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="p-8 space-y-4 text-left">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{tag}</span>
            <h3 className="text-2xl font-black text-white">{title}</h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-white">{price}</p>
            <p className="text-[10px] font-black uppercase text-slate-500">Avg. / Person</p>
          </div>
        </div>
        <Button className="w-full group/btn">
          Plan Trip
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
}

function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="space-y-6 p-8 rounded-[40px] hover:bg-white/[0.02] transition-colors group text-left">
      <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-glow">
        <Icon className="h-10 w-10 text-primary group-hover:text-white transition-colors" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-black">{title}</h3>
        <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
