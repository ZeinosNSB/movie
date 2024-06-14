import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

import { cn } from '@/lib/utils'

const TabsContext = React.createContext(null)

function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within a <Tabs />')
  }
  return context
}

const Tabs = React.forwardRef(({ className, orientation = 'horizontal', ...props }, ref) => (
  <TabsContext.Provider value={{ orientation }}>
    <TabsPrimitive.Root
      orientation={orientation}
      ref={ref}
      className={cn(
        orientation === 'vertical' ? 'flex rounded-md p-1 border-3 border-white text-muted-foreground gap-1' : '',
        className
      )}
      {...props}
    />
  </TabsContext.Provider>
))
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useTabs()
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'bg-muted p-1 text-muted-foreground rounded-lg',
        orientation === 'vertical'
          ? 'flex flex-col h-auto items-center justify-start rounded-md'
          : 'inline-flex h-9 items-center justify-center',
        className
      )}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useTabs()
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        orientation === 'vertical'
          ? 'flex items-center justify-start rounded-sm py-1.5'
          : 'inline-flex items-center justify-center rounded-md',
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useTabs()
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        orientation === 'vertical' ? 'ml-4' : 'mt-2',
        className
      )}
      {...props}
    />
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
