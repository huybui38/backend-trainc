#include <stdio.h>

#define MAX 10

int array[MAX];

void getInput() {
	int i;
	for (i = 0; i < MAX; i++) {
		printf("Enter element %d: ", i + 1);
		scanf("%d", &array[i]);
	}
	printf("\n");
}

void printArray(int arr[]) {
	int i;
	for (i = 0; i < MAX; i++) {
		printf("%4d", arr[i]);
	}
	printf("\n");
}

void descending() {
	int i, j;
	int arr[MAX];
	for (i = 0; i < MAX; i++){
		arr[i] = array[i];
	}
	printf("Your array after descending sort: ");
	for (i = 0; i < MAX - 1; i++) {
		for (j = i + 1; j < MAX; j++) {
			if (arr[j] > arr[i]) {
				int tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			}
		}
	}
	printArray(arr);
}

void sumEven() {
	int i, sum = 0;
	for (i = 0; i < MAX; i++) {
		if (array[i] % 2 == 0) {
			sum += array[i];
		}
	}
	printf("Sum of all even values stored in this array: %d\n", sum);
}

int isPrime(int num) {
	int i, count = 0;
	if (num <= 1) return 0;
	else {
		for (i = 2; i*i <= num; i++){
			if (num % i == 0) count++;
		}
		if (count == 0) return 1;
		else return 0;
	}
}

void printPrime() {
	int i, check = 0;
	printf("Prime numbers stored in this array: ");
	for (i = 0; i < MAX; i++) {
		if (isPrime(array[i])) {
			printf("%4d", array[i]);
			check++;
		}
	}
	if (check == 0) printf("Don't have any values");
	printf("\n");
}

int search(int num) {
	int i, count = 0;
	for (i = 0; i < MAX; i++) {
		if (array[i] == num) {
			count++;
		}
	}
	if (count == 1) return 1;
	else return 0;
}

void listValues() {
	int i;
	printf("Values appear once in this array: ");
	for (i = 0; i < MAX; i++) {
		if (search(array[i])) printf("%4d", array[i]);
	}
	printf("\n");
}

int main() {
	getInput();
	printf("Your array: ");
	printArray(array);
	descending();
	sumEven();
	printPrime();
	listValues();
	return 0;
}
