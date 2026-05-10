import { Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, ArrowRight, 
  Star, Shield, Zap, Heart, Globe, Search 
} from 'lucide-react';
import { Button, Card, cn } from '@/components/common/UI';

export default function LandingPage() {
  return (
    <div className="space-y-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 flex flex-col items-center text-center space-y-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="space-y-6 max-w-4xl animate-premium">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20 shadow-glow mx-auto">
            <Zap className="h-4 w-4 fill-primary" />
            Redefining the way you travel
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] text-secondary">
            Travel without <br />
            <span className="text-primary italic">Boundaries.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto font-bold leading-relaxed">
            The all-in-one platform to plan, book, and manage your trips with enterprise-grade precision and local-expert insights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 animate-premium [animation-delay:200ms]">
          <Link to="/search">
            <Button size="xl" className="h-20 px-12 group shadow-xl">
              Start Planning
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
          <Button variant="secondary" size="xl" className="h-20 px-12 glass">
            Explore Destinations
          </Button>
        </div>

        {/* Floating Logo / Identity */}
        <div className="pt-10 animate-premium [animation-delay:400ms]">
          <img src="/travelloop_logo.png" className="h-24 md:h-32 object-contain hover:scale-110 transition-transform duration-500 cursor-help" alt="Traveloop Logo" title="Start your loop" />
        </div>
      </section>

      {/* Featured Grid */}
      <section className="space-y-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-5xl font-black text-secondary leading-tight">Popular <br /> Destinations</h2>
            <div className="h-2 w-24 bg-primary rounded-full" />
          </div>
          <p className="text-muted font-bold max-w-md">
            Hand-picked by our community of professional travelers and local experts. Verified for safety and experience quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <DestinationCard 
            image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076"
            title="Bali, Indonesia"
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

      {/* Why Us */}
      <section className="bg-secondary text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-20 relative z-10">
          <FeatureItem 
            icon={Globe} 
            title="Global Network" 
            desc="Access real-time data from 150+ countries and thousands of local guides."
          />
          <FeatureItem 
            icon={Shield} 
            title="Safe Travel" 
            desc="Enterprise-grade security for your data and 24/7 emergency support."
          />
          <FeatureItem 
            icon={Zap} 
            title="AI Planner" 
            desc="Get personalized itineraries in seconds using our proprietary travel engine."
          />
        </div>
      </section>
    </div>
  );
}

function DestinationCard({ image, title, rating, price, tag }) {
  return (
    <Card padding="none" className="group overflow-hidden border-none shadow-premium">
      <div className="relative h-[400px] overflow-hidden">
        <img src={image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={title} />
        <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm font-black shadow-xl">
          <Star className="h-4 w-4 text-primary fill-primary" />
          {rating}
        </div>
        <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
           <Button className="w-full h-14 rounded-2xl">Plan This Trip</Button>
        </div>
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{tag}</span>
            <h3 className="text-2xl font-black text-secondary">{title}</h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-secondary">{price}</p>
            <p className="text-[10px] font-black uppercase text-muted tracking-tighter">Avg / person</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="space-y-6 text-center md:text-left">
      <div className="bg-primary/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto md:mx-0 shadow-glow">
        <Icon className="h-10 w-10 text-primary" />
      </div>
      <div className="space-y-3">
        <h3 className="text-3xl font-black text-white">{title}</h3>
        <p className="text-white/60 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
