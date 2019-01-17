
$(function () {

	$.getJSON(
		"https://api.airvisual.com/v2/cities?state=California&country=USA&key=bc4bXu4aZde54gJts",
		function (res) {
			console.log(res);

			let t = Handlebars.compile('<option value="{{ city }}">{{ city }}</option>');

			res.data.forEach(function (el) {
				$("#select").append(t(el));
			})

			/*var source = $("#template").html();
			var template = Handlebars.compile(source);

			res.data.forEach(function (el1) {
				$("#handText").append(template(el1));
			})*/



			$("#select").change(function () {

				//sostituisco API
				$.getJSON(
					"https://api.airvisual.com/v2/city?city=" + document.getElementById('select').value + "&state=California&country=USA&key=bc4bXu4aZde54gJts",
					function (res) {
						console.log(res);

						let aqi = res.data.current.pollution.aqius
						console.log(aqi);


						// fonte: https://docs.anychart.com/Basic_Charts/Doughnut_Chart
						
						anychart.onDocumentReady(function () {

							$("#GraphicBox").empty();

							// create data
							var data = [
							  {x: "A", value: aqi},
							  {x: "B", value: 100 - aqi},
							];
						
							// create a pie chart and set the data
							var chart = anychart.pie(data);
							data.normal().fill("#00cc99", 0.3);
							
							

							/* set the inner radius
							(to turn the pie chart into a doughnut chart)*/
							chart.background().fill("transparent");
							
							chart.innerRadius("40%");
							
						
							// set the container id
							chart.container("GraphicBox");

												
							// initiate drawing the chart
							chart.draw();

						   //bisogna eliminare il chart attuale e disegnarne uno nuovo per evitare che si sovrappongano
							
						});

						
						
						//crea funzione del grafico, con documen. ecc.. elimini la funzione al clik di un nuovo select e ppoi riavii(callback)

						//if per l'svg
						if (aqi <= 50) {
							document.getElementById('img').setAttribute('src', "SVG/smileG.svg");
							document.getElementById("van").innerHTML = aqi;
							document.getElementById("van").style.color = "#86DC8D";
							document.getElementById("hand").innerHTML = "Il fattore AQI di " + res.data.city + " è:";
							


						}
						else if (aqi > 50 && aqi < 60) {
							document.getElementById('img').setAttribute('src', "SVG/smileY.svg");
							document.getElementById("van").innerHTML = aqi;
							document.getElementById("van").style.color = "#E2A700";
							document.getElementById("hand").innerHTML = "Il fattore AQI di " + res.data.city + " è:";
							
						}
						else if (aqi > 60 && aqi <= 500) {
							document.getElementById('img').setAttribute('src', "SVG/smileR.svg");
							document.getElementById("van").innerHTML = aqi;
							document.getElementById("van").style.color = "#EF4244";
							document.getElementById("hand").innerHTML = "Il fattore AQI di " + res.data.city + " è:";
							
						}
					}
				)
			})
		}
	);
}
);
;
