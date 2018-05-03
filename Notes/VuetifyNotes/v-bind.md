## v-bind

### v-bind的用法

* 固定的寫法

#### Html
```html
<v-container fluid grid-list-md>
```

***

* 動態的寫法

#### Html(動態切換不同的size)
```html
<v-container v-bind="{ [`grid-list-${size}`]: true , fluid: true }">
```

#### Vue Object
```javascript
data: {
	size: 'md'
}
```
