#!/bin/sh
#SBATCH -p broadwell
#SBATCH -c 30
#SBATCH -N 3 
mpirun -n 90 ./xhpcg-avx
