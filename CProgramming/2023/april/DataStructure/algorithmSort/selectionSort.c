#include <stdio.h>

void selectionSort(int arr[], int size);

int main()
{
	int arr[] = {1, 0, 7, 3, 2, 9, 5, 4, 6, 8};
	int size = sizeof(arr) / sizeof(arr[0]);

	selectionSort(arr, size);

	for (int i = 0; i < size; i++)
	{
		printf("%d ", arr[i]);
	}

	return 0;
}

void selectionSort(int arr[], int size)
{
	for (int i = 0; i < size - 1; i++)
	{
		int min = i;
		for (int j = i + 1; j < size; j++)
		{
			if (arr[min] > arr[j])
			{
				min = j;
			}
		}
		int temp = arr[i];
		arr[i] = arr[min];
		arr[min] = temp;
	}
}