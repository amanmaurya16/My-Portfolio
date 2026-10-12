import React from 'react';
import {
  Box,
  Layers,
  Settings,
  Cog,
  Cpu,
  PenTool,
  Wrench,
  CheckCircle2,
  FolderGit2,
  Package
} from 'lucide-react';

export function renderCategoryIcon(iconName: string, className = 'w-6 h-6'): React.ReactNode {
  switch (iconName?.toLowerCase()) {
    case 'cube':
      return <Box className={className} />;
    case 'cubes':
      return <Layers className={className} />;
    case 'cogs':
    case 'cog':
      return <Cog className={className} />;
    case 'drafting':
    case 'pentool':
      return <PenTool className={className} />;
    case 'wrench':
    case 'tool':
      return <Wrench className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'project':
      return <FolderGit2 className={className} />;
    default:
      return <Settings className={className} />;
  }
}
