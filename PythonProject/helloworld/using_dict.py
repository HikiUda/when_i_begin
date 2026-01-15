ad = { 'Pop'  : 'apple',
       'Gach' : 'orange',
       'Maz'  : 'porridge',
       'Nina' : 'milk'
       }
print('Pop buy', ad['Pop'])

del ad['Pop']

print('\nQ{0}\n'.format(len(ad)))

for name, shop in ad.items():
    print('Name {0} buy {1}'.format(name, shop))

# add
ad['Jack'] = 'meat'

if 'Jack' in ad:
    print('Jack buy', ad['Jack'])
