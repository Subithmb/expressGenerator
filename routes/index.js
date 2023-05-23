var express = require('express');
const nocache = require('nocache');
var router = express.Router();

function middleware(req, res, next) {
  if (req.session.user) {
   
    next();
  } else {;
    res.redirect("/");
  }
}

const user = { 
  login: "subith",
  pass: "1234",
};

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    console.log('sdfsd');
    res.render('home')
  }else{

    res.render('index');
  }
});
// LOGIN SUBMIT

router.post('/loginSubmit',nocache(), function(req, res, next) {
  let {login,pass}=req.body
  if(user.login==login && user.pass==pass){
    req.session.user=true
    res.render('home');
  }else{
    res.render('index',{message:"invalid Username or Password"})
  }
});
// HOME REDIRECTING

router.get('/home',middleware,nocache(), function(req, res, next) {
  res.render('home');
});
//  list page
router.get('/listpage',middleware, function(req, res, next) {
  const lists = [
    {
      data: "subith",
    },
    {
      data: "amal",
    },
    {
      data: "jithin",
    },
  ];
  res.render('list',{lists});
});
//  card page
router.get('/cardpage',middleware, function(req, res, next) {
  const cardData=[
    {
    head:'TOM & JERRY',
    img:'http://www.goodmorningimageshddownload.com/wp-content/uploads/2020/04/Cartoon-Images-19.jpg',
    text:'Tom & Jerry: Directed by Tim Story. With Chloë Grace Moretz, Michael Peña, Tom, Jerry. A chaotic battle ensues between Jerry Mouse,'
  },
    {
      img:'http://1.bp.blogspot.com/-ZhjVLFwu8Ak/VNongaSImuI/AAAAAAAAxiw/vpRzGZfcQKE/s1600/0_87359_85604ac5_orig.png',
      text:'Tom & Jerry: Directed by Tim Story. With Chloë Grace Moretz, Michael Peña, Tom, Jerry. A chaotic battle ensues between Jerry Mouse,',
      head:'TOM & JERRY'
  }

  ]
  res.render('card',{cardData});
});
//  table page
router.get('/tablepage',middleware, function(req, res, next) {
  const table = [
    {
      no: "1",
      name: "subith",
      num: "9444444444",
    },
    {
      no: "2",
      name: "amal",
      num: "9444444444",
    },
    {
      no: "3",
      name: "basil",
      num: "9444444444",
    },
    {
      no: "4",
      name: "jithin",
      num: "9444444444",
    },
    {
      no: "5",
      name: "eldho",
      num: "9444444444",
    },
  ];
  res.render("table", { table });
});
//  log out
router.get('/logout', function(req, res, next) {
  req.session.user=null
  res.render('index');
});

module.exports = router;
