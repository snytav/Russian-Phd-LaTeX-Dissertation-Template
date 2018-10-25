//вычисление вклада модельной частицы "p" ток по новым и старым кооординатам частицы
void CurrentToMesh(double tau,int *cells,DoubleCurrentTensor *dt,Particle *p,int nt,int index)
{
      double3 x2;
      double s;
      int3 i2,i1;
      int  m,i,l,k;
      double3 x   = p->GetX();
      double3 x1  = p->GetX1();
      double mass = p->m;
      double q_m  = p->q_m;
//      DoubleCurrentTensor dt;
      CurrentTensor t;

      CurrentTensor *t1 = &(dt->t1);
      CurrentTensor *t2 = &(dt->t2);


      *cells = 1;
      //вычисление интерполяционных коэффициентов
      //9 операций 
      i1.x=getCellNumberCenterCurrent(x.x,x0,hx);
      i1.y=getCellNumberCenterCurrent(x.y,y0,hy);
      i1.z=getCellNumberCenterCurrent(x.z,z0,hz);


      //9 операций  
      i2.x=getCellNumberCenterCurrent(x1.x,x0,hx);
      i2.y=getCellNumberCenterCurrent(x1.y,y0,hy);
      i2.z=getCellNumberCenterCurrent(x1.z,z0,hz);

      //определение перелета частицы 
      //из ячейки в ячейку
      //3 операции
      i=abs(i2.x-i1.x);
      l=abs(i2.y-i1.y);
      k=abs(i2.z-i1.z);
      m=4*i+2*l+k;

      //далее в зависимости от того, как 
      //движется частица, вычисления могут быть разными
      //рассматриваем один из наиболее 
      //затратных вариантов (m не равен 0)
	switch (m) {
	    case 1:  goto L1;
	    case 2:  goto L2;
	    case 3:  goto L3;
	    case 4:  goto L4;
	    case 5:  goto L5;
	    case 6:  goto L6;
	    case 7:  goto L7;
	}


	pqr(i1,x,x1,mass,tau,t1,0,p);
	goto L18;
L1:
        //4 операции
	x2.z = getCellTransitAverage(hz,i1.z,i2.z,z0);                   //hz * ((i1.z + i2.z) * .5 - 1.);
	//3 операции
        s    = getCellTransitRatio(x1.z,x.z,x2.z);                    //   (z2 - z__) / (z1 - z__);
        //3 операции
	x2.x = getRatioBasedX(x1.x,x.x,s);                            // x + (x1 - x) * s;
        //3 операции 
	x2.y = getRatioBasedX(x1.y,x.y,s);                            //y + (y1 - y) * s;

	goto L11;
L2:
	x2.y = getCellTransitAverage(hy,i1.y,i2.y,y0);                   //   d_1.h2 * ((l1 + l2) * .5 - 1.) + y0;
	s    = getCellTransitRatio(x1.y,x.y,x2.y);                    // (y2 - y) / (y1 - y);
	x2.x = getRatioBasedX(x1.x,x.x,s);                            //x + (x1 - x) * s;
	x2.z = getRatioBasedX(x1.z,x.z,s);
	goto L11;
L3:
	x2.y = getCellTransitAverage(hy,i1.y,i2.y,y0);                     //d_1.h2 * ((l1 + l2) * .5 - 1.) + y0;
	x2.z = getCellTransitAverage(hz,i1.z,i2.z,z0);                     //d_1.h3 * ((k1 + k2) * .5 - 1.);

	s = (getCellTransitProduct(x1.z,x.z,x2.z) + getCellTransitProduct(x1.y,x.y,x2.y))
			/ (pow(x1.z - x.z,2.0) + pow(x1.y - x.y,2.0));
	x2.x = getRatioBasedX(x1.x,x.x,s);


	goto L11;
L4:
	x2.x = getCellTransitAverage(hx,i1.x,i2.x,x0);
	s    = getCellTransitRatio(x1.x,x.x,x2.x);                       //s = (x2 - x) / (x1 - x);
	x2.y = getRatioBasedX(x1.y,x.y,s);                               //y2 = y + (y1 - y) * s;
	x2.z = getRatioBasedX(x1.z,x.z,s);                               //z2 = z__ + (z1 - z__) * s;
	goto L11;
L5:
	x2.x = getCellTransitAverage(hx,i1.x,i2.x,x0);                      //x2 = d_1.h1 * ((i1 + i2) * .5 - 1.);
	x2.z = getCellTransitAverage(hz,i1.z,i2.z,z0);                      //z2 = d_1.h3 * ((k1 + k2) * .5 - 1.);

	s = (getCellTransitProduct(x1.z,x.z,x2.z) + getCellTransitProduct(x1.x,x.x,x2.x)) / (pow(x1.z - x.z,2.0) + pow(x1.x - x.x,2.0));
	x2.y = getRatioBasedX(x1.y,x.y,s); //	y2 = y + (y1 - y) * s;
	goto L11;
L6:
	x2.x = getCellTransitAverage(hx,i1.x,i2.x,x0);  //x2 = d_1.h1 * ((i1 + i2) * .5 - 1.);
	x2.y = getCellTransitAverage(hy,i1.y,i2.y,y0);  //y2 = d_1.h2 * ((l1 + l2) * .5 - 1.) + y0;

	s = (getCellTransitProduct(x1.y,x.y,x2.y) +  getCellTransitProduct(x1.x,x.x,x2.x)) / (pow(x1.y - x.y,2.0) + pow(x1.x - x.x,2.0));
	x2.z = getRatioBasedX(x1.z,x.z,s); //	z2 = z__ + (z1 - z__) * s;
	goto L11;
L7:
	x2.x = getCellTransitAverage(hx,i1.x,i2.x,x0);  //x2 = d_1.h1 * ((i1 + i2) * .5 - 1.);
	x2.y = getCellTransitAverage(hy,i1.y,i2.y,y0);  //y2 = d_1.h2 * ((l1 + l2) * .5 - 1.) + y0;
	x2.z = getCellTransitAverage(hz,i1.z,i2.z,z0);  //z2 = d_1.h3 * ((k1 + k2) * .5 - 1.);
L11:
        //собственно вычисление тока: 
        //2 функции по 75 операций
	pqr(i1, x, x2,  mass,tau,t1,0,p);
	pqr(i2, x2, x1, mass,tau,t2,1,p);

	*cells = 2;

L18:  p->x = p->x1;
      p->y = p->y1;
      p->z = p->z1;

      Reflect(p);

//      *dt1 = dt;

    


      t = *t1;
      *t1 = t;

      return;
      
      // всего по функции CurrentToMesh 184 операции 
}

void pqr(int3& i,double3& x,double3& x1,double& a1,double tau,CurrentTensor *t1,
		         int num,Particle *p)
{
      double dx,dy,dz,a,dx1,dy1,dz1,su,sv,sw,s1,s2,s3;
     // double xl,yl;//,res,inv_yl;

      //15 операций 
      dx=getCenterRelatedShift(x.x,x1.x,i.x,hx,x0); //0.5d0*(x+x1)-h1*(i-1.5d0)
      dy=getCenterRelatedShift(x.y,x1.y,i.y,hy,y0); //0.5d0*(y+y1)-y0-h2*(l-1.5d0)
      dz=getCenterRelatedShift(x.z,x1.z,i.z,hz,z0); //0.5d0*(z+z1)-h3*(k-1.5d0)
      a = a1;

      //3 операции
      dx1=hx - dx;
      dy1=hy - dy;
      dz1=hz - dz;

      //3 операции
      su =x1.x - x.x;
      sv =x1.y - x.y;
      sw =x1.z - x.z;

      //6 операций
      s1=sv*sw/12.0;
      s2=su*sw/12.0;
      s3=su*sv/12.0;

      //12 операций
      su=su*a/(tau*hy*hz);
      sv=sv*a/(tau*hx*hz);
      sw=sw*a/(tau*hx*hy);

      t1->Jx.i11 = i.x;
      t1->Jx.i12 = i.y;
      t1->Jx.i13 = i.z;
      
      //3 операции
      t1->Jx.t[0] = su*(dy1*dz1+s1);

      t1->Jx.i21 = i.x;
      t1->Jx.i22 = i.y;
      t1->Jx.i23 = i.z+1;
      //3 операции
      t1->Jx.t[1] = su*(dy1*dz-s1);

      t1->Jx.i31 = i.x;
      t1->Jx.i32 = i.y+1;
      t1->Jx.i33 = i.z;
      //3 операции
      t1->Jx.t[2] = su*(dy*dz1-s1);

      t1->Jx.i41 = i.x;
      t1->Jx.i42 = i.y+1;
      t1->Jx.i43 = i.z+1;
      //3 операции
      t1->Jx.t[3] = su*(dy*dz+s1);

      t1->Jy.i11 = i.x;
      t1->Jy.i12 = i.y;
      t1->Jy.i13 = i.z;
      //3 операции
      t1->Jy.t[0] = sv*(dx1*dz1+s2);

      t1->Jy.i21 = i.x;
      t1->Jy.i22 = i.y;
      t1->Jy.i23 = i.z+1;
      //3 операции
      t1->Jy.t[1] = sv*(dx1*dz-s2);

      t1->Jy.i31 = i.x+1;
      t1->Jy.i32 = i.y;
      t1->Jy.i33 = i.z;
      //3 операции
      t1->Jy.t[2] = sv*(dx*dz1-s2);

      t1->Jy.i41 = i.x+1;
      t1->Jy.i42 = i.y;
      t1->Jy.i43 = i.z+1;
      //3 операции
      t1->Jy.t[3] = sv*(dx*dz+s2);

      t1->Jz.i11 = i.x;
      t1->Jz.i12 = i.y;
      t1->Jz.i13 = i.z;
      //3 операции
      t1->Jz.t[0] = sw*(dx1*dy1+s3);

      t1->Jz.i21 = i.x;
      t1->Jz.i22 = i.y+1;
      t1->Jz.i23 = i.z;
      //3 операции
      t1->Jz.t[1] = sw*(dx1*dy-s3);

      t1->Jz.i31 = i.x+1;
      t1->Jz.i32 = i.y;
      t1->Jz.i33 = i.z;
      //3 операции
      t1->Jz.t[2] = sw*(dx*dy1-s3);

      t1->Jz.i41 = i.x+1;
      t1->Jz.i42 = i.y+1;
      t1->Jz.i43 = i.z;
      //3 операции
      t1->Jz.t[3] = sw*(dx*dy+s3);
      
      //всего по функции pqr:75 операций

}

