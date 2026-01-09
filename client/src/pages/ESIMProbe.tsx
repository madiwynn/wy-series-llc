import { Globe, Zap, Lock, TrendingUp, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';

export default function ESIMProbe() {
  const [selectedPlan, setSelectedPlan] = useState<'esim' | null>('esim');

  const features = [
    {
      icon: Globe,
      title: 'Global Connectivity',
      description: 'Access 200+ countries and territories with seamless coverage'
    },
    {
      icon: Zap,
      title: 'Instant Activation',
      description: 'Activate your eSIM in seconds, no physical cards required'
    },
    {
      icon: Lock,
      title: 'Carrier-Free Sovereignty',
      description: 'No contracts, no carrier lock-in, pure digital freedom'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Analytics',
      description: 'Monitor usage, costs, and coverage in real-time'
    },
    {
      icon: Users,
      title: 'Multi-Device Support',
      description: 'Use the same eSIM across multiple compatible devices'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption and data protection'
    }
  ];

  const coverage = [
    { region: 'North America', countries: 3, coverage: '99.9%' },
    { region: 'Europe', countries: 47, coverage: '99.8%' },
    { region: 'Asia Pacific', countries: 45, coverage: '99.5%' },
    { region: 'Latin America', countries: 35, coverage: '98.9%' },
    { region: 'Africa', countries: 54, coverage: '97.2%' },
    { region: 'Middle East', countries: 18, coverage: '98.5%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-wynnwillow-dark/5">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-wynnwillow-primary to-wynnwillow-accent flex items-center justify-center">
              <Globe className="w-6 h-6 text-wynnwillow-dark" />
            </div>
            <div>
              <h1 className="font-bold text-lg">UNIVERSAL eSIM</h1>
              <p className="text-xs text-muted-foreground">Sovereignty Platform</p>
            </div>
          </div>
          <StripeCheckoutButton label="Subscribe Now" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-wynnwillow-primary to-wynnwillow-accent bg-clip-text text-transparent">
            Global Connectivity Without Borders
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience true digital sovereignty with our carrier-free eSIM platform. No contracts, no lock-in, pure freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StripeCheckoutButton label="Get Started - $39/mo" size="lg" />
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-20">
        <h3 className="text-3xl font-bold mb-12 text-center">Why Choose Universal eSIM?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow border-border/50">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-wynnwillow-primary/20 to-wynnwillow-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-wynnwillow-primary" />
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Global Coverage */}
      <section className="container py-20 bg-card/50 rounded-2xl my-20">
        <h3 className="text-3xl font-bold mb-12 text-center">Global Coverage Map</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coverage.map((item, idx) => (
            <div key={idx} className="p-6 bg-background rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg">{item.region}</h4>
                <span className="text-wynnwillow-primary font-bold">{item.coverage}</span>
              </div>
              <p className="text-muted-foreground text-sm">{item.countries} countries & territories</p>
              <div className="mt-4 w-full bg-border rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-wynnwillow-primary to-wynnwillow-accent rounded-full"
                  style={{ width: item.coverage }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container py-20">
        <h3 className="text-3xl font-bold mb-12 text-center">Simple, Transparent Pricing</h3>
        <div className="max-w-md mx-auto">
          <Card className="p-8 border-2 border-wynnwillow-primary">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold mb-2">Universal eSIM Sovereignty</h4>
              <div className="text-4xl font-black text-wynnwillow-primary mb-2">
                $39<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">Recurring subscription, cancel anytime</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-wynnwillow-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-wynnwillow-primary" />
                </div>
                <span className="text-sm">Unlimited global connectivity</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-wynnwillow-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-wynnwillow-primary" />
                </div>
                <span className="text-sm">200+ countries and territories</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-wynnwillow-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-wynnwillow-primary" />
                </div>
                <span className="text-sm">No carrier contracts or lock-in</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-wynnwillow-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-wynnwillow-primary" />
                </div>
                <span className="text-sm">Real-time usage analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-wynnwillow-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-wynnwillow-primary" />
                </div>
                <span className="text-sm">24/7 priority support</span>
              </div>
            </div>

            <StripeCheckoutButton label="Subscribe to Universal eSIM" className="w-full py-6 px-8 text-lg" />

            <p className="text-center text-xs text-muted-foreground mt-4">
              Secure payment via Stripe • Cancel anytime • No questions asked
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 bg-gradient-to-r from-wynnwillow-dark/10 to-wynnwillow-primary/10 rounded-2xl text-center">
        <h3 className="text-3xl font-bold mb-4">Ready for True Digital Sovereignty?</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who have embraced carrier-free connectivity. No contracts, no lock-in, just pure freedom.
        </p>
        <StripeCheckoutButton label="Get Started Today" size="lg" />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Coverage</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Universal eSIM Sovereignty. All rights reserved. WYNNWILLOW CITYGATE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
