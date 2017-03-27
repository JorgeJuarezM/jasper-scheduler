//Readme: https://github.com/node-schedule/node-schedule#object-literal-syntax


module.exports = {
	janusUrl: "172.16.100.153:8080/jasperserver/rest_v2/reports/reports/pro/",
	cron: [
		{
			id: "Concentrado_Eventos_Produccion",
			params: {
				FechaInicial: ["ADD_DAYS(-1, TODAY)"], //Si es calculado (formula) va entro corchetes, si es fijo va como string solo entre comillas
				FechaFinal: ["ADD_DAYS(-1, TODAY)"]
			},
			to: [
				"juan.godinez@precisionglobal.com", 
				"jjuarez007@gmail.com"
			],
			subject: "Production Times",
			interval: {
				hour: 9,
				dayOfWeek: [2, 3, 4, 5, 6]
			}
		}
		// Descomenta para anexar otro reporte y replazar valores
		// , {
		// 	id: "Concentrado_Eventos_Produccion",
		// 	params: {
		// 		FechaInicial: ["ADD_DAYS(-1, TODAY)"], //Si es calculado (formula) va entro corchetes, si es fijo va como string solo entre comillas
		// 		FechaFinal: ["ADD_DAYS(-1, TODAY)"]
		// 	},
		// 	to: [
		// 		"juan.godinez@precisionglobal.com", 
		// 		"jjuarez007@gmail.com"
		// 	],
		// 	subject: "Production Times",
		// 	interval: {
		// 		hour: 9,
		// 		dayOfWeek: [2, 3, 4, 5, 6]
		// 	}
		// }
	]
}