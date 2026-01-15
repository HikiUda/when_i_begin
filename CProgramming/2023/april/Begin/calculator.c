#include <stdio.h>

int main()
{
	char operator;
	double num1;
	double num2;
	double result;

	printf("\nEnter an operator (+ - * /): ");
	scanf("%c", &operator);

	printf("\nEnter number 1: ");
	scanf("%lf", &num1);

	printf("\nEnter number 2: ");
	scanf("%lf", &num2);

	if (operator== '+')
	{
		result = num1 + num2;
	}
	else if (operator== '-')
	{
		result = num1 - num2;
	}
	else if (operator== '*')
	{
		result = num1 * num2;
	}
	else if (operator== '/')
	{
		result = num1 / num2;
	}
	else
	{
		printf("%c is not valid operator!", operator);
		return 0;
	}
	printf("The result is %.2lf", result);
	return 0;
}