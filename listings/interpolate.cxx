 double Interpolate3D(
             //одна из компонент поля в рамках данной ячейки 
             CellDouble *E,
             //номер ячйки в трехмерной сетке
             int3 *cell,
             //интерполяционные множители
             double sx,double sx1,double sy,
             double sy1,double sz,double sz1,
             //частица
             Particle *p,
             //номер частицы в рамках ячейки 
             int n
             )
         {
                double t,t1,t2;
                double t_ilk,t_ilk1,t_il1k,t_il1k1,t_i1lk,t_i1lk1,t_i1l1k,t_i1l1k1;
                int i,l,k;

                i = cell->x;
                l = cell->y;
                k = cell->z;

                if(i < 0 || i > CellExtent) return 0.0;
                if(l < 0 || l > CellExtent) return 0.0;
                if(k < 0 || k > CellExtent) return 0.0;

                t_ilk   = E->M[i][l][k];
                t_ilk1  = E->M[i][l][k + 1];
                t_il1k  = E->M[i][l + 1][k];
                t_il1k1 = E->M[i][l + 1][k + 1];

                t_i1lk   = E->M[i+1][l][k];
                t_i1lk1  = E->M[i+1][l][k + 1];
                t_i1l1k  = E->M[i+1][l + 1][k];
                t_i1l1k1 = E->M[i+1][l + 1][k + 1];

                t1 = sx *  (sy *(sz  * t_ilk
                           + sz1 * t_ilk1)
                         +  sy1*(sz  * t_il1k
                         + sz1 * t_il1k1));
                         
                t2 = sx1 * (sy *(sz  * t_i1lk
                            + sz1 * t_i1lk1)
                    +  sy1*(sz  * t_i1l1k
                         + sz1 * t_i1l1k1));	
                t  = t2 + t1;
     
     return t;
     }