#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 2
#SBATCH -N 1
mpirun -trace -np 2 ./comm
