const fs = require('fs')
const path = require('path')

function checkFiles(ext, text) {
    return checkFilesExtends(__dirname, ext, text);
    function checkFilesExtends(dir, ext, text) {
        let files = fs.readdirSync(dir);
        let fileslist = []
        files.forEach(file => {
            if (fs.statSync(`${dir}/${file}`).isDirectory()) {
                fileslist = fileslist.concat(checkFilesExtends(`${dir}/${file}`, ext, text))
            }
            else {
                if (path.extname(file) === `.${ext}` && fs.readFileSync(`${dir}/${file}`, { encoding: 'utf8' }).indexOf(text) !== -1) {
                    fileslist.push(`${dir}/${file}`)
                }
            }
        })

        return fileslist;
    }
}

let a = process.argv
if (a.length == 4) {
    let files = checkFiles(a[2], a[3])
    if (files.length === 0) {
        console.log('\n No files was found')
    } else {
        console.log(files.join('\n'))
    }
}
else {
    console.log('USAGE: node search [EXT] [TEXT]')
}
