#!/bin/sh
#SBATCH -p broadwell
#SBATCH -c 10
#SBATCH -N 4
mpirun ./xhpl_intel64_dynamic
