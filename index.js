

function makePrediction(){
var age = document.forms["frm1"]["age"].value;
var ldl = document.forms["frm1"]["ldl"].value;
var hdl = document.forms["frm1"]["hdl"].value;
var tg = document.forms["frm1"]["tg"].value;

const age = Number(age);
const ldl = Number(ldl);
const hdl = Number(hdl);
const tg = Number(tg);

document.getElementById("variables").innerHTML = age;

(async () => {
  const model = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs_model/model.json');

  console.log(typeof age);
  console.log(model);

  let prediction =  model.predict(tf.tensor2d([[age, ldl, hdl]]));
  prediction.print();

})();

}



  

  