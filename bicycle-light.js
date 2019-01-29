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

		$("#choiceMinimum").click(() => {
			write(document.getElementById("choiceMinimum").value);
		});

		$("#contactRing").click(() => {
			write(document.getElementById("contactRing").value);
		});

		$("#contactFlash").click(() => {
			write(document.getElementById("contactFlash").value);
		});

		$("#contactCircle").click(() => {
			write(document.getElementById("contactCircle").value);
		});

		$("#contactRandom").click(() => {
			write(document.getElementById("contactRandom").value);
		});

		$("#contactPulse").click(() => {
			write(document.getElementById("contactPulse").value);
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
		
		function write(value) {
			var buffer = new Uint8Array(1);
			buffer[0] = value;
			bluetoothCharacteristic.writeValue(buffer);
		}
		
		function connect() {
		  log('Connecting to Bluetooth Device...');
		  return bluetoothDevice.gatt.connect()
		  .then(server => {
			log('> Bluetooth Device connected');
			server.getPrimaryService("25d17b83-8767-4e0d-9c62-0153fb6eae4d").then(gattService=>{
				gattService.getCharacteristic("5f70cc2a-89e0-44aa-81ee-ce837a837b87").then(gattCharacteristic=>{
					bluetoothCharacteristic = gattCharacteristic;
					gattCharacteristic.readValue().then(value1 => {
						var value = value1.getUint8(0);
						var elements = document.getElementsByName("modeSelect");
						for (var i = 0, l = elements.length; i < l; i++)
						{
							if (elements[i].value == value)
							{
								elements[i].checked = true;
								break;
							}
						}
					});
				});
				
				gattService.getCharacteristic("77ac075c-6d31-4391-a44b-6e4611690c0b").then(gattCharacteristic=>{
					gattCharacteristic.startNotifications().then(gattCharacteristic=>{
						gattCharacteristic.addEventListener("characteristicvaluechanged", event=>{
							var value = event.target.value.getUint16(0, true);
							$("#notifiedValue").text("" + value);
						});
					});
				});

			});
			document.getElementById("btnConnect").value="Connected";
			document.getElementById("btnConnect").disabled = true;
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
	});
