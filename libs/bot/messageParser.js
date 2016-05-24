function messageParser(text, id, name, lastName) {

	const messageType = _getMessageType(text);

	switch (messageType) {
		case 'add': 
			_add(text, id);
	}

	console.log(text);
}

function _getMessageType(text) {
	text = text.toLowerCase();

	if ( text.indexOf('add ') === 0 || text.indexOf('добавить ') === 0 ) {
		return 'add';
	} 

	return null;
}

function _add(text, id) {

}


module.exports = messageParser;
