#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 1
#SBATCH -N 10
mpirun -trace -np 10 ./comm
