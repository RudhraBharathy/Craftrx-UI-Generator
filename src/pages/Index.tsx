import React, { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import Hero from "../components/Hero";
import ComponentPreview from "../components/ComponentPreview";
import CodePreview from "../components/CodePreview";
import CustomizationPanel from "../components/CustomizationPanel";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { generateComponent } from "@/lib/ai-service";
import { Loader2 } from "lucide-react";

const Index: React.FC = () => {
  const [description, setDescription] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);

    try {
      const result = await generateComponent({ prompt: description });
      setGeneratedCode(result.code);
    } catch (error) {
      console.error("Error generating component:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomize = (newCode: string) => {
    setGeneratedCode(newCode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Hero />

        <section className="py-20 px-4 md:px-0">
          <div className="container mx-auto max-w-6xl">
            <div
              className="text-center mb-12 animate-slide-up"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Create Components with AI
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Describe the UI component you want to create, and our AI will
                generate it for you.
              </p>
              
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the component you want to create..."
                    className="flex-1 min-h-[100px] p-3 rounded-md border border-border bg-background text-foreground"
                  />
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || !description.trim()}
                    className="sm:self-end px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in"
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            >
              <div className="space-y-6">
                <div className="h-[400px]">
                  <ComponentPreview
                    description={description}
                    code={generatedCode}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-[400px]">
                  <CodePreview code={generatedCode} />
                </div>

                <div className="h-[400px]">
                  <CustomizationPanel
                    onCustomize={handleCustomize}
                    generatedCode={generatedCode}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-0 bg-gradient-to-b from-transparent to-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Supported Frameworks</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Generate components for all popular frontend frameworks.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all">
                <div className="text-3xl mb-3">⚛️</div>
                <span className="font-medium">React</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🔥</div>
                <span className="font-medium">Svelte</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all">
                <div className="text-3xl mb-3">💚</div>
                <span className="font-medium">Vue</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🅰️</div>
                <span className="font-medium">Angular</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-md transition-all">
                <div className="text-3xl mb-3">🌐</div>
                <span className="font-medium">HTML/CSS</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-0">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to transform your UI workflow?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Start creating UI components with natural language today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn-primary py-2.5 px-6">
                      Get Started for Free
                    </button>
                    <button className="btn-outline py-2.5 px-6">
                      Schedule a Demo
                    </button>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 h-64 md:h-auto"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
