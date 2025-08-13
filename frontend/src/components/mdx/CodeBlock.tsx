import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  children: string
  className?: string
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  // Extract language from className (e.g., "language-python" -> "python")
  const language = className?.replace('language-', '') || 'text'

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        <span className="language-label">{language.toUpperCase()}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 8px 8px',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        showLineNumbers={false}
        wrapLines={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
} 