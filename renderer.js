let rowCount, columnCount, K, last_row_pos_can_be_chosen, person, zz, defaultspl, export_table;

const tbody = "<tbody>";
const tr = "<tr>";
const btr = "</tr>";
const btbody = "</tbody>";
const td = "<td>";
const btd = "</td>";
const nothing = "-";

const logBox = document.getElementsByClassName("log-box")[0];

function shuffle(arr) {
    let random;
    let tmp;
    for (let i = arr.length; i > 0; i--) {
        random = Math.floor(Math.random() * arr.length)
        tmp = arr[i - 1];
        arr[i - 1] = arr[random]
        arr[random] = tmp;
    }
    return arr
}

function upload() {
    const inputObj = document.createElement("input");
    inputObj.setAttribute("id", "file");
    inputObj.setAttribute("type", "file");
    inputObj.setAttribute("name", "file");
    inputObj.setAttribute("style", "visibility:hidden");
    document.body.appendChild(inputObj);
    inputObj.value;
    inputObj.click();
    // console.log(inputObj);
}

function read(json) {
    try {
        rowCount = json.rows; //行数
        columnCount = json.columns; //列数
        K = json.random_between_rows; //每多少行之间打乱
        last_row_pos_can_be_chosen = json.last_row_pos_can_be_chosen.split(" "); //最后一行可选位置
        person = json.person_sort_by_height.split(" ");
        zz = json.zz.split(" ");
        defaultspl = json.separate;
        for (const idx in last_row_pos_can_be_chosen) {
            last_row_pos_can_be_chosen[idx] = parseInt(last_row_pos_can_be_chosen[idx]);
        }
        for (const idx in zz) {
            zz[idx] = parseInt(zz[idx]);
        }
        for (const idx in person) {
            person[idx] = parseInt(person[idx]);
        }
    } catch (error) {
        console.log(error);
        log("config文件格式错误,无法读取!");
    }
}

function log(msg) {
    logBox.value += msg + "\n";
    logBox.scrollTop = logBox.scrollheight;
}

function resetTable() {
    let result = document.createElement("span");
    result.id = "tb"
    console.log(result);
    let node = document.getElementById("res");
    console.log(node);
    node.parentNode.insertBefore(result, node);
    node.remove();
}
function initTable() {
    let node;
    let result = document.createElement("table");
    result.className = "tc mt";
    result.id = "res"
    let insideHtml = tbody;
    for (let _ = 0; _ < rowCount; _++) {
        insideHtml += tr;
        for (let __ = 0; __ < columnCount; __++) {
            insideHtml += td + nothing + btd;
        }
        insideHtml += btr;
    }
    insideHtml += btbody;
    result.innerHTML = insideHtml;
    node = document.getElementById("tb");
    let special = document.createElement("span");
    let special1 = document.createElement("br");
    special.setAttribute("style", "width: 100%;");
    special.innerHTML = `<div style="text-align: center">幸运观众:&nbsp;<span id="special">-</span></div>`
    node.parentNode.insertBefore(result, node);
    node.parentNode.insertBefore(special1, node);
    node.parentNode.insertBefore(special, node);
    node.remove();
    document.getElementById("generate").addEventListener("click", generate);
    document.getElementById("generate").addEventListener("click", () => {
        const gen = document.getElementById("generate");
        gen.className = "am-btn am-btn-default am-round am-disabled";
        gen.innerHTML = "生成中&nbsp;<i class=\"am-icon-circle-o-notch am-icon-spin\"></i>";
    })
}

function initLog() {
    log(`Hello Random Seat by EDP2021C1 EEC`);
}

function resetButton() {
    const gen = document.getElementById("generate");
    gen.className = "am-btn am-btn-primary am-round";
    gen.innerHTML = "开始生成！";
}

function failed() {
    const gen = document.getElementById("generate");
    gen.className = "am-btn am-btn-danger am-round";
    gen.innerHTML = "生成失败！";
    setTimeout(resetButton, 1000);
}

function success() {
    const gen = document.getElementById("generate");
    gen.className = "am-btn am-btn-success am-round";
    gen.innerHTML = "生成成功！";
    setTimeout(resetButton, 1000);
}

function setTable(dat) {
    let result = document.getElementById("res");
    const ztd = "<td class=\"zz\">";
    let insideHtml = tbody;

    const zz = dat.zz;
    const seat = dat.seat;
    const special = dat.special;
    // console.log("seat in setTable function const");
    // console.log(seat);
    for (let i = 0; i < rowCount; i++) {
        insideHtml += tr;
        for (let j = 0; j < columnCount; j++) {
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

    for (let j = 0; j < columnCount; j++) export_table[0][j] = "第" + (j + 1) + "列";

    insideHtml += btbody;
    result.innerHTML = insideHtml;
    document.getElementById("special").innerText = special;
}

function checkSpl(a, b, seat) {
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            if (seat[i][j] === a || seat[i][j] === b) {
                if (i !== 0) {
                    if (seat[i - 1][j] === a || seat[i - 1][j] === b) return false;
                    if (j !== 0) {
                        if (seat[i - 1][j - 1] === a || seat[i - 1][j - 1] === b) return false;
                    }
                    if (j !== columnCount - 1) {
                        if (seat[i - 1][j + 1] === a || seat[i - 1][j + 1] === b) return false;
                    }
                }
                if (i !== rowCount - 1) {
                    if (seat[i + 1][j] === a || seat[i + 1][j] === b) return false;
                    if (j !== 0) {
                        if (seat[i + 1][j - 1] === a || seat[i + 1][j - 1] === b) return false;
                    }
                    if (j !== columnCount - 1) {
                        if (seat[i + 1][j + 1] === a || seat[i + 1][j + 1] === b) return false;
                    }
                }
                if (j !== 0) {
                    if (seat[i][j - 1] === a || seat[i][j - 1] === b) return false;
                }
                if (j !== columnCount - 1) {
                    if (seat[i][j + 1] === a || seat[i][j + 1] === b) return false;
                }
            }
        }
    }
    return true;
}

/*
const checkCom = (a, b, seat) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (seat[i][j] === a || seat[i][j] === b) {
                if (i !== 0) {
                    if (seat[i - 1][j] === a || seat[i - 1][j] === b) return true;
                }
                if (i !== n - 1) {
                    if (seat[i + 1][j] === a || seat[i + 1][j] === b) return true;
                }
                if (j !== 0) {
                    if (seat[i][j - 1] === a || seat[i][j - 1] === b) return true;
                }
                if (j !== m - 1) {
                    if (seat[i][j + 1] === a || seat[i][j + 1] === b) return true;
                }
            }
        }
    }
    // To disable This, edit this to "return true;"
    return true;
}
*/

function checkValid(dat) {
    const seat = dat.seat;
    const zz = dat.zz;
    // const com = dat.com;
    const spl = dat.spl;
    let finalzz = new Array(columnCount).fill(0);
    for (let j = 0; j < columnCount; j++) {
        let havezz = false;
        let currZzList = new Array(0);
        for (let i = 0; i < rowCount; i++) {
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

    // for (let i = 0; i < com.length; i++) {
    // 	if (!checkCom(com[i][0], com[i][1], seat)) return [false];
    // }

    return [true, finalzz];
}

async function generate() {
    let generation = 0;
    log("Checking format...");
    let res;
    try {
        // let com = document.getElementById("com").value.split("\n");
        let spl = document.getElementById("spl").value.split("\n");
        let seed = document.getElementById("seed").value;
        Math.seedrandom(seed);
        if (spl[0] !== "") {
            for (const idx in spl) {
                spl[idx] = spl[idx].split(" ");
                spl[idx][0] = parseInt(spl[idx][0]);
                spl[idx][1] = parseInt(spl[idx][1]);
            }
        } else spl = [];
        // if (com[0] != "") {
        // 	for (const idx in com) {
        // 		com[idx] = com[idx].split(" ");
        // 		com[idx][0] = parseInt(com[idx][0]);
        // 		com[idx][1] = parseInt(com[idx][1]);
        // 	}
        // } else com = [];
        res = {
            "status": 1,
            "spl": spl,
            // "com": com
        }
    } catch {
        res = {
            "status": 0
        }
    }
    if (res.status === 0) {
        log("Invalid format!");
        failed();
        return;
    }
    let rs;
    let ans = [];
    let tmp = [];
    let last_row = [];
    let pos = [];
    const resspl = res.spl;
    // var rescom = res.com;
    let vis = [];
    let seat = new Array(rowCount).fill().map(() => new Array(columnCount).fill("-"));
    // console.log(person);
    while (generation >= 0) {
        generation++;
        for (let now_row = 0; now_row < rowCount; now_row += K) {
            tmp.length = 0;
            if (rowCount - now_row - K === 0) {
                for (let i = 0; i < person.length - now_row * columnCount; i++) {
                    tmp[i] = person[i + now_row * columnCount];
                }
                shuffle(tmp);
                for (let i = 0; i < (K - 1) * columnCount; i++) {
                    ans[i + now_row * columnCount] = tmp[i];
                }
                for (let i = 0; i < person.length - (now_row + K - 1) * columnCount; i++) {
                    last_row[i] = tmp[i + (K - 1) * columnCount];
                }
                break;
            } else if (rowCount - now_row - K === 1) {
                for (let i = 0; i < person.length - now_row * columnCount; i++) {
                    tmp[i] = person[i + now_row * columnCount];
                }
                shuffle(tmp);
                for (let i = 0; i < K * columnCount; i++) {
                    ans[i + now_row * columnCount] = tmp[i];
                }
                for (let i = 0; i < person.length - (now_row + K) * columnCount; i++) {
                    last_row[i] = tmp[i + K * columnCount];
                }
                break;
            }
            for (let i = 0; i < K * columnCount; i++) {
                tmp[i] = person[i + now_row * columnCount];
            }
            shuffle(tmp);
            for (let i = 0; i < K * columnCount; i++) {
                ans[i + now_row * columnCount] = tmp[i];
            }
        }
        for (let i = 0; i < rowCount; i++)
            for (let j = 0; j < columnCount; j++)
                seat[i][j] = "-";
        for (let i = 0; i < rowCount - 1; i++)
            for (let j = 0; j < columnCount; j++)
                seat[i][j] = ans[i * columnCount + j];
        if (last_row.length - 1 > last_row_pos_can_be_chosen.length) {
            log("生成失败，最后一行人数大于可选择位置数！");
            failed();
            return;
        }
        for (let i = 0; i < columnCount; i++) {
            vis[i] = 0;
            pos[i] = 0;
        }
        for (let i = 0; i < last_row.length - 1; i++) {
            let rand_num = Math.floor(Math.random() * last_row_pos_can_be_chosen.length);
            while (vis[rand_num]) {
                rand_num = Math.floor(Math.random() * last_row_pos_can_be_chosen.length)
            }
            vis[rand_num] = 1;
            pos[i] = last_row_pos_can_be_chosen[rand_num] - 1;
        }
        for (let i = 0; i < last_row.length - 1; i++) {
            seat[rowCount - 1][pos[i]] = last_row[i];
        }
        rs = checkValid({
            "seat": seat,
            "zz": zz,
            // "com": rescom,
            "spl": resspl
        });
        if (rs[0]) {
            await setTable({
                "seat": seat,
                "zz": rs[1],
                "special": last_row[last_row.length - 1]
            })
            log("Success Generation " + generation + "!");
            success();
            return;
        }
    }
}

initLog()

document.getElementById("export").addEventListener("click", () => {
    // console.log(export_table);
    const newList = export_table.map(res => res.join(","))
    let data = newList.join("\n")
    data += "\n";
    data += "seed,";
    data += document.getElementById("seed").value;
    data += ",special,";
    data += document.getElementById("special").innerText;
    console.log(data);
    const uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(data);
    const downloadLink = document.createElement("a");
    downloadLink.href = uri;
    const d = new Date();
    const year = d.getFullYear() - 100 + 2000;
    const month = d.getMonth() + 1;
    const date = d.getDate();
    downloadLink.download = (year + "-" + month + "-" + date + ".csv") || "temp.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
})

document.getElementById("chooseFile").addEventListener("click", () => {
    upload();
    document.querySelector("#file").addEventListener("change", e => {
        for (let entry of e.target.files) {
            document.getElementById("fileNameInput").value = entry.name;
        }

        let file = e.target.files[0];
        let file_reader = new FileReader();
        file_reader.onload = () => {
            try {
                let fc = file_reader.result;
                let fc_json = JSON.parse(fc);
                read(fc_json);
                resetTable();
                initTable(); //读完 n,m 才有值
                export_table = new Array(rowCount + 1).fill(0).map(_ => new Array(columnCount));
            } catch (error) {
                console.log(error);
                log("config文件格式错误,无法读取!");
            }
        };
        file_reader.readAsText(file, "UTF-8");
    });
});
fetch("./config.json")
    .then((response) => response.json())
    .then((json) => {
        read(json);
        initTable(); //读完 n,m 才有值
        export_table = new Array(rowCount + 1).fill(0).map(_ => new Array(columnCount));
    })
document.getElementById("random-seed").addEventListener("click", () => {
    let tmp = Math.floor(Math.random() * 1e9);
    Math.seedrandom(tmp);
    document.getElementById("seed").value = tmp;
})
document.getElementById("set-seed-use-time").addEventListener("click", () => {
    document.getElementById("seed").value = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split(".")[0].replaceAll(/T|Z/gi, " ");
})
document.getElementById("fill5").addEventListener("click", () => {
    document.getElementById("spl").value = defaultspl;
})
