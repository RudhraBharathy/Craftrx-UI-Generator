
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FrameworkSelector from './FrameworkSelector';
import { toast } from 'sonner';
import { Check, Copy } from 'lucide-react';

interface CodePreviewProps {
  code: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code = '// Generated code will appear here' }) => {
  const [framework, setFramework] = useState('react');
  const [copied, setCopied] = useState(false);
  
  const handleFrameworkChange = (newFramework: string) => {
    setFramework(newFramework);
    // In a real implementation, this would trigger conversion via AI
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    // Reset copied state when code changes
    setCopied(false);
  }, [code]);

  return (
    <div className="interactive-panel h-full flex flex-col">
      <div className="panel-header flex items-center justify-between">
        <h3 className="text-sm font-medium">Generated Code</h3>
        <button 
          onClick={handleCopyCode}
          className="text-xs px-2 py-1 flex items-center gap-1 bg-secondary rounded-md text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy Code
            </>
          )}
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <FrameworkSelector onSelect={handleFrameworkChange} />
        
        <Tabs defaultValue="component" className="flex-1 flex flex-col">
          <TabsList className="mb-2">
            <TabsTrigger value="component">Component</TabsTrigger>
            <TabsTrigger value="styles">Styles</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="component" className="flex-1 code-window overflow-auto bg-gray-50 dark:bg-gray-900 p-3 rounded-md !m-0">
            <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
              {code}
            </pre>
          </TabsContent>
          
          <TabsContent value="styles" className="flex-1 code-window overflow-auto bg-gray-50 dark:bg-gray-900 p-3 rounded-md !m-0">
            <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
              {`/* This component uses Tailwind CSS classes for styling */

/* You can customize the appearance by modifying the className props */

/* Example custom CSS:
.custom-component {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
*/`}
            </pre>
          </TabsContent>
          
          <TabsContent value="usage" className="flex-1 code-window overflow-auto bg-gray-50 dark:bg-gray-900 p-3 rounded-md !m-0">
            <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
              {code ? 
                `// Import the component
import ${code.split("const ")[1]?.split(" =")[0] || "Component"} from './Component';

// Use it in your application
function App() {
  return (
    <div>
      <${code.split("const ")[1]?.split(" =")[0] || "Component"}>
        Example Content
      </${code.split("const ")[1]?.split(" =")[0] || "Component"}>
    </div>
  );
}`
                : 
                `// Example usage code will appear here after generation`
              }
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodePreview;
