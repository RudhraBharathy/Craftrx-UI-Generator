
import React, { useState } from 'react';
import { cn } from '../lib/utils';

const frameworks = [
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
  },
  {
    id: 'svelte',
    name: 'Svelte',
    icon: '🔥',
  },
  {
    id: 'vue',
    name: 'Vue',
    icon: '💚',
  },
  {
    id: 'angular',
    name: 'Angular',
    icon: '🅰️',
  },
  {
    id: 'html',
    name: 'HTML/CSS',
    icon: '🌐',
  }
];

interface FrameworkSelectorProps {
  onSelect: (framework: string) => void;
}

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState('react');

  const handleSelect = (frameworkId: string) => {
    setSelected(frameworkId);
    onSelect(frameworkId);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Framework</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {frameworks.map((framework) => (
          <button
            key={framework.id}
            onClick={() => handleSelect(framework.id)}
            className={cn(
              "border rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
              selected === framework.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-secondary"
            )}
          >
            <span className="flex items-center gap-1.5">
              <span className="hidden sm:inline">{framework.name}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrameworkSelector;
