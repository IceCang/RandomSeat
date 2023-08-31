let n, m, K, last_row_pos_can_be_choosed, person, defaultseparte;
function upload() {
	var inputObj=document.createElement('input')
	inputObj.setAttribute('id','file');
	inputObj.setAttribute('type','file');
	inputObj.setAttribute('name','file');
	inputObj.setAttribute("style",'visibility:hidden');
	document.body.appendChild(inputObj);
	inputObj.value;
	inputObj.click();
	console.log(inputObj);
} 
document.getElementById('chooseFile').addEventListener('click', () => {
	upload();
	document.querySelector('#file').addEventListener('change', e => {
		for (let entry of e.target.files){
			document.getElementById("fileNameInput").value=entry.name;
			path = entry.path
			console.log(entry);
			console.log(entry.name, entry.webkitRelativePath);
		};
		let file = e.target.files[0];
        let file_reader = new FileReader();
        file_reader.onload = () => {
            let fc = file_reader.result;
			let fc_json = JSON.parse(fc);
			n = parseInt(fc_json.rows); //行数
			m = parseInt(fc_json.columns); //列数
			K = parseInt(fc_json.random_between_rows); //每多少行之间打乱
			last_row_pos_can_be_choosed = fc_json.last_row_pos_can_be_choosed.split(' '); //最后一行可选位置
			person = fc_json.person_sort_by_height.split(' ');
			zz = fc_json.zz.split(' ');
			defaultseparte = fc_json.separate;
			for (const idx in zz) {
				zz[idx] = parseInt(zz[idx]);
			}
			for (const idx in person) {
				person[idx] = parseInt(person[idx]);
			}
        };
        file_reader.readAsText(file, 'UTF-8');
	});
});
fetch('./config.json')
    .then((response) => response.json())
    .then((json) => {
		// console.log(json);
		n = parseInt(json.rows); //行数
		m = parseInt(json.columns); //列数
		K = parseInt(json.random_between_rows); //每多少行之间打乱
		last_row_pos_can_be_choosed = json.last_row_pos_can_be_choosed.split(' '); //最后一行可选位置
		person = json.person_sort_by_height.split(' ');
		zz = json.zz.split(' ');
		defaultseparte = json.separate;
		for (const idx in zz) {
			zz[idx] = parseInt(zz[idx]);
		}
		for (const idx in person) {
			person[idx] = parseInt(person[idx]);
		}
		initTable(); //读完 n,m 才有值
	})
document.getElementById('random-seed').addEventListener('click', () => {
	let tmp = Math.floor(Math.random() * 1e9);
	Math.seedrandom(tmp);
	document.getElementById('seed').value = tmp;
})
document.getElementById('set-seed-as-date').addEventListener('click', () => {
	document.getElementById('seed').value = new Date().toISOString().split('T')[0].replaceAll('-','');
})
document.getElementById('hide').addEventListener('click', () => {
	document.getElementById('spl').style = "display:none;";
})
document.getElementById('show').addEventListener('click', () => {
	document.getElementById('spl').style = "";
})
document.getElementById('fill5').addEventListener('click', () => {
	document.getElementById('spl').value = defaultseparte;
})

const logBox = document.getElementsByClassName('log-box')[0];

const log = (a) => {
	logBox.value += a + '\n';
	logBox.scrollTop = logBox.scrollheight;
}

const initTable = async () => {
	let result = document.createElement('table');
	result.className = "tc mt";
	result.id = 'res'
	const tbody = "<tbody>";
	const tr = "<tr>";
	const btr = "</tr>";
	const btbody = "</tbody>";
	const td = "<td>";
	const btd = "</td>";
	const nothing = "-";
	let insideHtml = tbody;
	for (let _ = 0; _ < n; _++) {
		insideHtml += tr;
		for (let __ = 0; __ < m; __++) {
			insideHtml += td + nothing + btd;
		}
		insideHtml += btr;
	}
	insideHtml += btbody;
	result.innerHTML = insideHtml;
	node = document.getElementById('tb');
	node.parentNode.insertBefore(result, node);
	node.remove();
	document.getElementById('generate').addEventListener('click', generate);
	document.getElementById('generate').addEventListener('click', () => {
		const gen = document.getElementById('generate');
		gen.className = 'am-btn am-btn-default am-round am-disabled';
		gen.innerHTML = '生成中&nbsp;<i class="am-icon-circle-o-notch am-icon-spin"></i>';
	})
}

const initLog = async () => {
	log(`Hello Random Seat by EDP2021C1 EEC`);
}

const resetButton = () => {
	const gen = document.getElementById('generate');
	gen.className = 'am-btn am-btn-primary am-round';
	gen.innerHTML = '开始生成！';
}

const failed = () => {
	const gen = document.getElementById('generate');
	gen.className = 'am-btn am-btn-danger am-round';
	gen.innerHTML = '生成失败！';
	setTimeout(resetButton, 1000);
}

const success = () => {
	const gen = document.getElementById('generate');
	gen.className = 'am-btn am-btn-success am-round';
	gen.innerHTML = '生成成功！';
	setTimeout(resetButton, 1000);
}

const setTable = async (dat) => {
	let export_table = new Array(n + 1).fill(0).map(_ => new Array(m));
	let result = document.getElementById('res');
	const tbody = "<tbody>";
	const tr = "<tr>";
	const btr = "</tr>";
	const btbody = "</tbody>";
	const td = "<td>";
	const ztd = '<td class="zz">';
	const btd = "</td>";
	const nothing = "-";
	let insideHtml = tbody;

	const zz = dat.zz;
	const seat = dat.seat;
	console.log('seat in setTable function const');
	console.log(seat);
	for (let i = 0; i < n; i++) {
		insideHtml += tr;
		for (let j = 0; j < m; j++) {
			if (zz[j] === i) {
				export_table[i + 1][j] = "*" + seat[i][j] + "*";
				insideHtml += ztd;
			} else {
				export_table[i + 1][j] = seat[i][j];
				insideHtml += td;
			}
			insideHtml += seat[i][j];
			insideHtml += btd;
		}
		insideHtml += btr;
	}

	for (let j = 0; j < m; j++) export_table[0][j] = "第" + (m - j) + "列";

	insideHtml += btbody;
	result.innerHTML = insideHtml;
}

const shuffle = (arr) => {
	let arr1 = [];
	for (let i = 0; i < arr.length; i++) arr1.push(arr[i]);
	let result = [];
	let random = 0;
	while (arr1.length > 0) {
		random = Math.floor(Math.random() * arr1.length);
		result.push(arr1[random])
		arr1.splice(random, 1)
	}
	return result
}

const checkSpl = (a, b, seat) => {
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			if (seat[i][j] === a || seat[i][j] === b) {
				if (i != 0) {
					if (seat[i - 1][j] === a || seat[i - 1][j] === b) return false;
					if (j != 0){
						if (seat[i - 1][j-1] === a || seat[i - 1][j-1] === b) return false;
					}
					if (j != m - 1){
						if (seat[i - 1][j+1] === a || seat[i - 1][j+1] === b) return false;
					}
				}
				if (i !=  n - 1) {
					if (seat[i + 1][j] === a || seat[i + 1][j] === b) return false;
					if (j != 0){
						if (seat[i + 1][j-1] === a || seat[i + 1][j-1] === b) return false;
					}
					if (j != m - 1){
						if (seat[i + 1][j+1] === a || seat[i + 1][j+1] === b) return false;
					}
				}
				if (j != 0) {
					if (seat[i][j - 1] === a || seat[i][j - 1] === b) return false;
				}
				if (j != m - 1) {
					if (seat[i][j + 1] === a || seat[i][j + 1] === b) return false;
				}
			}
		}
	}
	return true;
}

const checkCom = (a, b, seat) => {
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < m; j++) {
			if (seat[i][j] === a || seat[i][j] === b) {
				if (i != 0) {
					if (seat[i - 1][j] === a || seat[i - 1][j] === b) return true;
				}
				if (i != n - 1) {
					if (seat[i + 1][j] === a || seat[i + 1][j] === b) return true;
				}
				if (j != 0) {
					if (seat[i][j - 1] === a || seat[i][j - 1] === b) return true;
				}
				if (j != m - 1) {
					if (seat[i][j + 1] === a || seat[i][j + 1] === b) return true;
				}
			}
		}
	}
	// To disable This, edit this to "return true;"
	return false;
}

const checkValid = (dat) => {
	const seat = dat.seat;
	const zz = dat.zz;
	const com = dat.com;
	const spl = dat.spl;
	let finalzz = new Array(m).fill(0);
	for (let j = 0; j < m; j++) {
		let havezz = false;
		let currZzList = new Array(0);
		for (let i = 0; i < n; i++){
			for (let k = 0; k < zz.length; k++) {
				if (seat[i][j] === zz[k]) {
					currZzList.push(i);
					havezz = true;
					break;
				}
			}
		}
		if (!havezz) return [false];
		finalzz[j] = currZzList[Math.floor(Math.random() * currZzList.length)];
	}
	for (let i = 0; i < spl.length; i++) {
		if (!checkSpl(spl[i][0], spl[i][1], seat)) return [false];
	}

	for (let i = 0; i < com.length; i++) {
		if (!checkCom(com[i][0], com[i][1], seat)) return [false];
	}

	return [true, finalzz];
}

const generate = async () => {
	let generation = 0;
	log('Checking format...');
	var res = {
		'status': 1,
		'rows': 0,
		'columns': 0,
		'random_between_rows': 0,
		'last_row_pos_can_be_choosed': [],
		'person_sort_by_height': [],
		'spl': [],
		'com': [],
		'zz': [],
		'separate': []
	};
	try {
		let spl = document.getElementById('spl').value.split('\n');
		let com = document.getElementById('com').value.split('\n');
		let seed = document.getElementById('seed').value;
		Math.seedrandom(seed);
		if (spl[0] != '') {
			for (const idx in spl) {
				spl[idx] = spl[idx].split(' ');
				spl[idx][0] = parseInt(spl[idx][0]);
				spl[idx][1] = parseInt(spl[idx][1]);
			}
		} else spl = [];
		if (com[0] != '') {
			for (const idx in com) {
				com[idx] = com[idx].split(' ');
				com[idx][0] = parseInt(com[idx][0]);
				com[idx][1] = parseInt(com[idx][1]);
			}
		} else com = [];
		res = {
			'status': 1,
			'spl': spl,
			'com': com
		}
	} catch {
		res = {
			'status': 0
		}
	}
	if (res.status === 0) {
		log('Invalid format!');
		failed();
		return;
	}
	let ans = [];
	let tmp = [];
	let last_row = [];
	let pos = [];
	var resspl = res.spl;
	var rescom = res.com;
	let vis = [];
	let seat = new Array(n).fill().map(() => new Array(m).fill('-'));
	console.log(person);
	while (generation >= 0){
		generation++;
		for (let now_row = 0; now_row < n; now_row += K){
			tmp.length = 0;
			if (n - now_row - K == 1){
				for (let i = 0; i < person.length - now_row * m; i++){
					tmp[i] = person[i + now_row * m];
				}
				tmp = shuffle(tmp);
				for (let i = 0; i < K * m; i++){
					ans[i + now_row * m] = tmp[i];
				}
				for (let i = 0; i < person.length - (now_row + K) * m; i++){
					last_row[i] = tmp[i + K * m];
				}
				break;
			}else{
				for (let i = 0; i < K * m; i++){
					tmp[i] = person[i + now_row * m];
				}
				tmp = shuffle(tmp);
				for (let i = 0; i < K * m; i++){
					ans[i + now_row * m] = tmp[i];
				}
			}
		}
		for (let i = 0; i < n; i++)
			for (let j = 0; j < m; j++)
				seat[i][j] = '-';
		for (let i = 0; i < n - 1; i++)
			for (let j = 0; j < m; j++)
				seat[i][j] = ans[i * m + j];
		console.log("ans", ans);
		console.log("seat", seat);
		if (last_row.length > last_row_pos_can_be_choosed.length){
			log("生成失败，最后一行人数大于可选择位置数！");
			failed();
			return;
		}
		for (let i = 0; i < m; i++){
			vis[i] = 0;
			pos[i] = 0;
		}
		for (let i = 0; i < m; i++){
			let rand_num = Math.floor(Math.random() * last_row_pos_can_be_choosed.length);
			while (vis[rand_num]){
				rand_num = Math.floor(Math.random() * last_row_pos_can_be_choosed.length)
			}
			vis[rand_num] = 1;
			pos[i] = rand_num;
		}
		for (let i = 0; i < last_row.length; i++){
			seat[n - 1][pos[i]] = last_row[i]; 
		}
		rs = checkValid({
			'seat': seat,
			'zz': zz,
			'com': rescom,
			'spl': resspl
		});
		if (rs[0]) {
			await setTable({
				'seat': seat,
				'zz': rs[1]
			})
			log('Success Generation ' + generation + '!');
			success();
			return;
		}
	}
}

initLog()

document.getElementById('export').addEventListener('click', () => {
	console.log(export_table);
	const newList = export_table.map(res => res.join(','))
	let data = newList.join('\n')
	data += "\n";
	data += "seed,";
	data += document.getElementById('seed').value ;
	console.log(data);
	var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
	var downloadLink = document.createElement("a");
	downloadLink.href = uri;
	var d = new Date();
	var year = d.getYear() - 100 + 2000;
	var month = d.getMonth() + 1;
	var date = d.getDate();
	downloadLink.download = (year + "-" + month + "-" + date + ".csv") || "temp.csv";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
})
