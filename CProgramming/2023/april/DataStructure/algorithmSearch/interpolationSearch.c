#include <stdio.h>

int interpolationSearch(int arr[], int value, int high);

int main()
{
	// worst case: O(n) [values increase exponentially]
	int arr2[] = {1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048};
	// average case: O(log(log(n)))
	int arr[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};

	int high = sizeof(arr) / sizeof(arr[0]) - 1;
	int index = interpolationSearch(arr, 14, high);
	if (index != -1)
	{
		printf("Value is found on index %d", index);
	}
	else
	{
		printf("Value is not found");
	}
	return 0;
}

int interpolationSearch(int arr[], int value, int high)
{
	int low = 0;

	while (high >= low && value >= arr[low] && value <= arr[high])
	{
		int pos = low + (high - low) / (arr[high] - arr[low]) * (value - arr[low]);
		printf("Search on pos %d\n", pos);
		if (arr[pos] == value)
		{
			return pos;
		}
		else if (value > arr[pos])
		{
			low = pos + 1;
		}
		else
		{
			high = pos - 1;
		}
	}

	return -1;
}