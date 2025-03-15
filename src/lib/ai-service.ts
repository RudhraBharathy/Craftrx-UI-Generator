import { toast } from "sonner";

// Define types for API requests and responses
export interface ComponentGenerationRequest {
  prompt: string;
  framework?: string;
}

export interface ComponentGenerationResponse {
  code: string;
  styling?: string;
  usageExample?: string;
}

const GEMINI_API_KEY = 'AIzaSyDmfmtV-qctAR68HEE-Dd8OMsl7dNFOsTQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function generateComponent(request: ComponentGenerationRequest): Promise<ComponentGenerationResponse> {
  try {
    console.log("Generating component with prompt:", request.prompt);
    
    const prompt = request.prompt;
    const framework = request.framework || 'react';
    
    // Create the Gemini API request body
    const geminiRequest = {
      contents: [
        {
          parts: [
            {
              text: `Generate a ${framework} component using Tailwind CSS based on this description: "${prompt}"

Please provide only the code for a reusable component without any explanations.
Use modern React with functional components.
Include appropriate props, types, and Tailwind CSS classes.
The component should be responsive and follow best practices.
Don't include any usage examples, just the component definition and export.
`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    // Call the Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Extract the generated code from the response
    let generatedCode = data.candidates[0]?.content?.parts[0]?.text || '';
    
    // Clean up the code by removing markdown code blocks if present
    generatedCode = generatedCode.replace(/```(jsx|tsx|javascript|react|js|typescript)?/g, '').replace(/```$/g, '').trim();
    
    // Extract component name for usage example
    const componentNameMatch = generatedCode.match(/const\s+(\w+)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Component';
    
    // Create a simple usage example
    const usageExample = `<${componentName} ${prompt.toLowerCase().includes('button') ? 'onClick={() => alert("Clicked!")}' : ''}>Example Content</${componentName}>`;
    
    return {
      code: generatedCode,
      styling: "/* Styling already included via Tailwind classes */",
      usageExample: usageExample
    };
  } catch (error) {
    console.error("Error generating component:", error);
    toast.error(`Failed to generate component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
}

// Keep the existing customizeComponent function
export async function customizeComponent(code: string, customization: string): Promise<string> {
  try {
    console.log("Customizing component with:", customization);
    
    // Call Gemini API to customize the component
    const geminiRequest = {
      contents: [
        {
          parts: [
            {
              text: `I have this React component code:

\`\`\`jsx
${code}
\`\`\`

Modify it based on these instructions: "${customization}"

Return ONLY the modified code without any explanations, markdown, or code blocks.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    // Call the Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Extract the customized code from the response
    let customizedCode = data.candidates[0]?.content?.parts[0]?.text || '';
    
    // Clean up the code by removing markdown code blocks if present
    customizedCode = customizedCode.replace(/```(jsx|tsx|javascript|react|js|typescript)?/g, '').replace(/```$/g, '').trim();
    
    return customizedCode;
  } catch (error) {
    console.error("Error customizing component:", error);
    toast.error(`Failed to customize component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    
    // Fallback to simple modifications if the API call fails
    return fallbackCustomize(code, customization);
  }
}

// Fallback customization function in case the API fails
function fallbackCustomize(code: string, customization: string): string {
  let customizedCode = code;
  
  if (customization.includes('red')) {
    customizedCode = customizedCode.replace(/bg-blue-\d+/g, 'bg-red-500');
    customizedCode = customizedCode.replace(/from-blue-\d+/g, 'from-red-500');
    customizedCode = customizedCode.replace(/to-blue-\d+/g, 'to-red-700');
    customizedCode = customizedCode.replace(/ring-blue-\d+/g, 'ring-red-500');
    customizedCode = customizedCode.replace(/border-blue-\d+/g, 'border-red-500');
    customizedCode = customizedCode.replace(/bg-black/g, 'bg-red-500');
  } else if (customization.includes('green')) {
    customizedCode = customizedCode.replace(/bg-blue-\d+/g, 'bg-green-500');
    customizedCode = customizedCode.replace(/from-blue-\d+/g, 'from-green-500');
    customizedCode = customizedCode.replace(/to-blue-\d+/g, 'to-green-700');
    customizedCode = customizedCode.replace(/ring-blue-\d+/g, 'ring-green-500');
    customizedCode = customizedCode.replace(/border-blue-\d+/g, 'border-green-500');
    customizedCode = customizedCode.replace(/bg-black/g, 'bg-green-500');
  } else if (customization.includes('blue')) {
    customizedCode = customizedCode.replace(/bg-red-\d+/g, 'bg-blue-500');
    customizedCode = customizedCode.replace(/from-red-\d+/g, 'from-blue-500');
    customizedCode = customizedCode.replace(/to-red-\d+/g, 'to-blue-700');
    customizedCode = customizedCode.replace(/ring-red-\d+/g, 'ring-blue-500');
    customizedCode = customizedCode.replace(/border-red-\d+/g, 'border-blue-500');
    customizedCode = customizedCode.replace(/bg-black/g, 'bg-blue-500');
  }
  
  if (customization.includes('rounded')) {
    customizedCode = customizedCode.replace(/rounded-lg/g, 'rounded-full');
    customizedCode = customizedCode.replace(/rounded-md/g, 'rounded-full');
    customizedCode = customizedCode.replace(/rounded(?!-)/g, 'rounded-full');
  }
  
  if (customization.includes('shadow')) {
    customizedCode = customizedCode.replace(/shadow-sm/g, 'shadow-lg');
    if (!customizedCode.includes('shadow')) {
      customizedCode = customizedCode.replace(/className={`/g, 'className={`shadow-lg ');
    }
  }
  
  return customizedCode;
}

// Helper functions kept for fallback purposes
function extractColor(prompt: string, type: string): string {
  const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'gray', 'black', 'white'];
  
  for (const color of colors) {
    if (prompt.includes(`${type} ${color}`)) {
      return `${type === 'background' ? 'bg' : 'text'}-${color}-500`;
    }
  }
  
  return type === 'background' ? 'bg-white' : 'text-gray-900';
}

function extractPadding(prompt: string): string {
  const sizes = ['small', 'medium', 'large'];
  const paddingMap = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6'
  };
  
  for (const size of sizes) {
    if (prompt.includes(`padding ${size}`)) {
      return paddingMap[size as keyof typeof paddingMap];
    }
  }
  
  return 'p-4';
}
