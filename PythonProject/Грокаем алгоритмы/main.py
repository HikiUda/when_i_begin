# Бинарный поиск

nums = [5, 7, 6, 9, 8, 4, 2, 3, 1]
nums.sort()
print(nums)

search_for = 2 # Что ищем

lowest = 0
highest = len(nums) - 1
index = None # Будующий индекс

while(lowest <= highest) and (index is None):
    #повторяем пока не найдено
    mid = (lowest+highest)//2#середина

    if nums[mid] == search_for:
        # нашли по середине
        index = mid
    else:
        if search_for < nums[mid]:
            # Ищем в левой части списка
            highest = mid - 1
        else:
            # Ищем в правой части списка
            lowest = mid + 1

print(f'Элемент {search_for} находиться под индексом {index}')

