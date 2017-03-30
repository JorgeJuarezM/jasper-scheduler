var scheduler = require("node-schedule");
var path = require("path");
var request = require("request");

var nodemailer = require("nodemailer"),
    transport  = nodemailer.createTransport('direct');



var NORMALIZE_DATE = function (_today) {
    _today.setTime(_today.getTime() - (_today.getTimezoneOffset() * 60 * 1000));
    return _today;
};

var TODAY = (function () {
    return NORMALIZE_DATE(new Date());
})();


var ADD_DAYS = function (interval, date) {
    var _date = new Date(date.getTime());

    _date.setDate(_date.getDate() + interval);

    return NORMALIZE_DATE(_date);
};

var DATE_TO_STRING = function (_today) {
    return _today.toISOString().substr(0, 10);
};

var FIRST_MONTH_DAY = (function () {
    var _today = new Date();
    _today.setDate(1);
    return NORMALIZE_DATE(_today);
})();


var LAST_MONTH_DAY = (function () {
    var _today = new Date();
    _today = new Date(_today.getFullYear(), _today.getMonth() + 1, 0);
    return NORMALIZE_DATE(_today);
})();


var LAST_MONTH = (function () {
    var _today = new Date();
    _today = new Date(_today.getFullYear(), _today.getMonth() + 1, 1);

    return NORMALIZE_DATE(_today).getMonth() + 1;
})();


var evalValue = function(value) {
	return eval(value);
}




var config = require("./config");
var crons = config.cron;

for(cronIndex in crons)
{
	var cron = crons[cronIndex];
	var cronUrl = "http://" + path.join(config.janusUrl, (cron.id + ".html"));

	

	scheduler.scheduleJob((cron.interval || "* 0 * * * *"), (function() {
		return function() {
			console.log("Evento En Ejecucion");

			var params = cron.params || {};
			Object.keys(params).forEach(function(__key){
				if(Array.isArray(params[__key]))
				{
					params[__key] = evalValue(params[__key][0]);
				}
			});

			var paramsToSend = JSON.parse(JSON.stringify(params));

			paramsToSend["j_username"] = "joeuser";
			paramsToSend["j_password"] = "joeuser";


			console.log(params);

			request({
				url: cronUrl,
				qs: paramsToSend
			}, function(error, response, data){
				if(error)
				{
					console.log(error);
				}
				else
				{
					transport.sendMail({
			            from   : "Janus <janus@precisionglobal.mx>", // sender address
			            to     : (cron.to || ["jorge.juarez@precisionglobal.com"]).join(","),
			            replyTo: "jorge.juarez@precisionglobal.com",
			            subject: cron.subject + " " + (new Date()).toString(), // Subject line
			            //text   : "Prueba de Envio RAW", // plaintext body
			            html   : data.toString() 
			        }, function () {
			        	console.log(cron.id + " Sended at " + (new Date()).toString());
			        });
				}
				
			});
	}
	})());
}
