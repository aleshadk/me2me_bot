'use strict';

class DataBase {
	constructor(mongoose) {
		this.mongoose = mongoose;

		this.user = mongoose.model(
			'User', 
			new mongoose.Schema({
				id: Number,
				firstName: { type: String },
				lastName: { type: String },
				requestCount: Number
			})
		);

		this.notice = mongoose.model(
			'Notice', 
			new mongoose.Schema({
				userId: String,
				timestamp: Number,
		   	content: String,
		   	hashTags: [String],
		   	isReaded: Boolean
			})
		);

		this.abc = "abc";

		this.getUser = function(id) {
			return new Promise((resolve, reject) => {
				this.user.findOne({ id: id }, function(err, user) {
		      	if (err) {
		         	reject("db error");
		      	}

			      if (user) {
			      	resolve(user);
			      }

		         reject("no user");
		      });
   		});
		}
	}

}

module.exports = DataBase;