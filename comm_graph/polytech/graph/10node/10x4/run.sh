#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 4
#SBATCH -N 10
mpirun -trace -np 40 ./comm
