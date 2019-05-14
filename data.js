const fs = require('fs');
const utils = require('util');
const path = require('path');

async function readFile(url) {
    const readFile = await utils.promisify(fs.readFile);
    const result = await readFile(path.join(__dirname, url), 'utf-8');
    return result;
}

async function writeFile(url, data) {
    const writeFile = await utils.promisify(fs.writeFile);
    await writeFile(path.join(__dirname, url), data);
}

(async () => {
    const data = await readFile('./test.json');
    const result = JSON.parse(data);
    const columns = [
        '白细胞',
        '红细胞',
        '血红蛋白',
        '血小板',
        '中性粒细胞',
        'AST',
        'ALT',
        '白蛋白',
        '总胆红素',
        '直接胆红素DB',
        'GGT',
        'ALP',
        'CHE',
        'PT',
        '凝血酶原活动度',
        'INR',
        'AFP'
    ];
    const users = `195475
        0000775764
        0000803516
        0000178687
        0000933490
        0000984354
        0000079906
        0000002649
        0000602375
        0000825990
        0000038799
        0000915561
        0001117213
        0000089543
        0000196173
        0000089170
        0001202288
        0000129930
        0001411653
        0001458213
        0001429234
        0000294884
        0001670131
        0000802712
        0000131916
        0001710953
        0001878564
        0000408609
        0001902674
        0002009338
        0002009338
        0002256682
        0002318818
        0001147845
        0002371752
        0002479636
        0002499196
        0002531468
        0001803108
        0002639798
        0002649734
        0002725312
        0001839460
        0002806232
        0000448513
        0002351841
        0002930162
        0002894064
        0002977708
        0003030087
        0003092637
        0003097544
        0003144309
        0003105363
        0000921892
        0003244877
        0003344324
        0001450582
        0002386890
        0002943318
        0003444084
        0003437204
        0003557234
        0003583969
        0003572492
        0003540582
        0001810958
        0003245510
        0003568992
        0003634224
        0003711282`;
    const userArr = users.split('\n');

    // 处理结果数据
    const execResult = [];
    for (let cln = 0; cln < columns.length; cln++) {
        for (let userIndex = 0; userIndex < userArr.length; userIndex++) {
            if (!result[userIndex * 6 + 5]) continue;
            const itemResult = {};
            itemResult['细胞类型'] = columns[cln];
            itemResult['登记号'] = userArr[userIndex].trim();
            itemResult['白细胞术前'] = result[userIndex * 6 + 0][columns[cln]];
            itemResult['术后一周'] = result[userIndex * 6 + 1][columns[cln]];
            itemResult['术后1月'] = result[userIndex * 6 + 2][columns[cln]];
            itemResult['术后3月'] = result[userIndex * 6 + 3][columns[cln]];
            itemResult['术后6月'] = result[userIndex * 6 + 4][columns[cln]];
            itemResult['术后1年'] = result[userIndex * 6 + 5][columns[cln]];
            execResult.push(itemResult);
        }
    }
    await writeFile('./result.json', JSON.stringify(execResult, null, 2));
})();