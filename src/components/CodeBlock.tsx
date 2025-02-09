import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { FaRegClipboard, FaCheck } from "react-icons/fa6";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "typescript" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const codeLanguage = language || code.match(/^(?:[\w-]+)\n/)?.[0]?.trim() || "typescript";
  const cleanCode = code.replace(/^(?:[\w-]+)\n/, "").trim();

  return (
    <div className="relative group rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-gray-200">
        <span className="text-sm font-mono">{codeLanguage}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
          title={copied ? "Copied!" : "Copy code"}
        >
          {copied ? <FaCheck className="w-4 h-4" /> : <FaRegClipboard className="w-4 h-4" />}
        </button>
      </div>

      <Highlight theme={themes.dracula} code={cleanCode} language={codeLanguage}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            style={style} 
            className="p-4 overflow-x-auto text-sm font-mono"
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell text-right pr-4 select-none text-gray-500 w-12">
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
