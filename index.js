var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bank1', {useNewUrlParser: true, useUnifiedTopology: true});
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

/*Customer.insertMany(
    [
        {id: 1,  name:"Adam" , image :"https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" , desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000},
        {id: 2,  name:"Eve" , image :"https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" , desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000},
        {id: 3,  name:"Dave" , image :"https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",  desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000},
        {id: 4,  name:"barbatov" , image :"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",  desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000}
        
    ]
)*/



/*const customers = [
    {id: 1,  name:"Adam" , image :"https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" , desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000},
    {id: 2,  name:"Eve" , image :"https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" , desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000},
	{id: 3,  name:"Dave" , image :"https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",  desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000},
    {id: 4,  name:"barbatov" , image :"https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",  desc :"Docor at a pretigeous Hospital in NewYork,Newyork.Earns around 2000000 per annum. No debts. Owns around 10 acres center of NY city" , balance : 200000}
	
]*/

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