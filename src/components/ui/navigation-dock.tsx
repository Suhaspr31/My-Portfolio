import {
  Home,
  User,
  Zap,
  Briefcase,
  Mail,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from './dock';

const navItems = [
  {
    title: 'Home',
    icon: <Home className='h-full w-full' />,
    href: '/#home',
  },
  {
    title: 'About',
    icon: <User className='h-full w-full' />,
    href: '/#about',
  },
  {
    title: 'Skills',
    icon: <Zap className='h-full w-full' />,
    href: '/#skills',
  },
  {
    title: 'Projects',
    icon: <Briefcase className='h-full w-full' />,
    href: '/#featured-projects',
  },
  {
    title: 'Contact',
    icon: <Mail className='h-full w-full' />,
    href: '/#contact',
  },
];

export function NavigationDock() {
  return (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto'>
      <Dock className='items-end pb-3 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl px-4 py-2'>
        {navItems.map((item, idx) => (
          <a key={idx} href={item.href} className="pointer-events-auto">
            <DockItem
              className='aspect-square rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors'
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon className="p-2 text-neutral-800 dark:text-neutral-200">{item.icon}</DockIcon>
            </DockItem>
          </a>
        ))}
      </Dock>
    </div>
  );
}
