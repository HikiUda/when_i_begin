#include <stdio.h>

int valid_triangle(int a, int b, int c);

int main(int n)
{
	int side_triangle[n];

	side_triangle[0] = 3;
	side_triangle[1] = 2;
	side_triangle[2] = 4;

	int result = valid_triangle(3, 2, 4);
	if (result == 1)
	{
		printf("%i\n", result);
	}
	else
	{
		printf("%i\n", result);
	}
	for (int i = 0; i < n; i++)
	{
		printf("%i", side_triangle[i]);
	}
}

int valid_triangle(int a, int b, int c)
{
	if (a > 0 && b > 0 && c > 0)
	{
		if (a < b + c && b < a + c && c < a + b)
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}
}