#include <stdio.h>

void mergeSort(int arr[], int size);
void merge(int leftArr[], int leftSize, int rightArr[], int rightSize, int arr[], int size);
void printArr(int arr[], int size);

int main()
{

	int arr[] = {1, 0, 7, 3, 2, 9, 5, 4, 6, 8};
	int size = sizeof(arr) / sizeof(arr[0]);

	mergeSort(arr, size);

	printArr(arr, size);

	return 0;
}

void mergeSort(int arr[], int size)

{

	if (size <= 1)
		return; // base case

	int middle = size / 2;
	int leftSize = middle;
	int rightSize = size - middle;
	int leftArr[leftSize];
	int rightArr[rightSize];

	int i = 0;
	int j = 0;

	for (; i < size; i++)
	{
		if (i < middle)
		{
			leftArr[i] = arr[i];
		}
		else
		{
			rightArr[j] = arr[i];
			j++;
		}
	}
	mergeSort(leftArr, leftSize);
	mergeSort(rightArr, rightSize);
	merge(leftArr, leftSize, rightArr, rightSize, arr, size);
}
void merge(int leftArr[], int leftSize, int rightArr[], int rightSize, int arr[], int size)
{
	int i = 0, l = 0, r = 0; // indices

	// check the conditions for merging
	while (l < leftSize && r < rightSize)
	{
		if (leftArr[l] < rightArr[r])
		{
			arr[i] = leftArr[l];
			i++;
			l++;
		}
		else
		{
			arr[i] = rightArr[r];
			i++;
			r++;
		}
	}
	while (l < leftSize)
	{
		arr[i] = leftArr[l];
		i++;
		l++;
	}
	while (r < rightSize)
	{
		arr[i] = rightArr[r];
		i++;
		r++;
	}
}

void printArr(int arr[], int size)
{
	for (int i = 0; i < size; i++)
	{
		printf("%d ", arr[i]);
	}
	printf("\n");
}