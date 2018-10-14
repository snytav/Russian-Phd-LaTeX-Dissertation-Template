#!/bin/sh
#SBATCH -p broadwell
#SBATCH -c 30
#SBATCH -N 3 
mpirun ./IMB-MPI1
