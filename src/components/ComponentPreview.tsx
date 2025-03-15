
import React, { useEffect, useState } from 'react';

interface ComponentPreviewProps {
  description: string;
  code: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ description, code }) => {
  const [previewHtml, setPreviewHtml] = useState<string>('');
  
  useEffect(() => {
    if (!code) return;
    
    // Enhanced extraction of component rendering logic
    try {
      // Extract the component name
      const matches = code.match(/const\s+(\w+)\s*=/);
      const componentName = matches?.[1] || 'Component';
      
      // Generate preview HTML based on component type and code content
      if (code.toLowerCase().includes('button')) {
        // Extract button classes from the code
        const classesMatch = code.match(/className=[`'"]{1}([^`'"]+)[`'"]{1}/);
        const classes = classesMatch ? classesMatch[1] : 'bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded';
        
        setPreviewHtml(`<button class="${classes.replace(/\${[^}]+}/g, '')}">Example Button</button>`);
      } else if (code.toLowerCase().includes('card')) {
        // Extract card styling
        const hasShadow = code.includes('shadow');
        const shadowClass = hasShadow ? 'shadow-lg' : 'shadow-sm';
        const hasImage = code.includes('image');
        
        setPreviewHtml(`
          <div class="overflow-hidden rounded-lg border border-gray-200 bg-white ${shadowClass} w-64">
            ${hasImage ? `<div class="w-full">
              <div class="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">Image Placeholder</div>
            </div>` : ''}
            <div class="p-4">
              <h3 class="text-lg font-medium text-gray-900">Card Title</h3>
              <p class="mt-2 text-sm text-gray-600">This is an example card description that might span multiple lines.</p>
            </div>
            <div class="border-t border-gray-200 bg-gray-50 px-4 py-3">
              <button class="text-sm text-blue-600 hover:text-blue-700">View Details</button>
            </div>
          </div>
        `);
      } else if (code.toLowerCase().includes('input')) {
        // Extract input field styling
        const hasLabel = code.includes('label');
        const isRequired = code.includes('required={true}') || code.includes('required={required}');
        
        setPreviewHtml(`
          <div class="space-y-1 max-w-md">
            ${hasLabel ? `<label class="block text-sm font-medium text-gray-700">
              Example Label ${isRequired ? '<span class="text-red-500">*</span>' : ''}
            </label>` : ''}
            <input 
              type="text" 
              placeholder="Example placeholder" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        `);
      } else if (code.toLowerCase().includes('avatar') || code.toLowerCase().includes('profile')) {
        setPreviewHtml(`
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">John Doe</p>
              <p class="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>
        `);
      } else if (code.toLowerCase().includes('toggle') || code.toLowerCase().includes('switch')) {
        setPreviewHtml(`
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" checked />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900">Toggle Switch</span>
          </label>
        `);
      } else if (code.toLowerCase().includes('alert') || code.toLowerCase().includes('notification')) {
        setPreviewHtml(`
          <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
            <div class="font-medium">Info alert!</div>
            <div>This is an example alert message.</div>
          </div>
        `);
      } else if (code.toLowerCase().includes('badge')) {
        setPreviewHtml(`
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Badge
          </span>
        `);
      } else {
        // Extract basic styling
        const classesMatch = code.match(/className=[`'"]([^`'"]+)[`'"]/);
        const classes = classesMatch ? classesMatch[1].replace(/\${[^}]+}/g, '') : 'p-4 border rounded-md';
        
        setPreviewHtml(`<div class="${classes}">Example ${componentName}</div>`);
      }
    } catch (error) {
      console.error('Error generating preview:', error);
      setPreviewHtml('<div class="text-red-500">Error generating preview</div>');
    }
  }, [code]);
  
  return (
    <div className="interactive-panel h-full flex flex-col">
      <div className="panel-header">
        <h3 className="text-sm font-medium">Preview</h3>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-10 bg-[#fcfcfc] dark:bg-gray-900 bg-grid-pattern overflow-auto">
        <div className="w-full h-full flex items-center justify-center">
          {description && code ? (
            <div 
              className="preview-container" 
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            <div className="text-muted-foreground text-sm">
              Your component will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;
