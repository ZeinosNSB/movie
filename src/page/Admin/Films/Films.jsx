import { PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import TableFilm from '@/page/Admin/Films/TableFilm'

function Films() {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-semibold'>Films Management</h1>
        <div className='ml-auto gap-2'>
          <Button size='sm' className='h-7 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add Film</span>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Films</CardTitle>
          <CardDescription>
            Welcome to the Film Management Admin Panel! Easily manage movies, genres, directors, and user accounts with
            a user-friendly interface and comprehensive features.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <TableFilm />
        </CardContent>
      </Card>
    </main>
  )
}

export default Films
