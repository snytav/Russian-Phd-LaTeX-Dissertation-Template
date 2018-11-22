      module comm_graph_mod
      contains
      
      subroutine send_msg_one_to_all(snd,rank,nproc,comm,size,
     +                              stm,stw,rtm,rtw)
      implicit none
      include 'mpif.h'
      external amicro 
      real*8 amicro
      integer, intent(IN) :: rank  ! current rank
      integer, intent(IN) :: comm  ! communicator
      integer, intent(IN) :: nproc ! number of MPI processes
      integer, intent(IN) :: snd   ! rank of sending process 
      integer, intent(IN) :: size  ! size of the message being sent
      integer i,ierr,stat(MPI_STATUS_SIZE)
      real*8 sbuf(0:size),rbuf(0:size)
      real*8 stm(0:nproc-1),rtm(0:nproc-1)
      real*8 stw(0:nproc-1),rtw(0:nproc-1)
      real*8 t1,t2,tr1,tr2,tw1,tw2,twr1,twr2

      do i=0,nproc-1
         print*,'snd,rank,i ',snd,rank,i
         if((snd.eq.rank).and.(i.ne.rank)) then
            t1 = amicro()
            tw1 = MPI_wtime()
            call MPI_Send(sbuf,size,MPI_DOUBLE_PRECISION,
     +                        i,889,comm,ierr)
            t2 = amicro()
            tw2 = MPI_wtime()
            !send ->i
            stm(i) = t2-t1
            stw(i) = tw2-tw1
            print*,'send ',snd,' -> ',i,t2-t1,tw2-tw1
         endif
         if((rank.eq.i).and.(i.ne.snd)) then
            tr1 = amicro()
            twr1 = MPI_wtime()
            call MPI_Recv(rbuf,size,MPI_DOUBLE_PRECISION,
     +                        snd,889,comm,stat,ierr)
            tr2 = amicro()
            twr2 = MPI_wtime()
            !recv i->
            rtm(i) = tr2-tr1
            rtw(i) = twr2-twr1
            print*,'recv ',snd,' -> ',i,tr2-tr1,twr2-twr1
         endif
      enddo 
      
      
      end subroutine send_msg_one_to_all
      
      subroutine send_msg_all_to_all
      implicit none
      end subroutine send_msg_all_to_all
      end module comm_graph_mod
