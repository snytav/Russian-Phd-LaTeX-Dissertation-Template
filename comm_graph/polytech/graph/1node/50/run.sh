#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 50
#SBATCH -N 1
mpirun -trace -np 50 ./comm
