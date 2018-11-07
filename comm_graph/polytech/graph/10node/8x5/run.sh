#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 5
#SBATCH -N 8
mpirun -trace -np 40 ./comm
