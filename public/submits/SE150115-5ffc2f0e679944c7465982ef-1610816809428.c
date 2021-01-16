#include <stdio.h>;
int main()
{
	long a,b,c,max;
	scanf("%d%d%d",&a,&b,&c); 
	max=0;
	if (a>b) {max=a;} else {max=b;}
	if (c>max) {max=c;}
	printf("%d",max);
	return 0;
}
