#!/bin/bash

#PBS -l select=50:ncpus=4:mem=2000m,place=scatter
#PBS -l walltime=1:00:00
#PBS -m n

cd $PBS_O_WORKDIR
echo "I run on node: `uname -n`"
echo "My working directory is: $PBS_O_WORKDIR"
echo "Assigned to me nodes are:"
cat $PBS_NODEFILE
mpirun -trace -machinefile $PBS_NODEFILE  ./IMB-MPI1