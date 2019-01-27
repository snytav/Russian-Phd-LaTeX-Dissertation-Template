#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 10
#SBATCH -N 10
mpirun -trace -np 100 ./comm
