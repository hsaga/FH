
// Define the mean and std for gothenburg training set for normalization
const meanVar1 = 1.488902;
const meanVar2 = 0.151814;
const meanVar3 = 0.224245;

const stdVar1 = 0.474977;
const stdVar2 = 0.067453;
const stdVar3 = 0.116834;

// Function that makes the predictions
function makePrediction(){
  const age = Number(document.forms["frm1"]["age"].value);
  const ldl = Number(document.forms["frm1"]["ldl"].value);
  const hdl = Number(document.forms["frm1"]["hdl"].value);
  const tg = Number(document.forms["frm1"]["tg"].value);
  const yourPrediction = Number(document.forms["frm1"]["yourPrediction"].value);

  if (age < 1)
  {
    document.getElementById("InputRange").innerHTML = 'Age must be greater than or equal to 1'.bold();
  }

  else if (age > 80)
  {
    document.getElementById("InputRange").innerHTML = 'Age must be less than or equal to 80'.bold();
    document.getElementById("InputRange").innerHTML.style.color = red;
  }

  else if (ldl < 1)
  {
    document.getElementById("InputRange").innerHTML = 'LDL must be greater than or equal to 1'.bold();
  }

  else if (ldl > 14)
  {
    document.getElementById("InputRange").innerHTML = 'LDL must be less than or equal to 14'.bold();
  }

  else if (hdl < 1)
  {
    document.getElementById("InputRange").innerHTML = 'HDL must be greater than or equal to 1'.bold();
  }

  else if (hdl > 5)
  {
    document.getElementById("InputRange").innerHTML = 'HDL must be less than or equal to 5'.bold();
  }

  else if (tg < 1)
  {
    document.getElementById("InputRange").innerHTML = 'TG must be greater than or equal to 1'.bold();
  }

  else if (tg > 10)
  {
    document.getElementById("InputRange").innerHTML = 'TG must be less than or equal to 10'.bold();
  }

  else
  {
    document.getElementById("InputRange").innerHTML = '';

    console.log(yourPrediction);

    // Construct the variables and standardize
    const var1 = (hdl - meanVar1) / stdVar1;
    const var2 = (ldl/age  - meanVar2) / stdVar2;
    const var3 = (tg/ldl  - meanVar3) / stdVar3;

    // Models and predictions
    (async () => {

      // Neural network
      const model = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs_model/model.json');
      const model0 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model0.json');
      const model1 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model1.json');
      const model2 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model2.json');
      const model3 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model3.json');
      const model4 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model4.json');
      const model5 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model5.json');
      const model6 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model6.json');
      const model7 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model7.json');
      const model8 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model8.json');
      const model9 = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs/model9.json');

      let prediction =  model.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction0 =  model0.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction1 =  model1.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction2 =  model2.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction3 =  model3.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction4 =  model4.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction5 =  model5.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction6 =  model6.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction7 =  model7.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction8 =  model8.predict(tf.tensor2d([[var1, var2, var3]]));
      let prediction9 =  model9.predict(tf.tensor2d([[var1, var2, var3]])); 

      predictionArray = prediction.arraySync();
      predictionArray0 = prediction0.arraySync();
      predictionArray1 = prediction1.arraySync();
      predictionArray2 = prediction2.arraySync();
      predictionArray3 = prediction3.arraySync();
      predictionArray4 = prediction4.arraySync();
      predictionArray5 = prediction5.arraySync();
      predictionArray6 = prediction6.arraySync();
      predictionArray7 = prediction7.arraySync();
      predictionArray8 = prediction8.arraySync();
      predictionArray9 = prediction9.arraySync();

      let meanPrediction =  Math.round(predictionArray[0][0]*1e2)/1e2; /* + Math.round(predictionArray1[0][0]*1e2)/1e2 ) / 2; */


      document.getElementById("NNprediction").innerHTML = 'Neural network prediction: '.bold() + predictionArray1;


      if (meanPrediction >= 0 && meanPrediction < 0.25)
      {
        var col = "green";
        document.getElementById("GeneticTesting").innerHTML = 'Send to genetic testing: No'.bold();

      }
      /*
      else if (predictionArray[0][0] >= 0.25 && predictionArray[0][0] < 0.75)
      {
        var col = "green";
        document.getElementById("GeneticTesting").innerHTML = 'Send to genetic testing: No'.bold();
      }
      */
      else if (meanPrediction >= 0.25 && meanPrediction <=1)
      {
        var col = "red";
        document.getElementById("GeneticTesting").innerHTML = 'Send to genetic testing: Yes'.bold();
      }

      console.log(col)
      // Chart 
      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: false,
        title: {
          text: " "
        },
        axisX: {
          valueFormatString:  " ",
          indexLabel: " ",
          minimum: 0,
          maximum: 1,
          interval: 1,
          gridThickness: 0,
          tickLength: 0,
          tickThickness: 0
          
        },
        axisY: {
          includeZero: true,
          title: "Likelihood of FH",
          titleFontSize: 18,
          titleFontFamily: "times new roman",
          labelFontSize: 16,
          labelFontFamily: "times new roman",
          maximum: 1,
          minimum: 0,
          interval: 0.1,
          lineThickness: 2
          
        }, 
        dataPointWidth: 40,
        data: [{
          color: col,
          type: "bar",
          showInLegend: false,
          yValueFormatString: " ",
          dataPoints: [
            {x: 0.5, y:  Math.round(meanPrediction * 1e2) / 1e2},
          ]
        }]
      });

      chart.render();





      // Classification tree
      const x = 1;
      const y = 1;
      const z = 1;

      let CTprediction = undefined;

      if (var2 < x) 
      {
        if (var3 > y) 
        {
          CTprediction = 0;
        }
        else if (var1 > z)
        {
          CTprediction = 0;
        }
        else 
        {
          CTprediction = 1;
        }
      } 

      else if (var3 > y) 
      {
        CTprediction = 0;
      }

      else
      {
        CTprediction = 1;
      }
      /*
      document.getElementById("CTprediction").innerHTML = 'Classification tree prediction: ' + CTprediction;
      */

      document.getElementById("CTprediction").innerHTML = 'Classification tree prediction: Not available';




    })();
  }

}

/*
function sendEmail() {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "predictfh@gmail.com",
	Password : "fhprediction",
	To : '<recipient’s email address>',
	From : "<sender’s email address>",
	Subject : "<email subject>",
	Body : "<email body>",
	}).then(
		message => alert("mail sent successfully")
  );
}
*/



  

  