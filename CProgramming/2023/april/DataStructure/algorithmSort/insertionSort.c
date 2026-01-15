#include <stdio.h>

void insertionSort(int arr[], int size);

int main()
{
	int arr[] = {1, 0, 7, 3, 2, 9, 5, 4, 6, 8};
	int size = sizeof(arr) / sizeof(arr[0]);

	insertionSort(arr, size);

	for (int i = 0; i < size; i++)
	{
		printf("%d ", arr[i]);
	}

	return 0;
}

void insertionSort(int arr[], int size)
{
	for (int i = 0; i < size; i++)
	{
		int temp = arr[i];
		int j = i - 1;

		while (j >= 0 && arr[j] > temp)
		{
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = temp;
	}
}