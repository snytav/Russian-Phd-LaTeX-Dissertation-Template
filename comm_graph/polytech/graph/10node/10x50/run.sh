#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 50
#SBATCH -N 10
mpirun -trace -np 500 ./comm
