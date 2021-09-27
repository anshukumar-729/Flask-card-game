var next=""
let obj1=[]
let res1=["","","",""]
let res2=[0,0,0,0]
console.log(res2)
let out=""
var rnd=0
var y1=0
var y2=0
var y3=0
var y4=0
var gc=[]
let ind=0
function call(targetURL) {
	//Marshelling into JSON
	
	var dataToBeSent = "{";
	if(typeof(document.forms[0]) == 'undefined' || document.forms[0] == null){
		alert("HTML form element is not defined.");
		return;
	}
	var x = document.forms[0].elements;
	for (var i = 0; i < x.length; i++) {			
		if((x[i].getAttribute("type") != null) && 
			(x[i].getAttribute("type").toLowerCase() == 'submit' || x[i].getAttribute("type").toLowerCase() == 'button')) continue;
		
		if(i > 0) dataToBeSent += ",";
		dataToBeSent += "\""+ x[i].getAttribute("name") +"\":\""+ x[i].value +"\"";
		cp=parseInt(x[i].value);
		console.log(cp)
	}
	dataToBeSent += "}";
	dataToBeSent = JSON.stringify(dataToBeSent);
	//Sending HTTP request to server
	sendRequest2(targetURL, dataToBeSent);
	return false;
}
function start(targetURL,ch) {
	//Marshelling into JSON
	if(ch=="g"){
		console.log("go to go")
		window.location.href = "./go";
		localStorage.clear();
		localStorage.setItem("res10","")
		localStorage.setItem("res11","")
		localStorage.setItem("res12","")
		localStorage.setItem("res13","")
		localStorage.setItem("res20",0)
		localStorage.setItem("res21",0)
		localStorage.setItem("res22",0)
		localStorage.setItem("res23",0)
	}
	
	var dataToBeSent = "{";
	dataToBeSent += "\""+ "mycall"+"\":\""+ch+"\"";
	dataToBeSent += "}";
	dataToBeSent = JSON.stringify(dataToBeSent);
	document.getElementById("str").style.display="none";
	document.getElementById("stt").style.display="none";

	document.getElementById("row").style.display="block";
	//Sending HTTP request to server
	sendRequest2(targetURL, dataToBeSent);
	return false;
}
function sendRequest2(targetURL, jsonData){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showOutput2(this.responseText);
		} else if (this.readyState == 4){
			alert("Error occurred with status code: "+this.status);
		}
	};
	xhttp.open("POST", targetURL, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(jsonData);
}


function showOutput2(output){
	console.log(output)
	let temp=""
	let k=0
	console.log(output)
	ind=parseInt(output[output.length-7])
	
	indt=ind+1
	out=""
	out+="<h4>You are player no "+indt+"</h4><br>"
	let ib=0;
	gc.c1=parseInt(output[output.length-(6)]+output[output.length-(5)])
	gc.c2=parseInt(output[output.length-(4)]+output[output.length-(3)])
	gc.c3=parseInt(output[output.length-(2)]+output[output.length-(1)])
	console.log(gc)
	for (let i=0;i<4;i++){
		if(i==ind){
			continue
		}
		let it=i+1
		out+="<h5>The call of player "+it+" is "+(output[output.length-(6-(ib*2))]+output[output.length-(5-(ib*2))])
		ib+=1
	}
	if(output=="start"){
		
	window.location.href = "./home";
	}
	for (let i=0;i<output.length;i++){
		
		if (output[i]=="e"){
			break
		}
		temp+=output[i]
		k+=1
		if(k==3){
			k=0
			temp=parseInt(temp)
			document.getElementById(temp).style.display="inline"
			temp=""	
		}
	}
	
	var division = document.getElementById("output_div");
	if(division === null || division == 'undefined'){			
		division = document.createElement("div");	
		division.setAttribute("id", "output_div");	
		division.setAttribute("style", "text-align:center");
		division.style.color = "blue";	
		var element = document.getElementsByTagName("body");
		element[0].appendChild(division);
	}	
	division.innerHTML = out
}

function cards(targetURL,no) {
	//Marshelling into JSON
	if(no=="r"){
		document.getElementById("replay").style.display="none";
		window.location.href = "./";
	}
	var dataToBeSent = "{";
	var name="value";
	var v=no;
	console.log(no)
	console.log(obj1)
	if(v=="yes"){
		console.log("yes")
		dataToBeSent += "\""+ name+"\":\""+ v+"\"";
	
	}
	else if(v=="no"){
		console.log("no")
		dataToBeSent += "\""+ name+"\":\""+ v+"\"";
	
	}
	else{
	if(next=="true"){
		// if(v==1){
		// 	return true}
		
			
		if(obj1.includes(no)){
			
			document.getElementById(no).style.opacity="0.7";
			document.getElementById(no).style.boxShadow="none";
			document.getElementById(no).style.cursor="auto";
			document.getElementById(no).style.height="130px";
			document.getElementById(no).style.width="65px";
			document.getElementById(no).style.transform="none";
		}
		else{
			return true
		}
	document.getElementById("turn").style.visibility="hidden";
	next="false"
	dataToBeSent += "\""+ name+"\":\""+ v+"\"";
	
	
}
	
	else if(v==0){
		dataToBeSent+= "\""+ name+"\":\""+ 0+"\"";
		
		document.getElementById(0).style.display="none";
		document.getElementById(1).style.display="block";
	}
	else if(v==1){
		console.log("rnd")
		console.log(rnd)
		if(rnd==53){
			dataToBeSent+= "\""+ name+"\":\""+ "over"+"\"";
		}
		else{
		dataToBeSent+= "\""+ name+"\":\""+ 1+"\"";}
	}
	else{
		return true
	}
}
	dataToBeSent += "}";
	dataToBeSent = JSON.stringify(dataToBeSent);
	//Sending HTTP request to server
	sendRequest(targetURL, dataToBeSent);
	return false;
}


function sendRequest(targetURL, jsonData){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			showOutput(this.responseText);
		} else if (this.readyState == 4){
			alert("Error occurred with status code: "+this.status);
		}
	};
	xhttp.open("POST", targetURL, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(jsonData);
}

function showOutput(output){
	rnd+=1
	console.log(rnd)
	console.log(output)
	if(output=="yes"){
		rnd=0
		out=""
		next=""
		window.location.href = "./go";
	}
	else if(output=="no"){
		document.getElementById("continue").style.display="none";
		document.getElementById("replay").style.display="block";
		out="Total Scores are:"
		for(let i=0;i<3;i++){
			
			out+="<h5>bot"+(i+1)+" = "+localStorage.getItem("res1"+i)+" = "+localStorage.getItem("res2"+i)+"</h5><br>"
			
			res2[i]=localStorage.getItem("res2"+i)

		}
		out+="<h5>Your = "+localStorage.getItem("res1"+3)+" = "+localStorage.getItem("res2"+3)+"</h5><br>"
		res2[3]=localStorage.getItem("res2"+3)
		m1=Math.max(res2[0],res2[1],res2[2],res2[3])
		if(res2[0]==(m1)){
			out+="<h4>Bot1 win the Series!!!</h4>"
		}
		else if(res2[1]==(m1)){
			out+="<h4>Bot2 win the Series!!!</h4>"
		}
		else if(res2[2]==m1){
			out+="<h4>Bot3 win the Series!!!</h4>"
		}
		else if(res2[3]==(m1)){
			out+="<h4>You win the Series!!!</h4>"
		}
		localStorage.clear();
		var division = document.getElementById("output_div");
	if(division === null || division == 'undefined'){			
		division = document.createElement("div");	
		division.setAttribute("id", "output_div");	
		division.setAttribute("style", "text-align:center");
		division.style.color = "blue";	
		var element = document.getElementsByTagName("body");
		element[0].appendChild(division);
	}	

	division.innerHTML = out

	}
	
	else {
	const c1=parseInt(output[output.length-6]+output[output.length-5])
	const c2=parseInt(output[output.length-4]+output[output.length-3])
	const c3=parseInt(output[output.length-2]+output[output.length-1])
	const cp=parseInt(output[output.length-8]+output[output.length-7])
	const ind=parseInt(output[output.length-9])
	const p=parseInt(output[output.length-10])
	const i=parseInt(output[output.length-15])
	const j=parseInt(output[output.length-14])
	const card=parseInt(output[output.length-13]+output[output.length-12]+output[output.length-11])
	
	const win=parseInt(output[output.length-20])
	const ma=parseInt(output[output.length-19]+output[output.length-18]+output[output.length-17])


		
	console.log(res1)
	console.log(res2)

	
	if(parseInt(rnd)>53){
		document.getElementById("continue").style.display="block";
		document.getElementById("cards").style.opacity="0.3";
		document.getElementById("turn").style.visibility="hidden";
		out="<h2>Scores are:</h2><br>"
		var w0=[0,0,0,0]
		let c0=[c1,c2,c3,cp]
		console.log(c0)
		let y0=[y1,y2,y3,y4]
		let j=-1
		
		console.log(res1)
		for (let i=0;i<3;i++){
			j+=1
			if(j==ind){
				i-=1
				continue
			}
			if(c0[i]>y0[j]){
				out+="<h5>bot"+(i+1)+" = - 10*"+c0[i]+"(wins = "+y0[j]+", calls = "+c0[i]+")</h5><br>"
				res1[i]+=" - 10*"+c0[i]
				w0[i]=-10*c0[i]
				res2[i]+=-10*c0[i]
			}
			else{
				out+="<h5>bot"+(i+1)+" = 10*"+c0[i]+"+("+y0[j]+"-"+c0[i]+") (wins = "+y0[j]+", calls = "+c0[i]+")</h5><br>"
				res1[i]+="+10*"+c0[i]+"+("+y0[j]+"-"+c0[i]+")"
				w0[i]=10*c0[i]+(y0[j]-c0[i])
				res2[i]+=10*c0[i]+(y0[j]-c0[i])
			}
			
			
		}
		if(c0[3]>y0[ind]){
			out+="<h5>Your = - 10*"+c0[3]+"(wins = "+y0[ind]+", calls = "+c0[3]+")</h5><br>"
			res1[3]+=" - 10*"+c0[3]
			w0[3]=-10*c0[3]
			res2[3]+=-10*c0[3]
		}
		else{
			out+="<h5>Your = 10*"+c0[3]+"+("+y0[ind]+"-"+c0[3]+") (wins = "+y0[ind]+", calls = "+c0[3]+")</h5><br>"
			res1[3]+="+10*"+c0[3]+"+("+y0[ind]+"-"+c0[3]+")"
			w0[3]=10*c0[3]+(y0[ind]-c0[3])
			res2[3]+=10*c0[3]+(y0[ind]-c0[3])
		}
		
		for (let i=0; i<4;i++){
		localStorage.setItem("res1"+i, localStorage.getItem("res1"+i)+res1[i]);
		localStorage.setItem("res2"+i, (parseInt(localStorage.getItem("res2"+i))+parseInt(res2[i])));
		}
		console.log("local")
		console.log(localStorage)
		console.log(gc)
		console.log(res1)
		console.log(res2)
		console.log(w0)
		console.log(Math.max(w0[0],w0[1],w0[2],w0[3]))
		if(w0[0]==Math.max(Math.max(w0[0],w0[1],w0[2],w0[3]))){
			out+="<h4>Bot1 is the winner!!!</h4>"
		}
		else if(w0[1]==(Math.max(w0[0],w0[1],w0[2],w0[3]))){
			out+="<h4>Bot2 is the winner!!!</h4>"
		}
		else if(w0[2]==Math.max(w0[0],w0[1],w0[2],w0[3])){
			out+="<h4>Bot3 is the winner!!!</h4>"
		}
		else if(w0[3]==(Math.max(w0[0],w0[1],w0[2],w0[3]))){
			out+="<h4>You are the winner!!!</h4>"
		}
		console.log(out)
			
	}
	else{
		
		console.log(win)
	console.log(ma)
	switch(parseInt(card/100)){
		case 1: suit="Spades"
				break
		case 2: suit="Clubs"
				break
		case 3: suit="Diamond"
				break
		case 4: suit="Hearts"
				break
		default: suit="undefined"
	}
	switch(card%100){
		case 01: Cno="1"
				break
		case 02: Cno="2"
				break
		case 03: Cno="3"
				break
		case 04: Cno="4"
				break
		case 05: Cno="5"
				break
		case 06: Cno="6"
				break
		case 07: Cno="7"
				break
		case 08: Cno="8"
				break
		case 09: Cno="9"
				break
		case 10: Cno="10"
				break
		case 11: Cno="Joker"
				break
		case 12: Cno="Queen"
				break
		case 13: Cno="King"
				break
		case 14: Cno="Ace"
				break
		default: Cno="undefined"
	}
	if(p!="0"){
	out+="<h5>"+Cno+" of "+suit+" chosen by player "+p+"</h5>"}
	if(i+1==j && rnd!=53){
		document.getElementById("turn").style.visibility="visible";
		next="true"
		document.getElementById(1).style.visibility="hidden";
	}
	else{
		document.getElementById(1).style.visibility="visible";
	}
	if(win!=0 && ma%100!=00){
		switch(parseInt(win)){
			case 1:y1+=1
				break
			case 2:y2+=1
				break
			case 3:y3+=1
				break
			case 4:y4+=1
				break
		}
		switch(parseInt(ma/100)){
			case 1: suit="Spades"
					break
			case 2: suit="Clubs"
					break
			case 3: suit="Diamond"
					break
			case 4: suit="Hearts"
					break
			default: suit="undefined"
		}
		switch(ma%100){
			case 01: Cno="1"
					break
			case 02: Cno="2"
					break
			case 03: Cno="3"
					break
			case 04: Cno="4"
					break
			case 05: Cno="5"
					break
			case 06: Cno="6"
					break
			case 07: Cno="7"
					break
			case 08: Cno="8"
					break
			case 09: Cno="9"
					break
			case 10: Cno="10"
					break
			case 11: Cno="Joker"
					break
			case 12: Cno="Queen"
					break
			case 13: Cno="King"
					break
			case 14: Cno="Ace"
					break
			default: Cno="undefined"
		}
		out+="<br><h4>This round wins by player "+win+"<br> And the highest value cards is "+Cno+" of "+suit+"</h4>"

	}
	let k=0
	let temp=""
	let temp2=0
	let temp3=0
	let temp4=0
	obj1=[]
	for (let i=0;i<output.length;i++){
		
		if (output[i]=="e"){
			break
		}
		temp+=output[i]
		k+=1
		if(k==3){
			k=0
			temp=parseInt(temp)
			obj1.push(temp);
			document.getElementById(temp).style.display="inline"
			temp=""	
		
		
		
		}
		
		
	}
	console.log(cp)
	console.log(ind)
	}
	console.log("p"+p)
	if(p!=0 || rnd==54){
		var division = document.getElementById("output_div");
	if(division === null || division == 'undefined'){			
		division = document.createElement("div");	
		division.setAttribute("id", "output_div");	
		division.setAttribute("style", "text-align:center");
		division.style.color = "blue";	
		var element = document.getElementsByTagName("body");
		element[0].appendChild(division);
	}	

	division.innerHTML = out
	if(win!=0 && ma%100!=00){
		out=""
	}}
}
	
	
	
	
	// if(output["pn"]==output["ind"])	{
	// 	console.log("hi "+output["pn"])
	// }
	
}
