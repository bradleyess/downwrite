/*
Name:   Duotone Ganymede
*/

import { injectGlobal } from 'styled-components'

export default injectGlobal`
  :root {
    --keyword: #3274a9;
    --tag: #e2a500;
    --prev-normal: #4a5f78;
    --normal: #143550;
    --script: #e56353;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-size: 14px;
    line-height: 1.375;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    tab-size: 2;
    hyphens: none;
    background: #f4f5f5;
    color: #57718e;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1rem;
    overflow: auto;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #004a9e;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #004a9e;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: var(--normal);
  }

  .token.punctuation {
    color: var(--normal);
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.script {
    color: var(--tag);
  }

  .token.tag {
    color: var(--keyword);
  }

  .token.operator,
  .token.number {
    color: var(--script);
  }

  .token.property,
  .token.function {
    color: #57718e;
  }

  .token.tag-id,
  .token.selector,
  .token.atrule-id {
    color: #ebf4ff;
  }

  code.language-javascript,
  .token.attr-name {
    color: var(--keyword);
  }

  code.language-css,
  code.language-scss,
  .token.boolean,
  .token.string,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .language-scss .token.string,
  .style .token.string,
  .token.attr-value,
  .token.keyword,
  .token.control,
  .token.directive,
  .token.unit,
  .token.statement,
  .token.regex,
  .token.atrule {
    color: var(--keyword);
  }

  .token.placeholder,
  .token.variable {
    color: var(--keyword);
  }

  .token.deleted {
    text-decoration: line-through;
  }

  .token.inserted {
    border-bottom: 1px dotted #ebf4ff;
    text-decoration: none;
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.important {
    color: #7eb6f6;
  }

  .token.entity {
    cursor: help;
  }

  pre > code.highlight {
    outline: 0.4em solid #34659d;
    outline-offset: 0.4em;
  }
`
