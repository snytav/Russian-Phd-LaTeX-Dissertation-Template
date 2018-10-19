typedef struct {
	double d_ee; //electric energy
	double *d_Ex,*d_Ey,*d_Ez; // electric field
	double *d_Hx,*d_Hy,*d_Hz; // magnetic field
	double *d_Jx,*d_Jy,*d_Jz; // currents
	double *d_Rho;
	int nt;                                 // timestep
	int *d_stage;                           // checking system (e.g. for flow-out particles)
	int *numbers;                            // number of particles in each cell
	double mass,q_mass;
	double *d_ctrlParticles;
	int jmp;
	//	                                        for periodical FIELDS
	int i_s,k_s;                        //
	double *E;                              //the field
	int dir;                                // the direction being processed
	int to,from;                            // the range along the direction
	
	//	                                        for periodical CURRENTS
	int dirE;                           // directions
	int N;                           // variables
	
	//                                          electric field solver
	int l_s;                        // variables
	double *H1,*H2;                          // magnetic fields (orthogonal)
	double *J;                              // current
	double c1,c2,tau;                       //grid steps squared
	int dx1,dy1,dz1,dx2,dy2,dz2;            //shifts
	
	//	                                        magnetic field solver
	double *Q;                              // magnetic field at half-step
	double *H;                              // magnetic field
	double *E1,*E2;                         // electric fields (orthogonal)
	int particles_processed_by_a_single_thread;
	unsigned int blockDim_x,blockDim_y,blockDim_z; // block for field solver
	} KernelParams;