import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

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
import { useDeleteFilmMutation } from '@/redux/api/film.service'

export function DeleteFilm({ id, showTrigger = true, ...props }) {
  const [deleteFilm, { isLoading }] = useDeleteFilmMutation()

  if (id.length === 1) {
    id = id[0]
  }

  const handleDeleteFilm = async () => {
    try {
      await deleteFilm(id).unwrap()
      toast.success('User deleted successfully')
    } catch (error) {
      //I'm experiencing an issue where I can successfully delete after add new films, but an error message from the server appears afterward. Please understand.
      const err = error?.data?.content
      toast.error(err)
    }
  }

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
          <Button aria-label='Delete selected rows' variant='destructive' onClick={() => handleDeleteFilm()}>
            {isLoading && <ReloadIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
