#include <stdio.h>
#include <ctype.h>

int main()
{

	char unit;
	float temp;

	printf("\nIs the temperature in (F) or (C)?: ");
	scanf("%c", &unit);

	unit = toupper(unit);

	switch (unit)
	{
	case 'C':
		printf("\nEnter the temp in Celsius: ");
		scanf("%f", &temp);
		temp = (temp * 9 / 5) + 32;
		printf("\nThe temp in Farenheit is: %.1f", temp);
		break;
	case 'F':
		printf("\nEnter the temp in Farenheit: ");
		scanf("%f", &temp);
		temp = ((temp - 32) * 5) / 9;
		printf("\nThe temp in Celsiusc is: %.1f", temp);
		break;

	default:
		printf("\n %c is not a valid unit of measurment", unit);
		break;
	}

	return 0;
}