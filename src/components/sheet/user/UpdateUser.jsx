import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

function UpdateUser({ ids, user, onOpenChange, ...props }) {
  return (
    <Sheet {...props} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col gap-6 sm:max-w-lg'>
        <SheetHeader className='text-left'>
          <SheetTitle>Update user</SheetTitle>
          <SheetDescription>Update the user details and save the changes</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default UpdateUser
