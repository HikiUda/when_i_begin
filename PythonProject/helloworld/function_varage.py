def total(a=5, *gaf, **param):
    for single_item in gaf:
        print('single_item', single_item)

    for firct_part, second_part in param.items():
        print(firct_part, second_part)

print(total(10, 1, 2, 3, jack=88, john=44, inge=555))
