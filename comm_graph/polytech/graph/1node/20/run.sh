#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 20
#SBATCH -N 1
mpirun -trace -np 20 ./comm
