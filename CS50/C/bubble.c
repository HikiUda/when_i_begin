#include <stdio.h>

int main(void)
{
	int array[] = {3, 4, 1, 5, 2};

	for (int j = 5; j > 0; j--)
	{
		for (int i = 0; i < j; i++)
		{
			if (array[i] > array[i + 1])
			{
				int n = array[i + 1];
				array[i + 1] = array[i];
				array[i] = n;
			}
		}
	}

	for (int i = 0; i < 5; i++)
	{
		printf("%i", array[i]);
	}
}