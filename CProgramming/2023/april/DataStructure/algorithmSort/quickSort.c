#include <stdio.h>

void quickSort(int arr[], int start, int end);
int partition(int arr[], int start, int end);

void printArr(int arr[], int size)
{
	for (int i = 0; i < size; i++)
	{
		printf("%d ", arr[i]);
	}
	printf("\n");
}

int main()
{

	int arr[] = {1, 0, 7, 3, 2, 9, 5, 4, 6, 8};
	int size = sizeof(arr) / sizeof(arr[0]);

	quickSort(arr, 0, size - 1);

	printArr(arr, size);

	return 0;
}

void quickSort(int arr[], int start, int end)
{

	if (end <= start)
		return; // base case

	int pivot = partition(arr, start, end);
	quickSort(arr, start, pivot - 1);
	quickSort(arr, pivot + 1, end);
}
int partition(int arr[], int start, int end)
{
	int pivot = arr[end];
	int i = start - 1;

	for (int j = start; j <= end - 1; j++)
	{
		if (arr[j] < pivot)
		{
			i++;
			int temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
	}
	i++;
	int temp = arr[i];
	arr[i] = arr[end];
	arr[end] = temp;

	return i;
}