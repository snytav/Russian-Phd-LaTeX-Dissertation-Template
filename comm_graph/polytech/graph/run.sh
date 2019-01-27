#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 1
#SBATCH -N 1
mpirun -trace -np 1 ./th 
