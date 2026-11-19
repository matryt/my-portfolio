import { type ReactNode } from 'react';

/**
 * Parse les éléments inline Markdown :
 * - [texte](url) -> lien <a> avec target="_blank"
 * - ***texte*** -> <strong><em>texte</em></strong>
 * - **texte** -> <strong>texte</strong>
 * - *texte* ou _texte_ -> <em>texte</em>
 * - ~~texte~~ -> <del>texte</del>
 * - `code` -> <code>code</code>
 */
export const parseInlineFormatting = (text: string): ReactNode[] => {
  if (!text) return [];

  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*\*([^*]+)\*\*\*|\*\*([^*]+)\*\*|\*([^*]+)\*|~~([^~]+)~~|`([^`]+)`|_([^_]+)_)/g;
  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const [fullMatch, , linkText, linkUrl, boldItalicText, boldText, italicAsterisk, strikethroughText, codeText, italicUnderscore] = match;

    if (linkText && linkUrl) {
      elements.push(
        <a
          key={`link-${match.index}`}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
      );
    } else if (boldItalicText) {
      elements.push(
        <strong key={`bi-${match.index}`}>
          <em>{boldItalicText}</em>
        </strong>
      );
    } else if (boldText) {
      elements.push(<strong key={`b-${match.index}`}>{boldText}</strong>);
    } else if (italicAsterisk || italicUnderscore) {
      elements.push(<em key={`em-${match.index}`}>{italicAsterisk || italicUnderscore}</em>);
    } else if (strikethroughText) {
      elements.push(<del key={`del-${match.index}`}>{strikethroughText}</del>);
    } else if (codeText) {
      elements.push(<code key={`code-${match.index}`}>{codeText}</code>);
    } else {
      elements.push(fullMatch);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : [text];
};

/**
 * Transforme du texte multiligne / Markdown en JSX React :
 * - Gère les \n échappés et <br>
 * - Regroupe les puces (- ou *) en <ul><li>...</li></ul>
 * - Regroupe les listes numérotées (1., 2.) en <ol><li>...</li></ol>
 * - Gère les sous-titres (### Titre)
 * - Encapsule les paragraphes ordinaires en <p> avec support du gras, italique, code et liens
 */
export const splitMultiLineText = (text: string): ReactNode => {
  if (!text) return null;

  const normalized = text
    .replace(/\\n/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n');

  const lines = normalized.split('\n');
  const blocks: ReactNode[] = [];
  let currentBulletList: string[] = [];
  let currentNumberedList: string[] = [];

  const flushLists = () => {
    if (currentBulletList.length > 0) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="editorial-list">
          {currentBulletList.map((item, idx) => (
            <li key={idx}>{parseInlineFormatting(item)}</li>
          ))}
        </ul>
      );
      currentBulletList = [];
    }
    if (currentNumberedList.length > 0) {
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="editorial-ordered-list">
          {currentNumberedList.map((item, idx) => (
            <li key={idx}>{parseInlineFormatting(item)}</li>
          ))}
        </ol>
      );
      currentNumberedList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushLists();
      continue;
    }

    // Liste à puces (- ou *)
    if (/^[-*]\s+/.test(trimmed)) {
      if (currentNumberedList.length > 0) flushLists();
      currentBulletList.push(trimmed.replace(/^[-*]\s+/, ''));
      continue;
    }

    // Liste numérotée (1., 2., etc.)
    if (/^\d+\.\s+/.test(trimmed)) {
      if (currentBulletList.length > 0) flushLists();
      currentNumberedList.push(trimmed.replace(/^\d+\.\s+/, ''));
      continue;
    }

    flushLists();

    // Sous-titres (### Titre ou ## Titre)
    if (/^#{2,4}\s+/.test(trimmed)) {
      const headingText = trimmed.replace(/^#{2,4}\s+/, '');
      blocks.push(
        <h4 key={`h-${i}`} className="editorial-subheading">
          {parseInlineFormatting(headingText)}
        </h4>
      );
      continue;
    }

    // Paragraphe ordinaire
    blocks.push(
      <p key={`p-${i}`}>
        {parseInlineFormatting(trimmed)}
      </p>
    );
  }

  flushLists();

  return <>{blocks}</>;
};
