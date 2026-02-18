"use client";

import * as React from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  title: string;
  href: string;
};

type Props = {
  items: NavItem[];
};

export default function CNavigationMenu({ items }: Props) {
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';

    return (
        <NavigationMenu.Root className="min-w-max rounded-lg p-1 text-foreground transition-colors">
            <NavigationMenu.List className="relative flex">
                {items.map((item) => (
                    <NavigationMenu.Item key={item.href}>
                        <Link className={triggerClassName} href={`/${locale}${item.href}`}>
                            {item.title}
                        </Link>
                    </NavigationMenu.Item>
                ))}
            </NavigationMenu.List>

            <NavigationMenu.Portal>
                <NavigationMenu.Positioner
                    sideOffset={10}
                    collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
                    collisionAvoidance={{ side: 'none' }}
                    className="box-border z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] data-[instant]:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:right-[-10px] data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:left-[-10px] data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:bottom-[-10px] data-[side=top]:before:left-0 data-[side=top]:before:h-2.5"
                    style={{
                        ['--duration' as string]: '0.35s',
                        ['--easing' as string]: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                >
                    <NavigationMenu.Popup className="data-[ending-style]:easing-[ease] relative h-[var(--popup-height)] origin-[var(--transform-origin)] rounded-lg bg-popover text-popover-foreground shadow-lg shadow-black/5 outline outline-1 outline-border transition-[opacity,transform,width,height,scale,translate] duration-[var(--duration)] ease-[var(--easing)] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[ending-style]:duration-150 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 w-[var(--popup-width)] min-[32rem]:w-[var(--popup-width)]">
                        <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
                    </NavigationMenu.Popup>
                </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
        </NavigationMenu.Root>
    );
}

function Link(props: NavigationMenu.Link.Props) {
    return (
        <NavigationMenu.Link
            render={
                <NextLink href={props.href!} />
            }
            {...props}
        />
    );
}

const triggerClassName =
    'box-border flex items-center justify-center gap-1.5 h-10 ' +
    'px-2 min-[32rem]:px-3.5 m-0 rounded-md bg-transparent text-foreground font-medium transition-colors ' +
    'text-[0.925rem] min-[32rem]:text-base leading-6 select-none no-underline ' +
    'hover:bg-accent hover:text-accent-foreground active:bg-accent data-[popup-open]:bg-accent ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring focus-visible:relative';
