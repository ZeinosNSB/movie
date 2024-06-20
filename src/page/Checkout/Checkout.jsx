import { CheckIcon } from '@radix-ui/react-icons'
import _ from 'lodash'
import { HomeIcon, X } from 'lucide-react'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

import screen from '@/assets/img/screen.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Loading from '@/page/Loading'
import { useBookTicketsMutation, useGetMovieTicketsQuery } from '@/redux/api/ticket.service'
import { useGetUserInfoMutation } from '@/redux/api/user.service'
import { resetTickets, setTicketsBooking } from '@/redux/reducer/ticket.slice'
import { setUserInfo } from '@/redux/reducer/user.slice'
import { USER_LOGIN } from '@/utils/config'

const user = JSON.parse(localStorage.getItem(USER_LOGIN))

const seatStyles = {
  normal: css`
    background-color: rgb(154, 152, 152);
    box-shadow: -1px 2px 18px -6px #b2ada3;
    color: #fff;
  `,
  reservedByOthers: css`
    background-color: rgb(190, 82, 82);
    box-shadow: -1px 2px 18px -6px #a23352;
    cursor: no-drop;
  `,
  booking: css`
    background-color: rgb(78, 189, 78) !important;
    box-shadow: -1px 2px 18px -6px #2d9d4a;
    color: #fff !important;
  `,
  vip: css`
    background-color: #a23ca2;
    box-shadow: -1px 2px 18px -6px #cc816f;
    color: #fff;
  `,
  reserved: css`
    background-color: rgb(246, 246, 246);
    box-shadow: -1px 2px 18px -6px orange;
    color: orange !important;
    border: 1px solid orange;
    cursor: no-drop;
  `,
  bookingByOthers: css`
    background-color: rgb(121, 251, 255);
    box-shadow: -1px 2px 18px -6px rgba(51, 211, 213, 0.6);
    color: #e76860 !important;
    cursor: no-drop;
  `
}

export const Seat = styled.button`
  width: 35px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 8px;
  aspect-ratio: 1/1;

  ${props => seatStyles[props.type] || seatStyles.normal}
`

function Checkout() {
  const { tickets, ticketsSelectingByOther } = useSelector(state => state.ticket)
  const dispatch = useDispatch()

  const { id } = useParams()

  const { data: movieTicket, isFetching } = useGetMovieTicketsQuery(id)
  const [bookTickets] = useBookTicketsMutation()

  const normalSeats = tickets.filter(seat => seat.loaiGhe === 'Thuong')
  const vipSeats = tickets.filter(seat => seat.loaiGhe === 'Vip')

  useEffect(() => {
    dispatch(resetTickets())
  }, [id, dispatch])

  const renderSeats = () => (
    <div className='grid grid-cols-16'>
      {movieTicket?.danhSachGhe.map(seat => {
        let type = 'normal'

        seat.daDat && (type = 'reservedByOthers')

        if (seat.loaiGhe === 'Vip' && !seat.daDat) {
          type = 'vip'
        }

        if (user?.taiKhoan === seat.taiKhoanNguoiDat) {
          type = 'reserved'
        }

        let indexBooking = tickets.findIndex(ticket => ticket.maGhe === seat.maGhe)
        if (indexBooking !== -1) {
          type = 'booking'
        }

        let indexBookingByOthers = ticketsSelectingByOther.findIndex(ticket => ticket.maGhe === seat.maGhe)
        if (indexBookingByOthers !== -1) {
          type = 'bookingByOthers'
        }

        return (
          <Seat
            key={seat.maGhe}
            type={type}
            disabled={seat.daDat || type === 'bookingByOthers'}
            onClick={() => dispatch(setTicketsBooking(seat))}
          >
            {seat.daDat || type === 'bookingByOthers' ? <X size={20} className='mx-auto' /> : seat.tenGhe}
          </Seat>
        )
      })}
    </div>
  )

  return (
    <>
      {isFetching && <Loading />}
      <div className='grid grid-cols-12 max-w-7xl mx-auto'>
        <div className='col-span-8'>
          <div className='flex flex-col items-center justify-center pt-10 drop-shadow-2xl'>
            <img src={screen} alt='Screen' />
            {renderSeats()}
            <div className='w-[700px] mx-auto grid grid-cols-6 mt-10'>
              <div className='flex flex-col items-center'>
                <Seat>
                  <CheckIcon className='mx-auto' />
                </Seat>
                <span className='text-muted-foreground text-xs'>Available</span>
              </div>
              <div className='flex flex-col items-center'>
                <Seat type='reservedByOthers'>
                  <X className='mx-auto' />
                </Seat>
                <span className='text-muted-foreground text-xs'>Reserved</span>
              </div>
              <div className='flex flex-col items-center'>
                <Seat type='booking'>
                  <CheckIcon className='mx-auto' />
                </Seat>
                <span className='text-muted-foreground text-xs'>Selecting</span>
              </div>
              <div className='flex flex-col items-center'>
                <Seat type='bookingByOthers'>
                  <CheckIcon className='mx-auto' />
                </Seat>
                <span className='text-muted-foreground text-xs'>Other Selecting</span>
              </div>
              <div className='flex flex-col items-center'>
                <Seat type='vip'>
                  <CheckIcon className='mx-auto' />
                </Seat>
                <span className='text-muted-foreground text-xs'>VIP</span>
              </div>
              <div className='flex flex-col items-center'>
                <Seat type='reserved'>
                  <X className='mx-auto' />
                </Seat>
                <span className='text-muted-foreground text-xs'>Your Seats</span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-4'>
          <Card className='overflow-hidden h-full' x-chunk='dashboard-05-chunk-4'>
            <CardHeader className='flex bg-muted/50'>
              <div className='grid gap-0.5'>
                <CardTitle className='group flex justify-between items-center gap-2 text-lg'>
                  <div>
                    <p>{movieTicket?.thongTinPhim?.tenPhim}</p>
                    <CardDescription>
                      Date:{' '}
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </div>
                  <img src={movieTicket?.thongTinPhim?.hinhAnh} alt='Film' className='w-32 rounded-2xl' />
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className='p-6 text-sm'>
              <div className='grid gap-3'>
                <div className='font-semibold'>Details</div>
                <ul className='grid gap-3'>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Cinema:{' '}
                      <span>
                        {movieTicket?.thongTinPhim?.tenCumRap}, {movieTicket?.thongTinPhim?.tenRap}
                      </span>
                    </span>
                  </li>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Address: <span>{movieTicket?.thongTinPhim?.diaChi}</span>
                    </span>
                  </li>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>
                      Time:{' '}
                      <span>
                        {movieTicket?.thongTinPhim?.gioChieu} - {movieTicket?.thongTinPhim?.ngayChieu}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
              <Separator className='my-4' />
              <div className='grid gap-3'>
                <div className='font-semibold'>Order Details</div>
                <ul className='grid gap-3'>
                  <li className='flex justify-between'>
                    <div>
                      <p className='text-muted-foreground mb-2'>
                        Normal x <span>{normalSeats.length}</span>
                      </p>
                      <div className='text-xs text-muted-foreground flex'>
                        <span>Seats: </span>
                        <div className='w-64 ml-2 grid grid-cols-6 gap-2'>
                          {_.sortBy(normalSeats, ['tenGhe']).map(seat => (
                            <span key={seat.stt} className='mr-3'>
                              {seat.tenGhe}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <span>{normalSeats.reduce((total, seat) => total + seat.giaVe, 0).toLocaleString()}</span>
                  </li>
                  <li className='flex justify-between'>
                    <div>
                      <p className='text-muted-foreground mb-2'>
                        Vip x <span>{vipSeats.length}</span>
                      </p>
                      <div className='text-xs text-muted-foreground flex'>
                        <span>Seats: </span>
                        <div className='w-64 ml-2 grid grid-cols-6 gap-2'>
                          {_.sortBy(vipSeats, ['tenGhe']).map(seat => (
                            <span key={seat.stt} className='mr-3'>
                              {seat.stt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <span>{vipSeats.reduce((total, seat) => total + seat.giaVe, 0).toLocaleString()}</span>
                  </li>
                </ul>
                <Separator className='my-2' />
                <ul className='grid gap-3'>
                  <li className='flex items-center justify-between font-semibold'>
                    <span className='text-muted-foreground'>Total</span>
                    <span>{tickets.reduce((total, seat) => total + seat.giaVe, 0).toLocaleString()}</span>
                  </li>
                </ul>
              </div>
              <Separator className='my-4' />
              <div className='grid gap-3'>
                <div className='font-semibold'>Customer Information</div>
                <dl className='grid gap-3'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-muted-foreground'>Customer</dt>
                    <dd>{user?.hoTen}</dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-muted-foreground'>Email</dt>
                    <dd>
                      <a href='mailto:'>{user?.email}</a>
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-muted-foreground'>Phone</dt>
                    <dd>
                      <a href='tel:'>{user?.soDT}</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
              <Button
                className='w-full'
                size='lg'
                onClick={() => {
                  dispatch(resetTickets())
                  bookTickets({
                    maLichChieu: id,
                    danhSachVe: tickets.map(seat => ({
                      maGhe: seat.maGhe,
                      giaVe: seat.giaVe
                    }))
                  })
                }}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

function OrderHisTory() {
  const { userInfo } = useSelector(state => state.user)

  const renderTicketItem = () =>
    userInfo?.thongTinDatVe?.map(ticket => {
      const seats = _.first(ticket.danhSachGhe)

      return (
        <div className='p-2 lg:w-1/3 md:w-1/2 w-full' key={ticket.maVe}>
          <div className='h-full flex border-gray-200 border p-4 rounded-lg'>
            <img
              alt='team'
              className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
              src={ticket.hinhAnh}
            />
            <div className='flex-grow text-neutral-400'>
              <h2 className='text-orange-500 font-bold text-lg'>{ticket.tenPhim}</h2>
              <div className='text-xs'>
                <p className='mt-3 mb-1'>
                  <span className='font-bold'>Time:</span> {moment(ticket.ngayDat).format('hh:mm A')}
                </p>
                <p className='mb-1'>
                  <span className='font-bold'>Date:</span> {moment(ticket.ngayDat).format('DD-MM-YYYY')}
                </p>
                <p className='mb-1'>
                  <span className='font-bold'>Address:</span> {seats.tenCumRap}, {seats.tenHeThongRap}
                </p>
                <div className='flex items-start'>
                  <span className='font-bold'>Ghế:</span>
                  <div className='w-52 ml-2 grid grid-cols-6 gap-2'>
                    {ticket.danhSachGhe.map(ghe => (
                      <span className='text-orange-500' key={ghe.tenGhe}>
                        {ghe.tenGhe}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })

  return (
    <div className='p-5'>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-col text-center w-full mb-20'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4  text-orange-600 '>Order History</h1>
            <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
              Check out the showtime and locations to have a great time at the movies!
            </p>
          </div>
          <div className='flex flex-wrap -m-2'>{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  )
}

export default () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [GetUserInfo] = useGetUserInfoMutation()

  const onTabs = async () => {
    const result = await GetUserInfo().unwrap()
    dispatch(setUserInfo(result))
  }

  return (
    <Tabs defaultValue='on' className='w-full max-w-7xl mx-auto'>
      <TabsList className='w-[500px] mx-auto grid grid-cols-3 ml-14 mt-7 bg-white gap-4 mb-5'>
        <TabsTrigger
          value='on'
          className='p-2 text-base rounded-2xl text-slate-900 hover:bg-neutral-300 border-2 border-amber-200 hover:border-neutral-300 data-[state=active]:bg-slate-900 data-[state=active]:text-orange-300 data-[state=active]:border-slate-900'
        >
          Select & Payment
        </TabsTrigger>
        <TabsTrigger
          value='off'
          className='p-2 text-base rounded-2xl text-slate-900 hover:bg-neutral-300 border-2 border-amber-200 hover:border-neutral-300 data-[state=active]:bg-slate-900 data-[state=active]:text-orange-300 data-[state=active]:border-slate-900'
          onClick={onTabs}
        >
          Order History
        </TabsTrigger>
        <TabsTrigger
          className='p-2 text-base rounded-2xl text-slate-900 hover:bg-neutral-300 border-2 border-amber-200 hover:border-neutral-300 data-[state=active]:bg-slate-900 data-[state=active]:text-orange-300 data-[state=active]:border-slate-900'
          onClick={() => navigate('/home')}
        >
          <HomeIcon />
        </TabsTrigger>
      </TabsList>
      <TabsContent value='on'>
        <Checkout />
      </TabsContent>
      <TabsContent value='off'>
        <OrderHisTory />
      </TabsContent>
    </Tabs>
  )
}
