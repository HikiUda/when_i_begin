#include <stdio.h>

void bubbleSort(int arr[], int size);

int main()
{

	int arr[] = {1, 0, 7, 3, 2, 9, 5, 4, 6, 8};
	int size = sizeof(arr) / sizeof(arr[0]);

	bubbleSort(arr, size);

	for (int i = 0; i < size; i++)
	{
		printf("%d ", arr[i]);
	}

	return 0;
}

void bubbleSort(int arr[], int size)
{
	for (int i = 0; i < size; i++)
	{
		int isSort = 1;
		printf("%d\n", i);
		for (int j = 0; j < size - i - 1; j++)
		{

			if (arr[j] > arr[j + 1])
			{
				int temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				isSort = 0;
			}
		}
		if (isSort)
		{
			break;
		}
		else
		{
			isSort = 1;
		}
	}
}