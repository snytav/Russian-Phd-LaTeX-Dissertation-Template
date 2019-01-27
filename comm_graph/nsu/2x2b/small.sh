#!/bin/sh
 
#PBS -l walltime=00:01:00
#PBS -l select=4:ncpus=4:mpiprocs=1:mem=2000m
 
cd $PBS_O_WORKDIR
 
 
## Count the number of MPI processes:
MPI_NP=`wc -l $PBS_NODEFILE | awk '{ print $1 }'`

cat $PBS_NODEFILE
 
## Add '-trace' parameter:
mpirun -machinefile $PBS_NODEFILE -np $MPI_NP ./comm