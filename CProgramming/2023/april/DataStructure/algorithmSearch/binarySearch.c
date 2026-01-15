#include <stdio.h>

/*
	l - start index
	r - end index
	e - elemnt, that we search
	a - array
*/
int binary_search(int a[], int e, int l, int r);

int main()
{
	int unsorted[] = {9, 5, 13, 3, 8, 7, 2, 12, 6, 10, 4, 11, 1};
	int sorted[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14};

	int index = binary_search(sorted, 7, 0, 13);

	if (index != -1)
	{
		printf("Element %d is found at index %d", sorted[index], index);
	}
	else
	{
		printf("Element is not found");
	}

	return 0;
}
int binary_search(int a[], int e, int l, int r)
{
	while (l <= r)
	{
		int mid = l + (r - l) / 2;
		if (a[mid] == e)
		{
			return mid;
		}
		else if (a[mid] > e)
		{
			r = mid - 1;
		}
		else
		{
			l = mid + 1;
		}
		printf("El: %d, on index: %d\n", a[mid], mid);
	}
	return -1;
}
