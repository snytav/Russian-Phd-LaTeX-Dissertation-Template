#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 10
#SBATCH -N 2
mpirun -trace -np 20 ./comm
