#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 8
#SBATCH -N 5
mpirun -trace -np 40 ./comm
