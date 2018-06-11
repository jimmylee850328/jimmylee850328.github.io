#### station_data_list 的更改過程

1.  **appmenu.vue**
	```javascript 
	function makeTyphoonDateList(val) { // 按下任意颱風
		this.station_get_station_data(jsonTime[0], jsonTime[jsonTime.length - 1]);
	}
	```

2.  **station.js**
	```javascript 
	this.stn_data = res.data['data'][parameter[0]];
	```

3. **station.vue**
	```javascript 
	// stn_data in watch

	if( station_data_list && station_data_list.length > 0 &&
	    station_data_list[0].value && station_data_list[0].value.length > 0 ) {

		// 如果stn_data更新了，而且value不是空的，就存進store。
		this.$store.dispatch('set_station_data_list', station_data_list);
		
		// call station.vue 的 tymap_show_typhoon_text
		// 該function有判斷station_type
		bus.$emit('tymap_show_typhoon_text');
	};
	```

--- 
**station_data_list 的範例** 
```javascript
// station_data_list example when the station_type = precp, station_region = west

station_data_list = [
{
	id: "467480",
	lat: 120.4329,
	lon: 23.4959,
	value: Array(216) // value 是 {time, value(雨量、風速、時溫濕度)}
}, 
{
	id: "467490",
	lat:120.6841,
	lon:24.1457,
	value:Array(216)
}];
```

---

#### station_data_list 會受到以下三點的改變而改變
1. 不同颱風 (typhoonName)
2. 氣象變數 (station_type)
3. 常用區域 (station_region)
