'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  const [editorMode, setEditorMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null); // { id, type, data }
  const [editedContent, setEditedContent] = useState({}); // { [id]: data }
  const [hasUnsaved, setHasUnsaved] = useState(false);

  const enterEditor = useCallback(() => setEditorMode(true), []);
  const exitEditor  = useCallback(() => {
    setEditorMode(false);
    setSelectedElement(null);
  }, []);

  const selectElement = useCallback((el) => setSelectedElement(el), []);
  const clearSelection = useCallback(() => setSelectedElement(null), []);

  const updateContent = useCallback((id, data) => {
    setEditedContent(prev => ({ ...prev, [id]: { ...prev[id], ...data } }));
    setHasUnsaved(true);
  }, []);

  const getContent = useCallback((id, defaults) => {
    // Check localStorage first, then edited state, then defaults
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`editor_${id}`);
      if (stored) {
        try { return { ...defaults, ...JSON.parse(stored), ...editedContent[id] }; }
        catch {}
      }
    }
    return { ...defaults, ...editedContent[id] };
  }, [editedContent]);

  const saveAll = useCallback(() => {
    if (typeof window !== 'undefined') {
      Object.entries(editedContent).forEach(([id, data]) => {
        const existing = localStorage.getItem(`editor_${id}`);
        const prev = existing ? JSON.parse(existing) : {};
        localStorage.setItem(`editor_${id}`, JSON.stringify({ ...prev, ...data }));
      });
    }
    setHasUnsaved(false);
    setSelectedElement(null);
  }, [editedContent]);

  const resetAll = useCallback(() => {
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).filter(k => k.startsWith('editor_')).forEach(k => localStorage.removeItem(k));
    }
    setEditedContent({});
    setHasUnsaved(false);
    window.location.reload();
  }, []);

  return (
    <EditorContext.Provider value={{
      editorMode, enterEditor, exitEditor,
      selectedElement, selectElement, clearSelection,
      editedContent, updateContent, getContent,
      saveAll, resetAll, hasUnsaved,
    }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorProvider');
  return ctx;
}
