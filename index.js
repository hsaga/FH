
// Define the mean and std for gothenburg training set for normalization
const meanVar1 = 1.51262097;
const meanVar2 = 0.15645247;
const meanVar3 = 0.24278265;

const stdVar1 = 0.48458161;
const stdVar2 = 0.07073377;
const stdVar3 = 0.19097731;

// Function that makes the predictions
function makePrediction(){
  const age = Number(document.forms["frm1"]["age"].value);
  const ldl = Number(document.forms["frm1"]["ldl"].value);
  const hdl = Number(document.forms["frm1"]["hdl"].value);
  const tg = Number(document.forms["frm1"]["tg"].value);
  const yourPrediction = Number(document.forms["frm1"]["yourPrediction"].value);

  console.log(yourPrediction);

  // Construct the variables and standardize
  const var1 = (hdl - meanVar1) / stdVar1;
  const var2 = (ldl/age  - meanVar2) / stdVar2;
  const var3 = (tg/ldl  - meanVar3) / stdVar3;

  // Models and predictions
  (async () => {

    // Neural network
    const model = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs_model/model.json');

    let prediction =  model.predict(tf.tensor2d([[var1, var2, var3]]));

    predictionArray = prediction.arraySync();

    document.getElementById("NNprediction").innerHTML = 'Neural network prediction: ' + predictionArray[0][0].toFixed(2);

    // Chart 
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Prediction"
      },
      axisX: {
        
      },
      axisY: {
        includeZero: false,
        title: "Likelihood of FH",
        interval: 0.1
      }, 
      data: [{
        type: "rangeBar",
        showInLegend: false,
        yValueFormatString: " ",
        indexLabel: " ",
        legendText: " ",
        toolTipContent: "{y[1]}",
        dataPoints: [
          {y:[0, predictionArray[0][0].toFixed(2)]},
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



  

  