#include <stdio.h>

int main(void) {
	char a[100];
  char b[100];
  gets(a);
  gets(b);
  printf("%s", a); 
  printf("%s", b);
  return 0;
}
