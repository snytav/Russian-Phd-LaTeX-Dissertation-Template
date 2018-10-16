#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 10
#SBATCH -N 10
mpirun -n 100 ./xhpcg_avx
