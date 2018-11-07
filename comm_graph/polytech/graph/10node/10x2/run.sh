#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 2
#SBATCH -N 10
mpirun -trace -np 20 ./comm
