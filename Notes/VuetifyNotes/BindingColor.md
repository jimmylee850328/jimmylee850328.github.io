## Binding Color

### 兩種方式去動態改變color

* 方式一
#### Html
```html
<v-chip :color="`${message.color} lighten-2`" 
		text-color="white">Colored Chip</v-chip>
```
#### Vue Object
```javascript
data: {
	message: {
		color: 'red'
	}
}
```

* 方式二
#### Html
```html
<v-chip :color="message.color" 
		text-color="white">Colored Chip</v-chip>
```
#### Vue Object
```javascript
data: {
	message: {
		color: 'red lighten-2'
	}
}
```
