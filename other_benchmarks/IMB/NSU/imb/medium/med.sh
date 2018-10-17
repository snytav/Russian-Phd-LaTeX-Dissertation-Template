#!/bin/sh
 
#PBS -l walltime=00:01:00
#PBS -l select=10:ncpus=4:mpiprocs=4:mem=4000m
 
cd $PBS_O_WORKDIR
 
## Set variables for ITAC:
source /opt/intel/itac/8.1.3.037/bin/itacvars.sh
 
## Set variables for Intel compiler:
source /opt/intel/composerxe/bin/compilervars.sh intel64
export I_MPI_CC=icc
 
## Compile with '-trace' parameter to use ITAC:
 
## Count the number of MPI processes:
MPI_NP=`wc -l $PBS_NODEFILE | awk '{ print $1 }'`
 
## Add '-trace' parameter:
mpirun $PBS_NODEFILE  ./IMB-MPI1