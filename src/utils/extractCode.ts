export const extractCodeInfo = (text: string) => {
  const markdownMatch = text.match(/```(\w+)?\n([\s\S]*?)```/);
  if (markdownMatch) {
    return {
      language: markdownMatch[1] || "text",
      code: markdownMatch[2].trim(),
    };
  }

  try {
    const parsed = JSON.parse(text);
    if (parsed.generated_text) {
      const extractedCode = extractCodeFromStarCoder(parsed.generated_text);
      return { language: "tsx", code: extractedCode };
    }
  } catch (error) {
    console.error(error);
  }

  return { language: "text", code: text.trim() };
};

const extractCodeFromStarCoder = (responseText: string) => {
  const codeBlockMatch = responseText.match(/```[\w]*\n?([\s\S]*?)```/);
  if (codeBlockMatch) {
    const code = codeBlockMatch[1].trim();
    if (code.includes("{") && !isBalanced(code)) {
      return cleanupIncompleteCode(code);
    }
    return code;
  }

  const lines = responseText.split("\n");
  const codeLines = lines.filter(
    (line) =>
      !line.startsWith("##") &&
      !line.startsWith("#") &&
      !line.toLowerCase().includes("solution") &&
      line.trim() !== ""
  );

  return codeLines.join("\n").trim();
};

const isBalanced = (code: string) => {
  const stack = [];
  const openBrackets = "{[(";
  const closeBrackets = "}])";

  for (const char of code) {
    if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (closeBrackets.includes(char)) {
      const lastOpen = stack.pop();
      const matchingOpen = openBrackets[closeBrackets.indexOf(char)];
      if (lastOpen !== matchingOpen) return false;
    }
  }

  return stack.length === 0;
};

const cleanupIncompleteCode = (code: string) => {
  const lines = code.split("\n");
  let openBraces = 0;
  let cleanedLines = [];

  for (const line of lines) {
    cleanedLines.push(line);
    openBraces += (line.match(/{/g) || []).length;
    openBraces -= (line.match(/}/g) || []).length;

    if (openBraces === 0 && line.includes("}")) {
      break;
    }
  }

  return cleanedLines.join("\n");
};
