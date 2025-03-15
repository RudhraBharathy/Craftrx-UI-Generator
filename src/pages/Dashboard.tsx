
import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ComponentPreview from '@/components/ComponentPreview';
import CodePreview from '@/components/CodePreview';
import CustomizationPanel from '@/components/CustomizationPanel';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerate = (newDescription: string, code: string) => {
    setDescription(newDescription);
    setGeneratedCode(code);
  };
  
  const handleCustomize = (newCode: string) => {
    setGeneratedCode(newCode);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="mt-20 flex-1 p-4">
        <div className="mx-auto max-w-7xl pb-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {user?.email}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left side - Chatbot */}
            <div className="h-[80vh] overflow-hidden rounded-lg border shadow-sm">
              <div className="flex h-full flex-col">
                <div className="border-b p-4">
                  <h2 className="text-lg font-medium">Component Designer</h2>
                  <p className="text-sm text-muted-foreground">Describe your component and I'll generate it for you</p>
                </div>
                <div className="flex-1 overflow-hidden p-4">
                  <Chatbot onGenerate={handleGenerate} />
                </div>
              </div>
            </div>
            
            {/* Right side - Utility panels */}
            <div className="flex h-[80vh] flex-col space-y-6">
              {/* Preview */}
              <div className="h-1/3 overflow-hidden rounded-lg border shadow-sm">
                <ComponentPreview description={description} code={generatedCode} />
              </div>
              
              {/* Generated Code */}
              <div className="h-1/3 overflow-hidden rounded-lg border shadow-sm">
                <CodePreview code={generatedCode} />
              </div>
              
              {/* Customize */}
              <div className="h-1/3 overflow-hidden rounded-lg border shadow-sm">
                <CustomizationPanel onCustomize={handleCustomize} generatedCode={generatedCode} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
