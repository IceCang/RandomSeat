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
			defaultot = fc_json.ot;
			defaulttf = fc_json.tf;
			defaultfs = fc_json.fs;
			defaultzz = fc_json.zz;
			defaultseparte = fc_json.separate;
            console.log(fc_json);
        };
        file_reader.readAsText(file, 'UTF-8');
	});
});
fetch('./config.json')
    .then((response) => response.json())
    .then((json) => {
		// console.log(json);
		defaultot = json.ot;
		defaulttf = json.tf;
		defaultfs = json.fs;
		defaultzz = json.zz;
		defaultseparte = json.separate;
		// console.log(defaultseparte);
	})
document.getElementById('random seed').addEventListener('click', () => {
	let tmp = Math.floor(Math.random() * 1e9);
	Math.seedrandom(tmp);
	document.getElementById('seed').value = tmp;
	// console.log(tmp);
})
document.getElementById('set seed as date').addEventListener('click', () => {
	var d = new Date();
	var year = d.getYear() - 100 + 2000;
	var month = d.getMonth() + 1;
	var date = d.getDate();
	y = year.toString();
	m = month.toString();
	d = date.toString();
	for (let i = y.length + 1; i < 4; i++) y = '0' + y;
	for (let i = m.length; i < 2; i++) m = '0' + m;
	for (let i = d.length; i < 2; i++) d = '0' + d;
	document.getElementById('seed').value = y + m + d;
	// console.log(tmp);
})
document.getElementById('fill1').addEventListener('click', () => {
	document.getElementById('ot').value = defaultot;
})
document.getElementById('fill2').addEventListener('click', () => {
	document.getElementById('tf').value = defaulttf;
})
document.getElementById('fill3').addEventListener('click', () => {
	document.getElementById('fs').value = defaultfs;
})
document.getElementById('fill4').addEventListener('click', () => {
	document.getElementById('zz').value = defaultzz;
})
document.getElementById('fill5').addEventListener('click', () => {
	document.getElementById('spl').value = defaultseparte;
})
document.getElementById('hide').addEventListener('click', () => {
	document.getElementById('spl').style = "display:none;";
})
document.getElementById('show').addEventListener('click', () => {
	document.getElementById('spl').style = "";
})

const logBox = document.getElementsByClassName('log-box')[0];

const log = (a) => {
	logBox.value += a + '\n';
	logBox.scrollTop = logBox.scrollHeight;
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
	for (let _ = 0; _ < 7; _++) {
		insideHtml += tr;
		for (let __ = 0; __ < 7; __++) {
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

let export_table = new Array(8).fill(0).map(_ => new Array(7));
const setTable = async (dat) => {
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

	for (let i = 0; i < 7; i++) {
		insideHtml += tr;
		for (let j = 0; j < 7; j++) {
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

	for (let j = 0; j < 7; j++) export_table[0][j] = "第" + (7 - j) + "列";

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
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 7; j++) {
			if (seat[i][j] === a || seat[i][j] === b) {
				if (i != 0) {
					if (seat[i - 1][j] === a || seat[i - 1][j] === b) return false;
					if (j!=0){
						if (seat[i - 1][j-1] === a || seat[i - 1][j-1] === b) return false;
					}
					if (j!=6){
						if (seat[i - 1][j+1] === a || seat[i - 1][j+1] === b) return false;
					}
				}
				if (i != 6) {
					if (seat[i + 1][j] === a || seat[i + 1][j] === b) return false;
					if (j!=0){
						if (seat[i + 1][j-1] === a || seat[i + 1][j-1] === b) return false;
					}
					if (j!=6){
						if (seat[i + 1][j+1] === a || seat[i + 1][j+1] === b) return false;
					}
				}
				if (j != 0) {
					if (seat[i][j - 1] === a || seat[i][j - 1] === b) return false;
				}
				if (j != 6) {
					if (seat[i][j + 1] === a || seat[i][j + 1] === b) return false;
				}
			}
		}
	}
	return true;
}

const checkCom = (a, b, seat) => {
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 7; j++) {
			if (seat[i][j] === a || seat[i][j] === b) {
				if (i != 0) {
					if (seat[i - 1][j] === a || seat[i - 1][j] === b) return true;
				}
				if (i != 6) {
					if (seat[i + 1][j] === a || seat[i + 1][j] === b) return true;
				}
				if (j != 0) {
					if (seat[i][j - 1] === a || seat[i][j - 1] === b) return true;
				}
				if (j != 6) {
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
	let finalzz = [0, 0, 0, 0, 0, 0, 0];
	// console.log(zz);
	for (let j = 0; j < 7; j++) {
		let havezz = false;
		let currZzList = new Array(0);
		for (let i = 0; i < 7; i++) {
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
	// console.log(spl, com)
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
	await new Promise((resolve, reject) => { setTimeout(() => { resolve(); }, 500) })
	log('Checking format...');
	var res = {
		'status': 1,
		'ot': [],
		'tf': [],
		'fs': [],
		'spl': [],
		'com': [],
		'zz': []
	};
	try {
		let ot = document.getElementById('ot').value.split(' ');
		let tf = document.getElementById('tf').value.split(' ');
		let fs = document.getElementById('fs').value.split(' ');
		let spl = document.getElementById('spl').value.split('\n');
		let com = document.getElementById('com').value.split('\n');
		let zz = document.getElementById('zz').value.split(' ');
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
		for (const idx in ot) {
			ot[idx] = parseInt(ot[idx]);
		}
		for (const idx in tf) {
			tf[idx] = parseInt(tf[idx]);
		}
		for (const idx in fs) {
			fs[idx] = parseInt(fs[idx]);
		}
		for (const idx in zz) {
			zz[idx] = parseInt(zz[idx]);
		}
		res = {
			'status': 1,
			'ot': ot,
			'tf': tf,
			'fs': fs,
			'spl': spl,
			'com': com,
			'zz': zz
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
	let ttf = [];
	let tfs = [];
	let se = [];
	let ot = [];
	let tf = [];
	let fs = [];
	let atf = [];
	let afs = [];
	var resot = res.ot;
	var restf = res.tf;
	var resfs = res.fs;
	var resspl = res.spl;
	var rescom = res.com;
	var reszz = res.zz;
	// let seat = new Array(7).fill(0).map(_ => new Array(7));
	let seat = new Array(7).fill(0).map(_ => new Array(7).fill('-'));
	// console.log(res);
	while (generation >= 0) {
		ttf.length = 0;
		tfs.length = 0;
		se.length = 0;
		ot = shuffle(resot);
		tf.length = 0;
		fs.length = 0;
		generation++;
		// log('Running Generation ' + generation + '...');

		if (ot.length > 14) {
			for (let i = 14; i < ot.length; i++) {
				ttf.push(ot[i]);
				tf.push(ot[i]);
			}
		}
		atf = shuffle(restf);
		for (let i = 0; i < atf.length; i++) tf.push(atf[i]);
		if (tf.length > 14) {
			for (let i = 14; i < tf.length; i++) {
				tfs.push(tf[i]);
				fs.push(tf[i]);
			}
		}
		afs = shuffle(resfs);
		for (let i = 0; i < afs.length; i++) fs.push(afs[i]);
		if (fs.length > 14) {
			for (let i = 14; i < fs.length; i++) {
				se.push(fs[i]);
			}
		}
		let tmppos = Math.ceil(Math.random() * 6);
		let tmpnum = tf[0];
		tf[0] = tf[tmppos];
		tf[tmppos] = tmpnum;
		tmppos = Math.ceil(Math.random() * 6);
		tmpnum = fs[0];
		fs[0] = fs[tmppos];
		fs[tmppos] = tmpnum;
		tmppos = Math.ceil(Math.random() * 6);
		tmpnum = fs[1];
		fs[1] = fs[tmppos];
		fs[tmppos] = tmpnum;
		// seat = new Array(7).fill(0).map(_ => new Array(7).fill('-'));
		for (let i = 0; i < 7; i++)
			for (let j = 0; j < 7; j++)
				seat[i][j] = '-';
		for (let i = 0; i < 14; i++) {
			seat[Math.floor(i / 7)][i % 7] = ot[i];
		}
		for (let i = 0; i < 14; i++) {
			seat[2 + Math.floor(i / 7)][i % 7] = tf[i];
		}
		for (let i = 0; i < 14; i++) {
			seat[4 + Math.floor(i / 7)][i % 7] = fs[i];
		}
		let ses = Math.ceil(Math.random() / 3 * 10) - 1;
		seat[6][ses] = se[0];
		seat[6][ses + 3] = se[1];
		// console.log("sdfasdfasdf");
		// console.log(seat);

		rs = checkValid({
			'seat': seat,
			'zz': reszz,
			'com': rescom,
			'spl': resspl
		});
		if (rs[0]) {
			await setTable({
				'seat': seat,
				'zz': rs[1]
			})
			log('Success Generation ' + generation + '!');
			success()
			return
		}
	}
}

initTable()
initLog()

document.getElementById('export').addEventListener('click', () => {
	console.log(export_table);
	const newList = export_table.map(res => res.join(','))
	let data = newList.join('\n')
	data += "\n";
	data += "seed,";
	data += document.getElementById('seed').value ;
	console.log(data);
	// “\ufeff” BOM头
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