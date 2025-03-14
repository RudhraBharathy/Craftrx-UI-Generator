export const extractCodeInfo = (text: string) => {
    // Handle Markdown-style code blocks (Gemini)
    const markdownMatch = text.match(/```(\w+)?\n([\s\S]*?)```/);
    if (markdownMatch) {
      return { language: markdownMatch[1] || "text", code: markdownMatch[2].trim() };
    }
  
    // Handle JSON-wrapped StarCoder responses
    try {
      const parsed = JSON.parse(text);
      if (parsed.generated_text) {
        const extractedCode = extractCodeFromStarCoder(parsed.generated_text);
        return { language: "tsx", code: extractedCode };
      }
    } catch (error) {
      // Not valid JSON, continue checking other formats
    }
  
    // Default: treat the entire response as text
    return { language: "text", code: text.trim() };
  };
  
  // **New function to extract JSX code from StarCoder response**
  const extractCodeFromStarCoder = (responseText: string) => {
    const lines = responseText.split("\n");
  
    // Filter out instructional text and keep only JSX code
    const codeLines = lines.filter(
      (line) =>
        !line.startsWith("#") && // Remove instruction comments
        !line.toLowerCase().includes("generate") // Ignore command-like sentences
    );
  
    return codeLines.join("\n").trim();
  };
  