$(function(){
	var bluetoothDevice;
	var bluetoothCharacteristic;
	
	var requestDeviceParms = {
		filters: [
			{
				name: ["Bicycle Light"]
			}
		],
		optionalServices: ["25d17b83-8767-4e0d-9c62-0153fb6eae4d"]
		};
		/*
		$("#btnConnect").click(() => {
			console.log("Running BLE Code");
			navigator.bluetooth.requestDevice(requestDeviceParms).then(device => {
				device.gatt.connect().then(gattServer=>{
					gattServer.getPrimaryService("25d17b83-8767-4e0d-9c62-0153fb6eae4d").then(gattService=>{
						gatt = gattService.getCharacteristic("5f70cc2a-89e0-44aa-81ee-ce837a837b87");
						document.getElementById("btnConnect").value="Connected";
						document.getElementById("btnConnect").disabled = true;
						document.getElementById("btnAuto").disabled = false;
						document.getElementById("btnRandom").disabled = false;
						document.getElementById("btnCircle").disabled = false;
						document.getElementById("btnFlash").disabled = false;
						
						gattService.getCharacteristic("77ac075c-6d31-4391-a44b-6e4611690c0b").then(gattCharacteristic=>{
						gattCharacteristic.startNotifications().then(gattCharacteristic=>{
						gattCharacteristic.addEventListener("characteristicvaluechanged", event=>{
						var value = event.target.value.getUint8(0);
						$("#notifiedValue").text("" + value);
					});
				});
			});
		});
		*/
		$("#btnAuto").click(() => {
			bluetoothCharacteristic.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 0;
				gattCharacteristic.writeValue(buffer);
			});
		});
		$("#btnFlash").click(() => {
			bluetoothCharacteristic.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 1;
				gattCharacteristic.writeValue(buffer);
			});
		});
		$("#btnCircle").click(() => {
			bluetoothCharacteristic.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 2;
				gattCharacteristic.writeValue(buffer);
			});
		});
		$("#btnRandom").click(() => {
			log('Clicked random');
			bluetoothCharacteristic.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 3;
				gattCharacteristic.writeValue(buffer);
			});
		});
		$("#btnAngle").click(() => {
			log('Clicked random');
			bluetoothCharacteristic.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 4;
				gattCharacteristic.writeValue(buffer);
			});
		});

		$("#btnConnect").click(() => {
		  let options = {filters: []};

		  options.filters.push({services: ["25d17b83-8767-4e0d-9c62-0153fb6eae4d"]});
		  

		  bluetoothDevice = null;
		  log('Requesting Bluetooth Device...');
		  navigator.bluetooth.requestDevice(options)
		  .then(device => {
			bluetoothDevice = device;
			bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
			return connect();
		  })
		  .catch(error => {
			log('Argh! ' + error);
		  });
		});
		
		function connect() {
		  log('Connecting to Bluetooth Device...');
		  return bluetoothDevice.gatt.connect()
		  .then(server => {
			log('> Bluetooth Device connected');
			server.getPrimaryService("25d17b83-8767-4e0d-9c62-0153fb6eae4d").then(gattService=>{
				gatt = gattService.getCharacteristic("5f70cc2a-89e0-44aa-81ee-ce837a837b87");
				bluetoothCharacteristic = gatt;
			});
			document.getElementById("btnConnect").value="Connected";
			document.getElementById("btnConnect").disabled = true;
			document.getElementById("btnAuto").disabled = false;
			document.getElementById("btnRandom").disabled = false;
			document.getElementById("btnCircle").disabled = false;
			document.getElementById("btnFlash").disabled = false;
			document.getElementById("btnAngle").disabled = false;
		  });
		}

		function onDisconnectButtonClick() {
		  if (!bluetoothDevice) {
			return;
		  }
		  log('Disconnecting from Bluetooth Device...');
		  if (bluetoothDevice.gatt.connected) {
			bluetoothDevice.gatt.disconnect();
		  } else {
			log('> Bluetooth Device is already disconnected');
		  }
		}

		function onDisconnected(event) {
		  // Object event.target is Bluetooth Device getting disconnected.
			log('> Bluetooth Device disconnected');
			document.getElementById("btnConnect").value="Connect";
			document.getElementById("btnConnect").disabled = false;
			document.getElementById("btnAuto").disabled = true;
			document.getElementById("btnRandom").disabled = true;
			document.getElementById("btnCircle").disabled = true;
			document.getElementById("btnFlash").disabled = true;
			document.getElementById("btnAngle").disabled = true;
		}


		function onReconnectButtonClick() {
		  if (!bluetoothDevice) {
			return;
		  }
		  if (bluetoothDevice.gatt.connected) {
			log('> Bluetooth Device is already connected');
			return;
		  }
		  connect()
		  .catch(error => {
			log('Argh! ' + error);
		  });
		}		
		/*
		$("#test2").click(() => {
			console.log("Running BLE Code");
			navigator.bluetooth.requestDevice(requestDeviceParms).then(device => {
				device.gatt.connect().then(gattServer=>{
					gattServer.getPrimaryService("25d17b83-8767-4e0d-9c62-0153fb6eae4d").then(gattService=>{
						gattService.getCharacteristic("77ac075c-6d31-4391-a44b-6e4611690c0b").then(gattCharacteristic=>{
							gattCharacteristic.startNotifications().then(gattCharacteristic=>{
								gattCharacteristic.addEventListener("characteristicvaluechanged", event=>{
									var value = event.target.value.getUint8(0);
									$("#notifiedValue").text("" + value);
								});
							});
						});
					});
				});
			});
		});
		*/
	});
					
					
					
					
					
					
					
					
