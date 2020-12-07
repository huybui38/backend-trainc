#include <stdio.h>

int main(void) {
	char a[100];
  int b;
  printf("Nhap vao a = ");
  gets(a);
  printf("Nhap vao b = ");
  scanf("%d", &b);
  printf("%s", a); 
  printf("b + 1 = %d", b + 1);
  return 0;
}
