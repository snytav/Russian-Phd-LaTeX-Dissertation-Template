comm:   comm_main.f comm_graph.f micro.o
	mpif90 -o comm comm_graph.f comm_main.f micro.o 

micro.o : 
	gcc -c micro.c	
	
clean:
	rm *.o comm

