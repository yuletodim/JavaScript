function random0to4(){
	var ran = Math.floor(5*Math.random());
	return ran;
}

function soothsayer(value){
	var result = [];
	for (var i = 0; i < 4; i++) {
		var ran = random0to4();
		result[i] = value[i][ran];
	}
	return result;
	}

var arr = [[3, 5, 2, 7, 9], ['Java', 'Python', 'C#', 'JavaScript', 'Ruby'], 
				['Silicon Valley', 'London', 'Las Vegas', 'Paris', 'Sofia'], 
				['BMW', 'Audi', 'Lada', 'Skoda', 'Opel']];

var result = soothsayer(arr);
console.log("You will work " + result[0] + " years on " + result[1] + ". You will live in " + result[2] + " and drive " + result[3] + ".");