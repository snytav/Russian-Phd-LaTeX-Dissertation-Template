#!/bin/sh
#SBATCH -p tornado
#SBATCH -c 20
#SBATCH -N 4
mpirun -n 40 ./xhpl_intel64
