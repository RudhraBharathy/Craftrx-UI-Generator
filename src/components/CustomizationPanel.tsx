
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { customizeComponent } from '@/lib/ai-service';

interface CustomizationPanelProps {
  onCustomize: (newCode: string) => void;
  generatedCode: string;
}

const ColorOption = ({ color, selected, onClick }: { color: string, selected: boolean, onClick: () => void }) => (
  <button 
    className={`w-6 h-6 rounded-full transition-all ${selected ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110'}`}
    style={{ backgroundColor: color }}
    onClick={onClick}
  />
);

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ onCustomize, generatedCode }) => {
  const [prompt, setPrompt] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#2563eb');
  const [borderRadius, setBorderRadius] = useState(8);
  const [shadowSize, setShadowSize] = useState(2);
  const [paddingX, setPaddingX] = useState(16);
  const [paddingY, setPaddingY] = useState(8);
  const [fontWeight, setFontWeight] = useState('medium');
  const [fontSize, setFontSize] = useState(14);
  const [textColor, setTextColor] = useState('#ffffff');

  const handlePromptCustomize = async () => {
    if (!prompt.trim()) return;
    
    setIsCustomizing(true);
    try {
      const newCode = await customizeComponent(generatedCode, prompt);
      onCustomize(newCode);
    } catch (error) {
      console.error('Error customizing component:', error);
    } finally {
      setIsCustomizing(false);
      setPrompt('');
    }
  };

  const handleStyleCustomize = async () => {
    setIsCustomizing(true);
    
    try {
      // Build customization prompt from visual editor values
      const customizationPrompt = [
        `color: ${selectedColor}`,
        `borderRadius: ${borderRadius}px`,
        `shadow: ${shadowSize === 0 ? 'none' : shadowSize === 1 ? 'small' : shadowSize === 2 ? 'medium' : 'large'}`,
        `paddingX: ${paddingX}px`,
        `paddingY: ${paddingY}px`,
        `fontWeight: ${fontWeight}`,
        `fontSize: ${fontSize}px`,
        `textColor: ${textColor}`
      ].join(', ');
      
      const newCode = await customizeComponent(generatedCode, customizationPrompt);
      onCustomize(newCode);
    } catch (error) {
      console.error('Error customizing component style:', error);
    } finally {
      setIsCustomizing(false);
    }
  };

  return (
    <div className="interactive-panel h-full flex flex-col">
      <div className="panel-header">
        <h3 className="text-sm font-medium">Customize</h3>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <Tabs defaultValue="prompt" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="prompt" className="flex-1">Using Prompt</TabsTrigger>
            <TabsTrigger value="style" className="flex-1">Visual Editor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prompt" className="space-y-4 !m-0">
            <div className="space-y-4">
              <Textarea
                placeholder="Describe how you want to customize the component. For example: 'Make the button red with rounded corners and larger text.'"
                className="min-h-[100px] resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isCustomizing}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handlePromptCustomize}
                  disabled={!prompt.trim() || isCustomizing || !generatedCode}
                >
                  {isCustomizing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Customizing...
                    </>
                  ) : (
                    'Apply Changes'
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 !m-0">
            {/* Colors */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Background Color</h4>
              <div className="flex gap-2">
                <ColorOption color="#2563eb" selected={selectedColor === '#2563eb'} onClick={() => setSelectedColor('#2563eb')} />
                <ColorOption color="#8b5cf6" selected={selectedColor === '#8b5cf6'} onClick={() => setSelectedColor('#8b5cf6')} />
                <ColorOption color="#ec4899" selected={selectedColor === '#ec4899'} onClick={() => setSelectedColor('#ec4899')} />
                <ColorOption color="#f97316" selected={selectedColor === '#f97316'} onClick={() => setSelectedColor('#f97316')} />
                <ColorOption color="#10b981" selected={selectedColor === '#10b981'} onClick={() => setSelectedColor('#10b981')} />
              </div>
            </div>
            
            {/* Border Radius */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-muted-foreground">Border Radius</h4>
                <span className="text-xs text-muted-foreground">{borderRadius}px</span>
              </div>
              <Slider value={[borderRadius]} onValueChange={(values) => setBorderRadius(values[0])} max={20} step={1} />
            </div>
            
            {/* Shadow */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-muted-foreground">Shadow</h4>
                <span className="text-xs text-muted-foreground">
                  {shadowSize === 0 ? 'None' : shadowSize === 1 ? 'Small' : shadowSize === 2 ? 'Medium' : 'Large'}
                </span>
              </div>
              <Slider value={[shadowSize]} onValueChange={(values) => setShadowSize(values[0])} max={4} step={1} />
            </div>
            
            {/* Padding */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-muted-foreground">Padding X</h4>
                <span className="text-xs text-muted-foreground">{paddingX}px</span>
              </div>
              <Slider value={[paddingX]} onValueChange={(values) => setPaddingX(values[0])} max={40} step={1} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-muted-foreground">Padding Y</h4>
                <span className="text-xs text-muted-foreground">{paddingY}px</span>
              </div>
              <Slider value={[paddingY]} onValueChange={(values) => setPaddingY(values[0])} max={24} step={1} />
            </div>
            
            {/* Font */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Font Weight</h4>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  className={`border px-2 py-1 rounded-md text-xs ${fontWeight === 'normal' ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}
                  onClick={() => setFontWeight('normal')}
                >
                  Regular
                </button>
                <button 
                  className={`border px-2 py-1 rounded-md text-xs font-medium ${fontWeight === 'medium' ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}
                  onClick={() => setFontWeight('medium')}
                >
                  Medium
                </button>
                <button 
                  className={`border px-2 py-1 rounded-md text-xs font-bold ${fontWeight === 'bold' ? 'border-primary bg-primary/10 text-primary' : 'border-border'}`}
                  onClick={() => setFontWeight('bold')}
                >
                  Bold
                </button>
              </div>
            </div>
            
            {/* Font Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-muted-foreground">Font Size</h4>
                <span className="text-xs text-muted-foreground">{fontSize}px</span>
              </div>
              <Slider value={[fontSize]} onValueChange={(values) => setFontSize(values[0])} max={24} step={1} />
            </div>
            
            {/* Text Color */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground">Text Color</h4>
              <div className="flex gap-2">
                <ColorOption color="#ffffff" selected={textColor === '#ffffff'} onClick={() => setTextColor('#ffffff')} />
                <ColorOption color="#000000" selected={textColor === '#000000'} onClick={() => setTextColor('#000000')} />
                <ColorOption color="#94a3b8" selected={textColor === '#94a3b8'} onClick={() => setTextColor('#94a3b8')} />
                <ColorOption color="#f8fafc" selected={textColor === '#f8fafc'} onClick={() => setTextColor('#f8fafc')} />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleStyleCustomize}
                disabled={isCustomizing || !generatedCode}
              >
                {isCustomizing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  'Apply Style Changes'
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomizationPanel;
