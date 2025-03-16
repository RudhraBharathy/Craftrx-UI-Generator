import React, { useEffect, useState } from "react";
import HeroBackground from "../assets/Main-background.jpg";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="pt-32 pb-20 h-dvh px-4 md:px-0 relative overflow-hidden"
      style={{
        backgroundImage: `url(${HeroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-75 animate-pulse"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-secondary/20 blur-2xl animate-float-slow"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="px-4 py-1.5 bg-primary/10 text-primary rounded-full mb-4 text-sm font-medium backdrop-blur-sm border border-primary/20 shadow-glow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isLoaded ? 1 : 0.8, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="inline-block animate-shimmer">Describe it.</span>
            <span className="mx-1">See it.</span>
            <span className="">Use it.</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Create UI Components with{" "}
            <span className="text-primary relative">
              Natural Language
              <span className="absolute bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Craftrx is an AI-powered UI generator that transforms your
            descriptions into beautiful, framework-ready components in seconds.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-14 bg-gradient-to-b from-primary/10 to-transparent p-1 rounded-xl border border-border shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="bg-card/80 rounded-lg p-4 overflow-hidden shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-start gap-2 mb-3">
              <motion.div
                className="w-3 h-3 rounded-full bg-destructive"
                initial={{ scale: 0 }}
                animate={{ scale: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 1.2 }}
              ></motion.div>
              <motion.div
                className="w-3 h-3 rounded-full bg-yellow-400"
                initial={{ scale: 0 }}
                animate={{ scale: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 1.3 }}
              ></motion.div>
              <motion.div
                className="w-3 h-3 rounded-full bg-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 1.4 }}
              ></motion.div>
              <motion.div
                className="ml-4 text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                Craftrx UI Generator
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <motion.div
                className="rounded-lg p-4 h-64 flex items-center justify-center text-muted-foreground border border-border relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <span>Component Preview Area</span>
              </motion.div>

              <motion.div
                className="rounded-lg p-4 h-64 flex flex-col border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <div className="text-sm font-medium mb-2 text-muted-foreground">
                  Describe your component:
                </div>
                <div className="flex-1 bg-card/90 rounded-md p-3 text-muted-foreground border border-border text-sm relative group">
                  <span className="opacity-70">
                    A modern blue button with rounded corners, subtle shadow,
                    and hover effect...
                  </span>
                  <motion.div
                    className="absolute right-3 top-3 h-4 w-0.5 bg-primary/50"
                    animate={{
                      opacity: [0, 1, 0],
                      height: [12, 16, 12],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                </div>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    className="bg-primary text-primary-foreground py-2 px-6 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 group relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="relative z-10">Generate</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent group-hover:translate-x-full transition-all duration-700 ease-in-out"></span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <Footer />
      </div>
    </section>
  );
};

export default Hero;
