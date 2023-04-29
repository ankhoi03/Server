var express = require('express');
var router = express.Router();

//Lab2
//http://localhost:3000/lab2/dien-tich/vuong?a=5
router.get('/dien-tich/:loai',async function(req, res, next) {
  const loai = req.params.loai;
  let dientich;
  const a=parseFloat(req.query.a);
 if(loai==='vuong'){
  dientich=a*a;
 }else if(loai==='tron'){
  dientich=a*a*3.14;
 }else{
  res.status(400).send(`Hình không được hỗ trợ: ${loai}`);
 }

  
  res.render('index', { title: 'Lab 2',loai:` ${loai}`,canh:`${a}` ,ketqua:dientich});
});


router.post('/chu-vi',async function(req, res, next) {
  const loai = req.body.loai;
  let chuvi;
  const a=parseFloat(req.body.a);
 if(loai==='vuong'){
  
  chuvi=a*4;
 }else if(loai==='tron'){
  chuvi=2*a*3.14;
 }else{
  res.status(400).send(`Hình không được hỗ trợ: ${loai}`);
 }
 const data = {
  hinh: `${loai}`,
  canh: `${a}`,
  chuvi: `${chuvi}`,
  
};

  
  res.json(data)
});

module.exports = router;
