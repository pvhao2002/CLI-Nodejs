const fs = require('fs')
const path = require('path');
let myArgs = process.argv.slice(2);


const classifyByTime = (fileTime) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    if (fileTime >= todayStart && fileTime < todayEnd) {
        return "Today";
    }

    const weekStart = new Date(todayStart - (todayStart.getDay() - 1) * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (fileTime >= weekStart && fileTime < weekEnd) {
        return "This week";
    }

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    if (fileTime >= monthStart && fileTime < monthEnd) {
        return "This month";
    }

    const yearStart = new Date(now.getFullYear(), 0, 1);
    const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
    if (fileTime >= yearStart && fileTime < yearEnd) {
        return "This year";
    }
    return "Other";
}

const handleFile = (context) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            return;
        }

        files.forEach(file => {
            fs.stat(file, (error, stat) => {
                if (error) {
                    return console.error(error);
                }
                let classifiedFolder = path.join(context, classifyByTime(stat.mtime));
                if (!fs.existsSync(classifiedFolder)) {
                    fs.mkdirSync(classifiedFolder, { recursive: true }, (err) => {
                        if (err) throw err;
                    });
                }
                let filePath = path.join(__dirname, file);
                let destPath = path.join(classifiedFolder, file);
                fs.copyFile(filePath, destPath, err => {
                    if (err) {
                        return;
                    }
                });
            });

        });
    });
}

module.exports = {
    handleFile: handleFile
}

