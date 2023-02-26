document.getElementById('random seed').addEventListener('click', () => {
	let tmp = Math.floor(Math.random() * 1e9);
	Math.seedrandom(tmp);
	document.getElementById('seed').value = tmp;
	console.log(tmp);
})
document.getElementById('fill1').addEventListener('click', () => {
	document.getElementById('ot').value = "18 19 16 21 40 13 34 8 31 37 24 22 28 38 44";
})
document.getElementById('fill2').addEventListener('click', () => {
	document.getElementById('tf').value = "17 10 12 27 35 36 3 1 6 20 14 7 42 15 41";
})
document.getElementById('fill3').addEventListener('click', () => {
	document.getElementById('fs').value = "23 25 33 30 39 5 4 29 11 26 32 2 43 9";
})
document.getElementById('fill4').addEventListener('click', () => {
	document.getElementById('zz').value = "3 17 19 29 31 37 38";
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

	for (let j = 0; j < 7; j++) export_table[0][j] = "第" + (j + 1) + "列";

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
				}
				if (i != 6) {
					if (seat[i + 1][j] === a || seat[i + 1][j] === b) return false;
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
		for (let i = 0; i < 7; i++) {
			for (let k = 0; k < zz.length; k++) {
				if (seat[i][j] === zz[k]) {
					finalzz[j] = i;
					havezz = true;
					break;
				}
			}
		}
		if (!havezz) return [false];
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
	let seat = new Array(7).fill(0).map(_ => new Array(7));
	// console.log(res);
	while (generation >= 0) {
		ttf = [];
		tfs = [];
		se = [];
		ot = shuffle(resot);
		tf = [];
		fs = [];
		generation++;
		log('Running Generation ' + generation + '...');

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
		seat = new Array(7).fill(0).map(_ => new Array(7).fill('-'));
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
		console.log(seat);

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
	const data = newList.join('\n')
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