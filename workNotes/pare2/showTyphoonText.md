#### tymap的showTyphoonText(currentIndex) 會在這幾個時間點呼叫

1. **appmenu.vue (滑動date slider時)**
	```javascript 
	// typhoonDateIndex[watch] call the function below
	
	function tymap_show_typhoon_text() {
		var currentIndex = this.getTyphoonDateInJsonIndex();
		if(currentIndex < 0)
		    currentIndex = this.lastTyphoonDateInJsonIndex;
		
		// 判斷index是否>=0, station_type是否跟風有關    
		if(currentIndex  >=  0  && (this.station_type  ==  'ws'  ||  this.station_type  ==  'wsgust'))
			bus.$emit('show_typhoon_text', currentIndex);
	}
	```
2. **station.vue (station.js的stn_data更動時)**
	```javascript 
	// stn_data[watch]

	if( station_data_list && station_data_list.length > 0 &&
	    station_data_list[0].value && station_data_list[0].value.length > 0 ) {

		// 如果stn_data更新了，而且value不是空的，就存進store。
		this.$store.dispatch('set_station_data_list', station_data_list);
		
		// call station.vue 的 tymap_show_typhoon_text
		// 該function有判斷station_type
		bus.$emit('tymap_show_typhoon_text');
	};
	```