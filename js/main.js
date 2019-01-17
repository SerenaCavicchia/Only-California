
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

								{ x: "AQI", value: aqi, normal: { fill: "#86DC8D" }, },
								{ x: "Total", value: 100 - aqi, normal: { fill: "Gray" }, label: { fontColor: "rgba(0,0,0,0)" } },
							];

							// create a pie chart and set the data
							var chart = anychart.pie(data);



							/* set the inner radius
							(to turn the pie chart into a doughnut chart)*/
							chart.background().fill("transparent");

							data.fill("red");
							data.fill("Gray");

							chart.innerRadius("40%");


							// set the container id
							chart.container("GraphicBox");



							// initiate drawing the chart
							chart.draw();


						});




						//if per l'svg
						if (aqi <= 30) {
							document.getElementById('img').setAttribute('src', "SVG/smileG.svg");
							document.getElementById("van").innerHTML = aqi;
							document.getElementById("van").style.color = "#86DC8D";
							document.getElementById("hand").innerHTML = "Il fattore AQI di " + res.data.city + " è:";

						}
						else if (aqi > 30 && aqi < 60) {
							document.getElementById('img').setAttribute('src', "SVG/smileY.svg");
							document.getElementById("van").innerHTML = aqi;
							document.getElementById("van").style.color = "#E2A700";
							document.getElementById("hand").innerHTML = "Il fattore AQI di " + res.data.city + " è:";
							anychart.onDocumentReady(function () {

								$("#GraphicBox").empty();
	
								// create data
								var data = [
	
									{ x: "AQI", value: aqi, normal: { fill: "#E2A700" }, },
									{ x: "Total", value: 100 - aqi, normal: { fill: "Gray" }, label: { fontColor: "rgba(0,0,0,0)" } },
								];
	
								// create a pie chart and set the data
								var chart = anychart.pie(data);
	
	
	
								/* set the inner radius
								(to turn the pie chart into a doughnut chart)*/
								chart.background().fill("transparent");
	
								data.fill("red");
								data.fill("Gray");
	
								chart.innerRadius("40%");
	
	
								// set the container id
								chart.container("GraphicBox");
	
	
	
								// initiate drawing the chart
								chart.draw();
	
	
							});

						}
						else if (aqi > 60 && aqi <= 500) {
							document.getElementById('img').setAttribute('src', "SVG/smileR.svg");
							document.getElementById("van").innerHTML = aqi;
							document.getElementById("van").style.color = "#EF4244";
							document.getElementById("hand").innerHTML = "Il fattore AQI di " + res.data.city + " è:";
							
						anychart.onDocumentReady(function () {

							$("#GraphicBox").empty();

							// create data
							var data = [

								{ x: "AQI", value: aqi, normal: { fill: "#EF4244" }, },
								{ x: "Total", value: 100 - aqi, normal: { fill: "Gray" }, label: { fontColor: "rgba(0,0,0,0)" } },
							];

							// create a pie chart and set the data
							var chart = anychart.pie(data);



							/* set the inner radius
							(to turn the pie chart into a doughnut chart)*/
							chart.background().fill("transparent");

							data.fill("red");
							data.fill("Gray");

							chart.innerRadius("40%");


							// set the container id
							chart.container("GraphicBox");



							// initiate drawing the chart
							chart.draw();


						});


						}
					}
				)
			})
		}
	);
}
);
;
