import { useState } from "react";

export interface Tag {
  id: string;
  label: string;
  createdAt: string;
  usageCount: number;
}

export const useTags = (initialTags: Tag[] = []) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const addTag = (tag: Tag) => {
    if (tag && !tags.includes(tag)) {
      setTags(prev => [...prev, tag]);
    }
  };

  const removeTag = (tagId: string) => {
    setTags(prev => prev.filter(t => t.id !== tagId));
  };

  const resetTags = () => {
    setTags(initialTags);
  };

  return {
    tags,
    addTag,
    removeTag,
    resetTags,
  };
};
