

void Move(Field fd,double tau)
{
    double tau1,u,v,w,ps;
    double pu1,pv1,pw1;
    double3 sx3;

    //вычисление изменения импульса частицы
    //1-я стадия: 21 операция
    ElectricMove(fd.E,tau,q_m,&tau1,&pu,&pv,&pw,&ps);

    // вычисление поворота вектора импульса 
    // под действием магнитного поля: 51 операция
    MagneticMove(fd.H,ps,&pu1,&pv1,&pw1);


    //умножение электрического поля на временной шаг 
    //3 операции
    sx3 = mult(tau1,fd.E);

    //вычисление изменения импульса частицы
    //2-я стадия: 3 операции
    add(sx3,&pu,&pv,&pw,pu1,pv1,pw1);
    
    //вычисление модуля 4-вектора импульса частицы
    //10 операций
    ps = impulse(pu,pv,pw);

    //вычисление скорости частицы  
    //3 операции     
    mult(&u,&v,&w,ps,pu,pv,pw);

    //вычисление изменения координаты частицы
    //6 операций
    x1 = x + tau * u;
    y1 = y + tau * v;
    z1 = z + tau * w;
    
    //всего 97 операций
}

void ElectricMove(double3 E,double tau, double q_m,double *tau1,double *pu,double *pv,double *pw,double *ps)
{
        //импульс рассчитывается в два этапа
        //поэтому уменьшаем шаг вдвое: 2 операции 
	*tau1=q_m*tau*0.5;

        //вычисление изменения импульса частицы
        //6 операций
        *pu += *tau1*E.x;
        *pv += *tau1*E.y;
	*pw += *tau1*E.z;
        
        //вычисление модуля 4-вектора импульса частицы
        //8 операций и извлечение квадратного корня (5 операций)
	*ps = (*tau1) * pow(((*pu) * (*pu) + (*pv) * (*pv) + (*pw) * (*pw)) * 1. + 1.0,-0.5);

        //всего 21 операция
}


void MagneticMove(double3 H,double ps,double *pu1,double *pv1,double *pw1)
{
	double bx,by,bz,s1,s2,s3,s4,s5,s6,s,su,sv,sw;

        //вычисление вспомогательных величин
        //15 операций
	bx = ps * H.x;
	by = ps * H.y;
	bz = ps * H.z;
	su = pu + pv * bz - pw * by;
	sv = pv + pw * bx - pu * bz;
	sw = pw + pu * by - pv * bx;

        //матрица на основе компонент магнитного поля
        //9 операций        
	s1 = bx * bx;
	s2 = by * by;
	s3 = bz * bz;
	s4 = bx * by;
	s5 = by * bz;
	s6 = bz * bx;
	s = s1 + 1. + s2 + s3;

        // вычисление поворота вектора импульса 
        // 27 операций
	*pu1 = ((s1 + 1.) * su + (s4 + bz) * sv + (s6 - by) * sw) / s;
	*pv1 = ((s4 - bz) * su + (s2 + 1.) * sv + (s5 + bx) * sw) / s;
	*pw1 = ((s6 + by) * su + (s5 - bx) * sv + (s3 + 1.) * sw) / s;
	
	//всего 51 операция
}


void add(double3 sx3,double *pu,double *pv,double *pw,double pu1,double pv1,double pw1)
{
        //сложение веторов: 3 операции
	*pu = pu1 + sx3.x;
	*pv = pv1 + sx3.y;
	*pw = pw1 + sx3.z;
}

double3 mult(double t,double3 t3)
{
        //умножение вектора на число: 3 операции
	t3.x *= t;
	t3.y *= t;
	t3.z *= t;

	return t3;
}

//вычисление модуля 4-вектора импульса
//10 операций
double impulse(double pu,double pv,double pw)
{
	return pow(((pu * pu + pv * pv + pw * pw) + 1.0),-0.5);
}