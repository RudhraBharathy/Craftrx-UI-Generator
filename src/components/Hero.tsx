
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4 md:px-0">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto animate-slide-up " style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className="px-3 py-1 bg-primary/10 text-primary rounded-full mb-4 text-sm font-medium">
            Describe it. See it. Use it.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Create UI Components with{' '}
            <span className="text-primary">Natural Language</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl">
            Craftrx is an AI-powered UI generator that transforms your descriptions into beautiful, 
            framework-ready components in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary py-3 px-8 font-medium text-base">
              Try it Now
            </button>
            <button className="btn-outline py-3 px-8 font-medium text-base">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-b from-primary/5 to-transparent p-1 rounded-xl border border-border animate-scale-in " style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <div className="bg-card rounded-lg p-4 overflow-hidden shadow-sm">
            <div className="flex items-center justify-start gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 text-xs text-muted-foreground">Craftrx UI Generator</div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 h-64 flex items-center justify-center text-muted-foreground">
                Component Preview Area
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 h-64 flex flex-col">
                <div className="text-sm font-medium mb-2 text-muted-foreground">Describe your component:</div>
                <div className="flex-1 bg-card rounded-md p-3 text-muted-foreground border border-border text-sm">
                  A modern blue button with rounded corners, subtle shadow, and hover effect...
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="btn-primary py-2 px-4 text-sm">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
