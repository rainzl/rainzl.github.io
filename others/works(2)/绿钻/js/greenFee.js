

window.onload = function (){
	/*greenfee.js*/
	var oGfQuestion = document.getElementById('gfQuestions');
	var aGfQuestSct = oGfQuestion.getElementsByTagName('section')[0];
	var oGfQuestAtc = aGfQuestSct.getElementsByTagName('article');
	
	for ( i=0;i<oGfQuestAtc.length; i++ ){
		var oGfQuestDiv = oGfQuestAtc[i].getElementsByTagName('div');
		var  aGfQuestA = oGfQuestAtc[i].getElementsByTagName('a')[0];
		
		oGfQuestAtc[i].onOff = true;
		oGfQuestAtc[i].index = i;
		oGfQuestAtc[i].onclick = function (){
			oGfQuestDiv = oGfQuestAtc[this.index].getElementsByTagName('div');
			aGfQuestA = oGfQuestAtc[this.index].getElementsByTagName('a')[0];
			if ( this.onOff ){
				aGfQuestA.className += ' gfQuestionBtnActive';
				oGfQuestDiv[1].style.display = 'block';
				this.onOff = false;
			} else {
				aGfQuestA.className = 'gfQuestionBtn allSmallPng';
				oGfQuestDiv[1].style.display = 'none';
				this.onOff = true;
			}
		}
	}	
}
