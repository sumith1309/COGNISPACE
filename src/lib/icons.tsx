import * as LucideIcons from 'lucide-react';

export function getIcon(name: string) {
  const Icon = (LucideIcons as any)[name];
  return Icon || null;
}
