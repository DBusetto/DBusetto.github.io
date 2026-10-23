import { Code, FolderOpen, House, Mail, User, type LucideIcon } from 'lucide-react'

export type SectionId = 'top' | 'about' | 'skills' | 'projects' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
  icon: LucideIcon
}

// Voci della barra, nell'ordine delle sezioni della home
export const navItems: readonly NavItem[] = [
  { id: 'top', label: 'Home', icon: House },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export const sectionIds: readonly SectionId[] = navItems.map((item) => item.id)
