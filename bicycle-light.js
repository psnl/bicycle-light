$(function(){
	var gatt = null;
	var requestDeviceParms = {
		filters: [
			{
				name: ["Bicycle Light"]
			}
		],
		optionalServices: ["25d17b83-8767-4e0d-9c62-0153fb6eae4d"]
		};
		
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
					});
				});
			});
		});
		$("#btnAuto").click(() => {
			gatt.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 0;
				gattCharacteristic.writeValue(buffer);
			});
		});
		$("#btnFlash").click(() => {
			gatt.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 1;
				gattCharacteristic.writeValue(buffer);
			});
		});
		$("#btnCircle").click(() => {
			gatt.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 2;
				gattCharacteristic.writeValue(buffer);
			});
		});
		$("#btnRandom").click(() => {
			gatt.then(gattCharacteristic=>{
				var buffer = new Uint8Array(1);
				buffer[0] = 3;
				gattCharacteristic.writeValue(buffer);
			});
		});
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
					
					
					
					
					
					
					
					
