      use comm_graph_mod
      implicit none
      integer max_nproc
      parameter(max_nproc=1000)
      include 'mpif.h'
      integer ierr,rank,nproc,size,np
      real*8 stm(0:max_nproc-1),rtm(0:max_nproc-1)
      real*8 stw(0:max_nproc-1),rtw(0:max_nproc-1)
      character*40 st,st1,st2,st3,st4
      character*20 hostname
      
      size = 10000
      
      
      call MPI_Init(ierr)
         
      call MPI_Comm_rank(MPI_COMM_WORLD, rank, ierr)
           
      call MPI_Comm_size(MPI_COMM_WORLD, nproc, ierr)

      call gethostname(hostname)
      
      print*,'rank,nproc ',rank,nproc

      write(st,'(i5.5)') rank 
      
      st1='send_times_micro'//st
      st2='send_times_wtime'//st
      st3='recv_times_micro'//st
      st4='recv_times_wtime'//st
      
      open(21,file=st1,form='formatted')
      open(22,file=st2,form='formatted')
      open(23,file=st3,form='formatted')
      open(24,file=st4,form='formatted')
      
      do np = 0,nproc-1
      
         call send_msg_one_to_all(np,rank,nproc,MPI_COMM_WORLD,size,
     +                         stm,stw,rtm,rtw)
         call MPI_Barrier(MPI_COMM_WORLD,ierr)
      enddo
         
 455  format(e15.5,$)         
 456  format(a20, $)
      write(21,456) hostname
      write(22,456) hostname
      write(23,456) hostname
      write(24,456) hostname
      do np = 0,nproc-1
         write(21,455) stm(np)
         write(22,455) stw(np)
         write(23,455) rtm(np)
         write(24,455) rtw(np)
      enddo
      write(21,*)
      write(22,*)
      write(23,*)
      write(24,*)
      
      
      close(21)
      close(22)
      close(23)
      close(24)
      
      call MPI_Finalize(ierr)
      
      end  
