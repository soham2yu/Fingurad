import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, BarChart3, Zap, Lock } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-background/50 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">FinGuard AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="hover:bg-white/5 text-muted-foreground hover:text-foreground">
                  Login
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                  Access Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
            Secure the Future of <br />
            <span className="text-primary">Digital Finance</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced anomaly detection powered by machine learning. Identify fraud, flagged transactions, and risk patterns in real-time.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300">
                Start Monitoring Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-card/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Real-time Detection</h3>
              <p className="text-muted-foreground">
                Process thousands of transactions per second with sub-millisecond latency. Catch anomalies as they happen.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Visual insights into risk distribution and anomaly reasons. Make data-driven decisions instantly.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Bank-grade encryption and security protocols ensure your financial data remains protected at all times.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 FinGuard AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
