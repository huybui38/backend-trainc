#include <stdio.h>

int main(void) {
	char a[100];
  char b[100];
  gets(a);
  gets(b);
  printf("a=%s", a); 
  printf("b=%s", b);
  return 0;
}
