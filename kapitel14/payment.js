const methodData = [{ supportedMethods: 'basic-card' }];
const details = {
	displayItems: [{
		label: 'Krokantbecher',
		amount: { currency: 'EUR', value: '4.50' }
	}, {
		label: 'Extra Sahne',
		amount: { currency: 'EUR', value: '0.75' }
	}],
	total: {
		label: 'Summe',
		amount: { currency: 'EUR', value: '5.25' }
	}
};
const options = { requestPayerName: true };
const request = new PaymentRequest(methodData, details, options);

const button = document.querySelector('button');
const output = document.querySelector('pre');

button.onclick = () => {
	request.canMakePayment()
		.then(() => request.show())
		.then(response => {
			output.innerText = JSON.stringify(response, null, 2);
			response.complete('success');
		});
};
