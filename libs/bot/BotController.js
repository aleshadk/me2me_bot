'use strict';

class BotController {
	constructor(bot, settings, parser) {
		this.bot = bot;
		this.settings = settings;
		this.parser = parser;

		this._bind();
	}


	_answer(id, text) {
		if ( !text ) {
			text = "Ваша команда не распознана";
		} 

   		this.bot.sendMessage(id, text);
	}

	_bind() {
	    this.bot.on('message', (msg) => {
		   	const text = msg.text;
		   	const id = msg.chat.id;
		   	const name = msg.from.first_name;
		   	const lastName = msg.from.last_name;

		   	if ( this.settings.debug.incoming ) {
		   		console.log('incoming message from', name, lastName, id, 'with text', text);
		   	}

		   	this.parser(text, id, name, lastName);

		   	this._answer(id);
		});
	}

}

module.exports = BotController;