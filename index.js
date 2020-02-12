

function makePrediction(){
const age = Number(document.forms["frm1"]["age"].value);
const ldl = Number(document.forms["frm1"]["ldl"].value);
const hdl = Number(document.forms["frm1"]["hdl"].value);
const tg = Number(document.forms["frm1"]["tg"].value);

const var1 = hdl;
const var2 = ldl/age;
const var3 = tg/ldl;

document.getElementById("Age").innerHTML = age;
document.getElementById("LDL").innerHTML = ldl;

(async () => {
  const model = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs_model/model.json');

  let prediction =  model.predict(tf.tensor2d([[var1, var2, var3]]));

  
  document.getElementById("NNprediction").innerHTML = prediction;

})();

}



  

  