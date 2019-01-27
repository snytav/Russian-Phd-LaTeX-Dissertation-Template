#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 10
#SBATCH -N 4
mpirun -trace -np 40 ./comm
