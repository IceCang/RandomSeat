// This file seems deprecated...

ttf = [];
tfs = [];
se = [];
ot = shuffle(resot);
tf = [];
fs = [];
generation++;
logBox.innerText += '\nRunning Generation ' + generation + '...';

if (ot.length > 14) {
    for (let i = 14; i < ot.length; i++) {
        ttf.push(ot[i]);
        tf.push(ot[i]);
    }
}
atf = shuffle(restf);
for (let i = 0; i < atf.length; i++) tf.push(atf[i]);
if (tf.length > 14 - ttf.length) {
    for (let i = 14 - ttf.length; i < tf.length - 1; i++) {
        tfs.push(tf[i]);
        fs.push(tf[i]);
    }
}
afs = shuffle(resfs);
for (let i = 0; i < afs.length; i++) fs.push(afs[i]);
if (fs.length > 14 - tfs.length) {
    for (let i = 14 - tfs.length; i < fs.length - 1; i++) {
        se.push(fs[i]);
    }
}
seat = new Array(7).fill(0).map(_ => new Array(7));
for (let i = 0; i < ot.length; i++) {
    seat[Math.floor(i / 7)][i % 7] = ot[i];
}
for (let i = 0; i < tf.length; i++) {
    seat[2 + Math.floor(i / 7)][i % 7] = tf[i];
}
for (let i = 0; i < fs.length - 1; i++) {
    seat[4 + Math.floor(i / 7)][i % 7] = fs[i];
}
let ses = Math.ceil(Math.random() / 3 * 10) - 1;
seat[6][ses] = se[0];
seat[6][ses + 3] = se[1];
console.log(ot, tf, fs, se);
if (checkValid({
    'seat': seat,
    'zz': reszz,
    'com': rescom,
    'spl': resspl
})[0] || generation > 5) {
    await setTable({
        'ot': ot,
        'tf': tf,
        'fs': fs,
        'se': se
    })
    logBox.innerText += 'Success Generation' + generation + '!';
    success()
}