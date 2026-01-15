#include <stdio.h>

void meow(int l, int n, char str);
void mario(int n, int k);

int main(void)
{
	meow(2, 3, 'o');
	mario(3, 3);
}

void meow(int l, int n, char str)
{
	int i = 0;
	while (i < l)
	{
		i++;
		for (int j = 0; j < n; j++)
		{
			printf("%i%c%i\n", l, str, n);
		}
		if (i < l)
		{
			printf("\n");
		}
		else
		{
			printf("End\n");
		}
	}
}

void mario(int n, int k)
{
	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j < k; j++)
		{
			printf("#");
		}
		printf("\n");
	}
}