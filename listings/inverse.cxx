void InverseKernel(double3 x,int3 & i,int3 & i1,
			    double& s1,double& s2,double& s3,double& s4,double& s5,double& s6,
			    double& s11,double& s21,double& s31,double& s41,double& s51,double& s61,
			    Particle *p
 			  )
{


	i.x =  getCellNumber(x.x,x0,hx);            //(int) (s2 + 1.);  // FORTRAN-StYLE NUMBERING
	i1.x = getCellNumberCenter(x.x,x0,hx);      //(int) (s2 + 1.5);
	s1 = s1_interpolate(x.x);          //i - s2;
	s2 = s2_interpolate(x.x); //getCellCenterReminder(x,0.0,hx);    //i1 - 0.5 - s2;


        i.y  = getCellNumber(x.y,y0,hy);            //(int) (s2 + 1.);
	i1.y = getCellNumberCenter(x.y,y0,hy);      //(int) (s2 + 1.5);

	s3 = s3_interpolate(x.y);//getCellReminder(y,y0,hy);          //i - s2;
	s4 = s4_interpolate(x.y);//   getCellCenterReminder(y,y0,hy);    //i1 - 0.5 - s2;

	i.z  = getCellNumber(x.z,z0,hz);            //(int) (s2 + 1.);
	i1.z = getCellNumberCenter(x.z,z0,hz);      //(int) (s2 + 1.5);
	s5 = s5_interpolate(x.z); //getCellReminder(z,z0,hz);          //i - s2;
	s6 = s6_interpolate(x.z); //getCellCenterReminder(z,z0,hz);    //i1 - 0.5 - s2;

	s11 = 1. - s1;
	s21 = 1. - s2;
	s31 = 1. - s3;
	s41 = 1. - s4;
	s51 = 1. - s5;
	s61 = 1. - s6;
}
