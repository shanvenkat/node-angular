var express = require('express');
var router = express.Router();

// custom function..
function toLower (v) {
	return v.toLowerCase();
}

function formatDate(d) {
	var dd = d.getDate()
  if ( dd < 10 ) dd = '0' + dd
  		var mm = d.getMonth()+1
  if ( mm < 10 ) mm = '0' + mm
		  var yyyy = d.getFullYear() % 100
  if ( yyyy < 10 ) yyyy = '0' + yyyy
	  return mm+'-'+dd+'-'+yyyy
}
// moongoose DB Connection
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

var schema = new Schema ({
	FirstName: String, 
	LastName:String,
	Gender:String,
	Age: { type: Number, min: 18, max: 65 },
	DOB: { type: Date, required: 'DOB is required!' },
	EmploymentType: String,
	email: {type: String, set: toLower}	
})


var jobschema = new Schema ({
	RequiredSkills: String,
	JobLocation:String,
	AreaCode:{ type: Number },
	TravelRequired: String,
	Telecommute: String,
	PayRate: { type: Number },
	TaxTerm: String,
	Length: { type: Number },
	PostedDate: { type: Date, required: 'Posted Date is required!' },
	PositionID:{ type: Number },
	AboutCompany: String,
	PositionSummary: String,
	MinimumQualifications: String,
	ContactAddress: String	
})

var taxtermschema = new Schema ({
	taxterm: String,		
})

var travelReqdSchema = new Schema ({
	TravelRequired: String,		
})

var users = mongoose.model('users', schema);
var jobmodel = mongoose.model('jobmodel', jobschema);
var taxtermmodel = mongoose.model('taxtermmodel', taxtermschema);
var travelRequiredModel = mongoose.model('travelRequiredModel', travelReqdSchema);

//Add Tax Term
/*router.post('/addtaxterm/:inptaxterm', function(req, res) {
	var strtaxterm = req.params.inptaxterm;	
	console.log('strtaxterm ' + strtaxterm);

	taxtermmodel.create({taxterm:strtaxterm}, function(err){
		if (err) // ...  			
  			console.log(strtaxterm  + ' failed');
		else
		{
			console.log(strtaxterm + ' success');	
			taxtermmodel.find(function (err, taxtermlist) {
			   	if (err) return console.error(err);	  	 
			   	res.json(taxtermlist);	   		
			});
		}
	});

});
*/

/*travelRequiredModel.remove(function(err){
		if (err) // ...  			
  			console.log('failed');
		else
			{console.log('success');}
});

var strTravelRequired = ['Yes', 'No'];	
for (j=0;j<strTravelRequired.length;j++){
	travelRequiredModel.create({TravelRequired:strTravelRequired[j]}, function(err){
			if (err) // ...  			
	  			console.log(' failed');
			else
				{console.log(' success');}
	});
}
*/

//Adduser for employee schema
router.post('/adduser/:firstname/:lastname/:gender/:age/:DOB/:emptype/:email', function(req, res) {
	var strfirstname = req.params.firstname;
	var strlastname = req.params.lastname;
	var strgender = req.params.gender;
	var strage = parseInt(req.params.age);		
	var strDOB = formatDate(new Date(req.params.DOB));	
	var stremptype = req.params.emptype;		 
	var stremail = req.params.email;	
	//console.log('strDOB #' +  strDOB);
	users.create({FirstName:strfirstname,LastName:strlastname,Gender:strgender,Age:strage,DOB:strDOB,EmploymentType:stremptype, email:stremail}, function(err){
		if (err) // ...  			
  			console.log(strfirstname + " " + strgender  + " " + strage + " " + strDOB + ' failed');
		else
		{
			console.log(strfirstname + " " + strgender  + " " + strage + " " + strDOB + ' successfully added');	
			users.find(function (err, userlist) {
			   	if (err) return console.error(err);	  	 
			   	res.json(userlist);	   		
			});
		}
	});	
});

// Add Job Posting
router.post('/addjobposting/:requiredskills/:jobLocation/:areacode/:travelrequired/:telecommute/:payrate/:taxterm/:inplength/:posteddate/:positionid/:aboutcompany/:positionsummary/:minimumquali/:contactaddress', function(req, res) {
	
	var strrequiredskills = req.params.requiredskills;
	var strjobLocation = req.params.jobLocation;
	var intareacode = parseInt(req.params.areacode);
	var strtravelrequired = req.params.travelrequired;
	var strtelecommute = req.params.telecommute;
	var intpayrate = parseInt(req.params.payrate);
	var strtaxterm = req.params.taxterm;
	var intinplength = parseInt(req.params.inplength);
	var dtposteddate = formatDate(new Date(req.params.posteddate));	
	var intpositionid = parseInt(req.params.positionid);
	var straboutcompany = req.params.aboutcompany;
	var strpositionsummary = req.params.positionsummary;
	var strminimumquali = req.params.minimumquali;
	var strcontactaddress = req.params.contactaddress;	

	jobmodel.create({RequiredSkills:strrequiredskills,JobLocation:strjobLocation,AreaCode:intareacode,TravelRequired:strtravelrequired,
		Telecommute:strtelecommute,PayRate:intpayrate, TaxTerm:strtaxterm,Length:intinplength,PostedDate:dtposteddate,PositionID:intpositionid,
		AboutCompany:straboutcompany, PositionSummary:strpositionsummary,MinimumQualifications:strminimumquali,ContactAddress:strcontactaddress}, function(err){
		if (err) // ...  			
  			console.log(strrequiredskills + " " + strjobLocation  + " " + intareacode + " " + strtravelrequired + ' failed');
		else
		{
			console.log(strrequiredskills + " " + strjobLocation  + " " + intareacode + " " + strtravelrequired + ' success');	
			jobmodel.find(function (err, jobpostinglists) {
			   	if (err) return console.error(err);	  	 
			   	res.json(jobpostinglists);	   		
			});
		}
	});	
});


// Read from User List Model
router.get('/userlist', function(req, res) {
	users.find(function (err, userlist) {
	   if (err) return console.error(err);	  	 
	   		res.json(userlist);	 
	});
});

// Read from Job Posting Model
router.get('/jobpostinglists', function(req, res) {
	jobmodel.find(function (err, jobpostinglists) {
	   if (err) return console.error(err);	  	 
	   		res.json(jobpostinglists);	 
	});
});

//Read from Tax Term Model
router.get('/taxtermlists', function(req, res) {
	taxtermmodel.find(function (err, taxtermlists) {
	   if (err) return console.error(err);	  	 
	   		res.json(taxtermlists);	 
	});
});


// Read from Travel Required Model
router.get('/travelrequiredlists', function(req, res) {
	travelRequiredModel.find(function (err, travelrequiredlists) {
	   if (err) return console.error(err);	  	 
	   		res.json(travelrequiredlists);	 
	});
});


/* Read operation from MongoDB. */
router.get('/userlist/:startrecordnum/:endrecordnum', function(req, res) {
	var strstart = parseInt(req.params.startrecordnum);
	var strend = parseInt(req.params.endrecordnum);
    var arrdisplay = [];
	var obj = {};
	var m =0;
	users.find(function (err, userlist) {		
	   if (err) return console.error(err);	  	
	   	else{				   		
	   		for (i=strstart; i<strend; i++)
	   		{
	   			//obj[i] = userlist[i];	   			
	   			if (userlist[i] != null){	
	   				arrdisplay[m] = userlist[i];	   				
	   				m = m+1;
	   			}
	   		}
	   		res.json(arrdisplay);	   			   			
	   	}	   		
	});
});

/* Read operation from MongoDB. */
router.get('/jobpostingbrowse/:startrecordnum/:endrecordnum', function(req, res) {
	var strstart = parseInt(req.params.startrecordnum);
	var strend = parseInt(req.params.endrecordnum);
    var arrdisplay = [];
	var obj = {};
	var m =0;
	jobmodel.find(function (err, joblist) {		
	   if (err) return console.error(err);	  	
	   	else{				   		
	   		for (i=strstart; i<strend; i++)
	   		{	   			   			
	   			if (joblist[i] != null){	
	   				arrdisplay[m] = joblist[i];	   				
	   				m = m+1;
	   			}
	   		}
	   		res.json(arrdisplay);	   			   			
	   	}	   		
	});
});


router.get('/search/:id', function(req, res) {
	var strid = req.params.id;
	users.find({_id: strid}, function (err, userlist) {
	   if (err) return console.error(err);	  	 
	  		res.send(userlist);
	});
});

router.get('/jobIdSearch/:jobid', function(req, res) {
	var strid = req.params.jobid;
	jobmodel.find({_id: strid}, function (err, jobpostinglist) {
	   if (err) return console.error(err);	  	 
	  	res.send(jobpostinglist);
	});
});


// Update Operation using Express Router
router.put('/update/:id/:firstname/:lastname/:gender/:age/:dob/:emptype/:email', function(req, res) {
	var strid = req.params.id;
	var strfirstname = req.params.firstname;
	var strlastname = req.params.lastname;
	var strgender = req.params.gender;
	var strage = parseInt(req.params.age);
	var strdob = req.params.dob;
	var stremptype = req.params.emptype;
	var stremail = req.params.email;
	
	users.findOneAndUpdate({_id:strid}, {FirstName:strfirstname, LastName:strlastname, Gender:strgender,Age:strage,DOB:strdob,EmploymentType:stremptype,email:stremail}, function(err){
	if (err) // ...
  			{console.log(strid + " " + strfirstname + " " + strlastname + " " +strgender+ " " + strage + " " + strdob + " " + stremptype + " " + stremail + ' Update failed');}
	else
		{
			{console.log(strid + " " + strfirstname + " " + strlastname + " " +strgender+ " " + strage + " " + strdob + " " + stremptype + " " + stremail + ' Successfully Updated via mongoose' );}				
		}
	});	 
});

// Job ID Update
router.put('/JobIDUpdate/:jobid/:requiredskills/:joblocation/:areacode/:travelrequired/:telecommute/:payrate/:taxterm/:uilength/:posteddate/:positionid/:aboutcompany/:positionsummary/:minimumqualifications/:contactaddress', function(req, res) {
	var strjobid = req.params.jobid;	
	var strrequiredskills = req.params.requiredskills;
	var strjobLocation = req.params.joblocation;
	var intareacode = parseInt(req.params.areacode);
	var strtravelrequired = req.params.travelrequired;
	var strtelecommute = req.params.telecommute;
	var intpayrate = parseInt(req.params.payrate);
	var strtaxterm = req.params.taxterm;
	var intinplength = parseInt(req.params.uilength);
	var dtposteddate = formatDate(new Date(req.params.posteddate));	
	var intpositionid = parseInt(req.params.positionid);
	var straboutcompany = req.params.aboutcompany;
	var strpositionsummary = req.params.positionsummary;
	var strminimumquali = req.params.minimumqualifications;
	var strcontactaddress = req.params.contactaddress;


	jobmodel.findOneAndUpdate({_id:strjobid}, {RequiredSkills:strrequiredskills, JobLocation:strjobLocation, AreaCode:intareacode,
		TravelRequired:strtravelrequired, Telecommute:strtelecommute,PayRate:intpayrate,TaxTerm:strtaxterm,Length:intinplength,
		PostedDate:dtposteddate,PositionID:intpositionid,AboutCompany:straboutcompany,PositionSummary:strpositionsummary,
		MinimumQualifications:strminimumquali,ContactAddress:strcontactaddress}, function(err){
	if (err) // ...
  			{console.log(strjobid + " " + strrequiredskills + " " + strjobLocation + " " +intareacode+ " " + ' Failed');}
	else
		{
			{console.log(strjobid + " " + strrequiredskills + " " + strjobLocation + " " +intareacode+ " " + ' Success' );}				
		}
	});	
	 
});


// Delete Operation using Express Router
router.delete('/delete/:id/', function(req, res) {
	var strid = req.params.id;	
	users.remove({_id:strid}, function(err){
	if (err) // ...
  		{console.log(strid + ' failed');}
	else
		{
			{console.log(strid + ' success');}	
			users.find(function (err, userlist) {
			   	if (err) return console.error(err);	  	 
			   	res.json(userlist);	   		
			});
		}
	});	 
});

// Job ID Delete
router.delete('/jobiddelete/:id/', function(req, res) {
	var strid = req.params.id;	
	jobmodel.remove({_id:strid}, function(err){
	if (err) // ...
  		{console.log(strid + ' failed');}
	else
		{
			{console.log(strid + ' success');}	
			jobmodel.find(function (err, jobpostinglists) {
			   	if (err) return console.error(err);	  	 
			   	res.json(jobpostinglists);	   		
			});
		}
	});	 
});


// count Operation using Express Router
/* Read operation from MongoDB. */
router.get('/count', function(req, res) {
	users.count(function (err, count) {
	   if (err) return console.error(err);	  	 
	   else{
	   		//console.log('The number of documents are %d', count);
	   		res.json(count);	  		
	  	}
	});
});

// count Operation using Express Router
/* Read operation from MongoDB. */
router.get('/jobpostingcount', function(req, res) {
	jobmodel.count(function (err, count) {
	   if (err) return console.error(err);	  	 
	   else{
	   		//console.log('The number of documents are %d', count);
	   		res.json(count);	  		
	  	}
	});
});


module.exports = router;