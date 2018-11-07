#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 1
#SBATCH -N 2
mpirun -trace -np 2 ./comm
