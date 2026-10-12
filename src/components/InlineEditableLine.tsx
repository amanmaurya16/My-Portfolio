import React from 'react';
import { Edit2 } from 'lucide-react';

interface InlineEditableLineProps {
  value: string;
  isEditable?: boolean;
  onEdit?: () => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export const InlineEditableLine: React.FC<InlineEditableLineProps> = ({
  value,
  isEditable = false,
  onEdit,
  className = '',
  as: Component = 'span',
}) => {
  if (!isEditable || !onEdit) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <Component
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
      className={`group relative cursor-pointer hover:outline-dashed hover:outline-2 hover:outline-blue-500 rounded px-1 transition-all inline-flex items-center gap-1.5 ${className}`}
      title="Click to edit text"
    >
      <span>{value}</span>
      <Edit2 className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </Component>
  );
};
