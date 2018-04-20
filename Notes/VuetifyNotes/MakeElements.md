## Make Elements

### It's time to make a lot `<td>`

* 方式一
#### Html
```html
<td class="text-xs-right"> {{ item.name }} </td>
<td class="text-xs-right"> {{ item.calories }} </td>
<td class="text-xs-right"> {{ item.fat }} </td>
<td class="text-xs-right"> {{ item.carbs }} </td>
<td class="text-xs-right"> {{ item.protein }} </td>
```

#### Vue Object
```javascript
data: {
	item = {
		name: 'Frozen Yogurt',
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0
	}
}
```

* 方式二
#### Html
```html
<td v-for="mykey in mykeys" class="text-xs-right">
	{{ item[mykeys] }}
</td>
```

#### Vue Object
```javascript
data: {
	mykeys = ['name','calories','fat','carbs','protein'],
	item = {
		name: 'Frozen Yogurt',
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0
	}
}
```
