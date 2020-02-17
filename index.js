

function makePrediction(){
const age = Number(document.forms["frm1"]["age"].value);
const ldl = Number(document.forms["frm1"]["ldl"].value);
const hdl = Number(document.forms["frm1"]["hdl"].value);
const tg = Number(document.forms["frm1"]["tg"].value);

const var1 = hdl;
const var2 = ldl/age;
const var3 = tg/ldl;

/*
document.getElementById("Age").innerHTML = age;
document.getElementById("LDL").innerHTML = ldl;
document.getElementById("HDL").innerHTML = hdl;
document.getElementById("TG").innerHTML = tg;
*/

(async () => {
  const model = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs_model/model.json');

  let prediction =  model.predict(tf.tensor2d([[var1, var2, var3]]));

  predictionArray = prediction.arraySync();


  document.getElementById("NNprediction").innerHTML = predictionArray[0][0];


  // CT

  const x = 1;
  const y = 1;
  const z = 1;

  let CTprediction = 0;

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

  document.getElementById("CTprediction").innerHTML = CTprediction;



})();

}



  

  