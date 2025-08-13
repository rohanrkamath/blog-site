import type { MDXComponents } from 'mdx/types'
import CodeBlock from './CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override the default <pre> element to use our custom CodeBlock
    pre: ({ children, ...props }) => {
      // Check if this is a code block
      if (children && typeof children === 'object' && 'props' in children) {
        const childProps = children.props
        if (childProps && childProps.className && childProps.className.includes('language-')) {
          return (
            <CodeBlock className={childProps.className}>
              {childProps.children}
            </CodeBlock>
          )
        }
      }
      
      // Default pre element for non-code content
      return <pre {...props}>{children}</pre>
    },
    
    // Override the default <code> element
    code: ({ children, className, ...props }) => {
      // If it's a code block (has className), let the pre element handle it
      if (className && className.includes('language-')) {
        return <code className={className} {...props}>{children}</code>
      }
      
      // Inline code styling
      return (
        <code 
          className="inline-code"
          {...props}
        >
          {children}
        </code>
      )
    },
    
    // Pass through all other components
    ...components,
  }
} 