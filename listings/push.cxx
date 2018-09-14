

void Move(Field fd,double tau)
{
    double tau1,u,v,w,ps;
    double pu1,pv1,pw1;
    double3 sx3;


    ElectricMove(fd.E,tau,q_m,&tau1,&pu,&pv,&pw,&ps);

    MagneticMove(fd.H,ps,&pu1,&pv1,&pw1);


    sx3 = mult(tau1,fd.E);

    add(sx3,&pu,&pv,&pw,pu1,pv1,pw1);
    ps = impulse(pu,pv,pw);

    mult(&u,&v,&w,ps,pu,pv,pw);

    x1 = x + tau * u;
    y1 = y + tau * v;
    z1 = z + tau * w;
}

void ElectricMove(double3 E,double tau, double q_m,double *tau1,double *pu,double *pv,double *pw,double *ps)
{

	*tau1=q_m*tau*0.5;

		*pu += *tau1*E.x;
		*pv += *tau1*E.y;
		*pw += *tau1*E.z;
		*ps = (*tau1) * pow(((*pu) * (*pu) + (*pv) * (*pv) + (*pw) * (*pw)) * 1. + 1.0,-0.5);

}


void MagneticMove(double3 H,double ps,double *pu1,double *pv1,double *pw1)
{
	double bx,by,bz,s1,s2,s3,s4,s5,s6,s,su,sv,sw;

	bx = ps * H.x;
	by = ps * H.y;
	bz = ps * H.z;
	su = pu + pv * bz - pw * by;
	sv = pv + pw * bx - pu * bz;
	sw = pw + pu * by - pv * bx;

	s1 = bx * bx;
	s2 = by * by;
	s3 = bz * bz;
	s4 = bx * by;
	s5 = by * bz;
	s6 = bz * bx;
	s = s1 + 1. + s2 + s3;

	*pu1 = ((s1 + 1.) * su + (s4 + bz) * sv + (s6 - by) * sw) / s;
	*pv1 = ((s4 - bz) * su + (s2 + 1.) * sv + (s5 + bx) * sw) / s;
	*pw1 = ((s6 + by) * su + (s5 - bx) * sv + (s3 + 1.) * sw) / s;
}


void add(double3 sx3,double *pu,double *pv,double *pw,double pu1,double pv1,double pw1)
{
	*pu = pu1 + sx3.x;
	*pv = pv1 + sx3.y;
	*pw = pw1 + sx3.z;
}

double3 mult(double t,double3 t3)
{
	t3.x *= t;
	t3.y *= t;
	t3.z *= t;

	return t3;
}