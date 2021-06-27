var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// mongoose.connect('your db link', {useNewUrlParser: true, useUnifiedTopology: true});
const methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


app.set("view engine","ejs");
app.set("views","./views");

const customerSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    balance: Number,
});

let Customer = mongoose.model('Customer',customerSchema);


mongoose.set('useFindAndModify', false);

app.get('/',(req,res) =>{
    res.render('home');
});

app.put('/', async(req, res) =>{
    var yid = req.body.yid;
    var tid = req.body.tid;
    var tname = req.body,tname;
    
    var transfer = req.body.transfer;
    var cus1 = await Customer.findById(yid);
   
    var a = cus1.balance - transfer;
    //console.log(`balance is: ${a}`);
    
    Customer.findByIdAndUpdate(yid,{balance:a},function(err,docs){
        if(err){
            console.log(err);
        }
        else{
            console.log("hello");
        }
    });
    var cus2 = await Customer.findById(tid);

    

    
    /*var cus2 = Customer.findByIdyId({tid,function(err,result){
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            return result;
        }
    });*/
    
   
    //console.log(`the transfer customer is ${cus2}`);
    console.log("xxxxxxxxxxxxxxxx")
    console.log(cus2);
    console.log("xxxxxxxxxxxxxxxx")
    console.log(`the transfer customer balance is ${cus2.balance}`)

    
    var b = parseInt(cus2.balance) + parseInt(transfer);
    console.log(`balance is: ${b}`);
    Customer.findByIdAndUpdate(tid,{balance:b},function(err,docs){
        if(err){
            //console.log("err");
        }
        else{
            console.log("hello");
        }
    });
    //console.log(Customer.find({id:tid}));
    
    res.render("home");
});


app.get("/allcustomers",async(req,res) =>{
    const customers = await Customer.find({});
    
    res.render('allcustomers',{customers ,customers});
});


app.get("/allcustomers/new", (req,res) =>{
    res.render("new");
});


app.post("/allcustomers",(req,res)=>{
    const name = req.body.name;
    const image = req.body.image;
	const desc = req.body.desc;
	const balance = parseInt(req.body.balance);
    const newcustomer = new Customer({name :name, image :image, desc :desc ,balance :balance});
    newcustomer.save();

    res.redirect("/allcustomers");
});
app.get("/%60allcustomers/itempage/:id%60", async(req,res) =>{
    let id = req.params.id;
    const customerz = await Customer.findById(id)
    res.render("itempage",{customerz,customerz});

});







app.listen(3000,()=>{
    console.log("Listening on prot 3000")
});






//installed express
//installed body-parser
//installed ejs
//intall mongoose
//install method-override
