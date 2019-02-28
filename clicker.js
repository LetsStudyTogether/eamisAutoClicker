function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var sleeptime=3500;
//把下面的数组元素修改为你想选的课程编号
var inputid=new Array("0161","0175");

async function mainfunc(sleeptime,inputid)	{
	while(1)	{
		//如果不需要随机间隔把true改为false
		if(true)
			sleeptime=Math.ceil(Math.random()*5000)+1000;
		var id=inputid[Math.floor(Math.random()*inputid.length)];
		$("input[name='electableLesson.no']").val(id);
		$("#electableLessonList_filter_submit").click();
		var targetid=$("tr[class='electGridTr electGridTr-even']").attr('id');
		var shortid=targetid.substr(6,6);
		var expLesson="#expLessonGroups_"+targetid.substr(6,6);
		var groupid;
		if($(expLesson).attr('value'))	{
			groupid=$(expLesson).attr('value');
			var expLessonArray=document.getElementsByName("expLessonGroups_"+targetid.substr(6,6));
			if (expLessonArray.length>1)	{
				var lessonRandom=Math.floor(Math.random()*expLessonArray.length);
				groupid=$(expLessonArray[lessonRandom]).attr('value');
			}
		}
		else 	{
			groupid="undefined";
		}
		var getdata;
		var request=$.ajax({
		  type: "POST",
		  //如果是不同的选课系统把url的profileId改成对应的即可
		  url: "http://eamis.nankai.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=539",
		  data: "optype=true&operator0="+shortid+"%3Atrue%3A0&lesson0="+shortid+"&expLessonGroup_"+shortid+"="+groupid,
		  async:false,
		  dataType: "json",
		  complete: function(data)	{
		  	getdata=eval(data).responseText;
		  },
		});
		await sleep(sleeptime);
		if(getdata.indexOf("成功")>=0) 	{
			if(inputid.length>1)	{
				inputid.splice($.inArray(id,inputid),1);
				console.log("Success! Id: "+id+" Group:"+groupid);
				//mainfunc(sleeptime,inputid);
			}
			else {
				console.log("Success! Id: "+id+" Group:"+groupid);
				alert("All Succeeded!");
				return;
			}
		}
		else 	{
			console.log("Failed...Try again...Last try Id: "+id+", groupid: "+groupid+", Last interval: "+sleeptime);
			//mainfunc(sleeptime,inputid);
		}
	}
}

mainfunc(sleeptime,inputid);
