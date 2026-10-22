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
  { id: 'about', label: 'Chi sono', icon: User },
  { id: 'skills', label: 'Competenze', icon: Code },
  { id: 'projects', label: 'Progetti', icon: FolderOpen },
  { id: 'contact', label: 'Contatti', icon: Mail },
]

export const sectionIds: readonly SectionId[] = navItems.map((item) => item.id)
