import { useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Profile() {
  const { userInfo } = useSelector(state => state.user)

  console.log(userInfo)
  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
      <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-3xl font-semibold'>Profile</h1>
      </div>
      <Tabs
        defaultValue='on'
        orientation='vertical'
        className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'
      >
        <TabsList className='text-sm text-muted-foreground'>
          <TabsTrigger className='w-full' value='on'>
            General
          </TabsTrigger>
          <TabsTrigger className='w-full' value='off'>
            Order History
          </TabsTrigger>
        </TabsList>
        <TabsContent value='on' className='grid gap-6'>
          <Card x-chunk='dashboard-04-chunk-1'>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                View and update your personal details below. Ensure your information is accurate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder='Store Name' />
              </form>
            </CardContent>
            <CardFooter className='border-t px-6 py-4'>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default Profile
