Field GetField(Particle *p,CellTotalField cf)
{
    int3 i,i1;
	double s1,s2,s3,s4,s5,s6,s11,s21,s31,s41,s51,s61;
	double3 x = p->GetX();
	Field fd;
	  
	//вычисление интерполяционных коэффициентов 
	//27 операций    
        InverseKernel(x,
	  	              i,i1,
		              s1,s2,s3,s4,s5,s6,
	                  s11,s21,s31,s41,s51,s61,p);


        //вычисление электрического поля 
        //63 операции
        fd.E = GetElectricField(i,i1,
			     s1,s2,s3,s4,s5,s6,
			     s11,s21,s31,s41,s51,s61,p,cf.Ex,cf.Ey,cf.Ez);
        //вычисление электрического поля
        //63 операции
	fd.H = GetMagneticField(i,i1,
			     s1,s2,s3,s4,s5,s6,
			     s11,s21,s31,s41,s51,s61,p,cf.Hx,cf.Hy,cf.Hz);
	return fd;
        //всего по функции GetField 
        //153 операции
}

void InverseKernel(double3 x,int3 & i,int3 & i1,
			    double& s1,double& s2,double& s3,double& s4,double& s5,double& s6,
			    double& s11,double& s21,double& s31,double& s41,double& s51,double& s61,
			    Particle *p
 			  )
{
        //вычисление интерполяционных коэффициентов 
        //по трем координатам:
   //X 
        //2 операции
	i.x =  getCellNumber(x.x,x0,hx);            //(int) (s2 + 1.);  
	//2 операции
	i1.x = getCellNumberCenter(x.x,x0,hx);      //(int) (s2 + 1.5);
	//1 операция
	s1 = s1_interpolate(x.x);                   //i - s2;
        //2 операции
	s2 = s2_interpolate(x.x);                   //i1 - 0.5 - s2;
        //всего 7 операций
    //Y
        //7 операций
        i.y  = getCellNumber(x.y,y0,hy);            //(int) (s2 + 1.);
	i1.y = getCellNumberCenter(x.y,y0,hy);      //(int) (s2 + 1.5);
	s3 = s3_interpolate(x.y);          //i - s2;
	s4 = s4_interpolate(x.y);          //i1 - 0.5 - s2;
    //Z
        //7 операций
	i.z  = getCellNumber(x.z,z0,hz);            //(int) (s2 + 1.);
	i1.z = getCellNumberCenter(x.z,z0,hz);      //(int) (s2 + 1.5);
	s5 = s5_interpolate(x.z);                   //i - s2;
	s6 = s6_interpolate(x.z);                   //i1 - 0.5 - s2;

        //6 операций 
	s11 = 1. - s1;
	s21 = 1. - s2;
	s31 = 1. - s3;
	s41 = 1. - s4;
	s51 = 1. - s5;
	s61 = 1. - s6;

        //всего по функции InverseKernel: 27 операций 
}

double3 GetElectricField(
			    int3 i,int3  i1,
			    double& s1,double& s2,double& s3,double& s4,double& s5,double& s6,
			    double& s11,double& s21,double& s31,double& s41,double& s51,double& s61,
			    Particle *p,CellDouble *Ex1,CellDouble *Ey1,CellDouble *Ez1
)
{
        double3 E;
        int3 cell_num;

    cell_num.x = i.x;
    cell_num.y = i1.y;
    cell_num.z = i1.z;
        //21 операция
	E.x =    Interpolate3D(Ex1,&cell_num,s1,s11,s4,s41,s6,s61,p,0);

	cell_num.x = i1.x;
	cell_num.y = i.y;
	cell_num.z = i1.z;
	E.y =    Interpolate3D(Ey1,&cell_num,s2,s21,s3,s31,s6,s61,p,1);

	cell_num.x = i1.x;//i1;
	cell_num.y = i1.y;//l1;
	cell_num.z = i.z; //k;
	E.z =    Interpolate3D(Ez1,&cell_num,s2,s21,s4,s41,s5,s51,p,2);

	return E;
        //всего 63 операции
}


double3 GetMagneticField(
			    int3 i,int3 i1,
			    double& s1,double& s2,double& s3,double& s4,double& s5,double& s6,
			    double& s11,double& s21,double& s31,double& s41,double& s51,double& s61,
			    Particle *p,CellDouble *Hx1,CellDouble *Hy1,CellDouble *Hz1
)
{
        double3 H;
        int3 cn;

        cn.x = i1.x;
        cn.y = i.y;
        cn.z = i.z;
    	H.x =    Interpolate3D(Hx1,&cn,s2,s21,s3,s31,s5,s51,p,3);

    	cn.x = i.x;
    	cn.y = i1.y;
    	cn.z = i.z;
    	H.y =    Interpolate3D(Hy1,&cn,s1,s11,s4,s41,s5,s51,p,4);

    	cn.x = i.x;
    	cn.y = i.y;
    	cn.z = i1.z;
    	H.z =    Interpolate3D(Hz1,&cn,s1,s11,s3,s31,s6,s61,p,5);


	return H;
         //аналогично: всего 63 операции
}

//интерполяция по трем координатам 
//с использованием вычисленных выше коэффициентов
double Interpolate3D(CellDouble *E,int3 *cell,
		double sx,double sx1,double sy,
		double sy1,double sz,double sz1,
		Particle *p, int n
		)
{
       double t,t1,t2;
       double t_ilk,t_ilk1,t_il1k,t_il1k1,t_i1lk,t_i1lk1,t_i1l1k,t_i1l1k1;
       int i,l,k;
       //номер ячейки сетки
       i = cell->x;
       l = cell->y;
       k = cell->z;

       //значения поля в узлах сетки
       //соответствующих ячейке
       t_ilk   = E->M[i][l][k];
       t_ilk1  = E->M[i][l][k + 1];
       t_il1k  = E->M[i][l + 1][k];
       t_il1k1 = E->M[i][l + 1][k + 1];
       t_i1lk   = E->M[i+1][l][k];
       t_i1lk1  = E->M[i+1][l][k + 1];
       t_i1l1k  = E->M[i+1][l + 1][k];
       t_i1l1k1 = E->M[i+1][l + 1][k + 1];

       //собственно интерполяция
       //20 операций
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
       //всего по функции Interpolate3D: 21 операция
}