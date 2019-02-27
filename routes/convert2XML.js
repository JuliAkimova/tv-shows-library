const o2x = require('object-to-xml');

module.exports = (format, output) => {
    if(format === 'xml') {
        return o2x({
            '?xml version="1.0" encoding="utf-8"?' : null,
            data: output
        })
    } else {
        return output
    }
}    
