import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export function DeleteDialog({ film, showTrigger = true, ...props }) {
  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <TrashIcon className='mr-2 size-4' aria-hidden='true' />
            Delete
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this film from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='gap-2 sm:space-x-0'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            aria-label='Delete selected rows'
            variant='destructive'
            onClick={() => {
              console.log(film?.maPhim)
            }}
          >
            <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
