#include <stdio.h>
#include <stdlib.h>

int length(char *a);
int compare(char *a, char *b);
char *strcopy(char *orig);

int main(void)
{
	char *string1 = "HI!";
	char *string2 = "BYE!";

	int yn = compare(string1, string2);
	if (yn)
	{
		printf("Yes");
	}
	else
	{
		printf("No");
	}

	char *copystr = strcopy(string2);
	printf("%sf", copystr);
}

int length(char *str)
{
	int len = 0;

	while (str[len] != '\0')
	{
		len++;
	}
	return len;
}

int compare(char *a, char *b)
{
	int a_len = length(a);
	int b_len = length(b);
	if (a != b)
	{
		return 0;
	}

	int i = 0;

	while (i < a_len && i < b_len)
	{
		if (a[i] != b[i])
		{
			return 0;
		}
		i++;
	}

	return 1;
}

char *strcopy(char *orig)
{
	int i = length(orig);

	char *copy = malloc(i + 1);

	for (int j = 0; j <= i; j++)
	{
		copy[j] = orig[i];
	}
	printf("%sf", copy);
	return copy;
}