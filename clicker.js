function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var sleeptime=3500;

async function mainfunc(sleeptime)	{
	// 把inputid的值修改为你想选的课号，会自动处理。
	var inputid1= "1296";
	var inputid2 = "1369";
	var a = Math.ceil(Math.random()*10); 

	var inputid;
	if (a % 2 == 1) {
		inputid = inputid1;
	}else {
		inputid = inputid2;
	}

	// var sleeptime = a * 1000;

	$("input[name='electableLesson.no']").val(inputid);
	$("#electableLessonList_filter_submit").click();
	var targetid=$("tr[class='electGridTr electGridTr-even']").attr('id');
	var shortid=targetid.substr(6,6);
	var expLesson="#expLessonGroups_"+targetid.substr(6,6);
	var groupid;
	if($(expLesson).attr('value'))	{
		groupid=$(expLesson).attr('value');
	}
	else 	{
		groupid="undefined";
	}
	/* 
	* 如果你不想选默认的第一个组，那么把groupid替换成想选的组对应四位编号。
	* 四位编号是html中想选的组名的上一个input标签的value值。
	* 填写不正确的组号会带来不可预知的后果！！！
	groupid=2470;
	*/
	var getdata;
	var request=$.ajax({
	  type: "POST",
	  //如果是不同的选课系统把url的profileId改成对应的即可
	  url: "http://eamis.nankai.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=531",
	  data: "optype=true&operator0="+shortid+"%3Atrue%3A0&lesson0="+shortid+"&expLessonGroup_"+shortid+"="+groupid,
	  async:false,
	  dataType: "json",
	  complete: function(data)	{
	  	getdata=eval(data).responseText;
	  },
	});
	await sleep(sleeptime);
	if(getdata.indexOf("成功")>=0) 	{
		alert("success!");
		return;
	}
	console.log("Failed...Try again... " + inputid);
	mainfunc(a * 1000);
}

mainfunc(sleeptime);
