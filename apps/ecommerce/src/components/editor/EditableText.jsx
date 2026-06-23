'use client';

import { useEditor } from '@/context/EditorContext';

/**
 * Envolve qualquer texto em um elemento editável inline quando em modo editor.
 * Props:
 *   id        - identificador único do conteúdo
 *   field     - chave dentro do objeto de conteúdo
 *   defaults  - objeto com valores padrão { [field]: 'texto padrão' }
 *   tag       - elemento HTML (default: 'span')
 *   className - classes CSS do elemento
 */
export function EditableText({ id, field, defaults, tag: Tag = 'span', className = '', children }) {
  const { editorMode, getContent, updateContent } = useEditor();

  const content = getContent(id, defaults);
  const value = content[field] ?? defaults[field] ?? children ?? '';

  if (!editorMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={e => updateContent(id, { [field]: e.currentTarget.innerText })}
      className={`${className} outline-2 outline-dashed outline-[#23A79D]/60 outline-offset-2 rounded cursor-text
        hover:outline-[#23A79D] focus:outline-[#23A79D] focus:outline-solid transition-all`}
      title="Clique para editar"
    >
      {value}
    </Tag>
  );
}
