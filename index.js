

function makePrediction(){
const age = Number(document.forms["frm1"]["age"].value);
const ldl = Number(document.forms["frm1"]["ldl"].value);
const hdl = Number(document.forms["frm1"]["hdl"].value);
const tg = Number(document.forms["frm1"]["tg"].value);

document.getElementById("variables").innerHTML = age;

(async () => {
  const model = await tf.loadLayersModel('https://hsaga.github.io/FH/tfjs_model/model.json');

  console.log(typeof age);
  console.log(model);

  let prediction =  model.predict(tf.tensor2d([[age, ldl, hdl]]));
  prediction.print();

})();

}



  

  