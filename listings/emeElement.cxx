void emeElement(Cell *c,int3 i,double *E,double *H1, double *H2,
			double *J,double c1,double c2, double tau,
			int3 d1,int3 d2
			)
	{
	   int n  = c->getGlobalCellNumber(i.x,i.y,i.z);
	  int n1 = c->getGlobalCellNumber(i.x+d1.x,i.y+d1.y,i.z+d1.z);
	  int n2 = c->getGlobalCellNumber(i.x+d2.x,i.y+d2.y,i.z+d2.z);

	  E[n] += c1*(H1[n] - H1[n1]) - c2*(H2[n] - H2[n2]) - tau*J[n];
	}