exports.getElement = () => {
    var div = $('<div>');
    var btn = $('<button>').appendTo(div);
    btn.addClass('btn btn-link');
    btn.html("<i class='fa fa-exchange'></i>&nbsp;Flip Horizontal")
    btn.on('click', (e) => {
        btn.trigger('runOperation');
    });
    return div;
}

/**
 * @description Takes pixelData object (data:byteArray, width:number, height:number)
 */
exports.runOperation = (pixelData) => {
    let d = $.Deferred();

    var data = new Uint8ClampedArray(pixelData.data.length);
    var rowLength = pixelData.width * 4; //TODO: find out channels somehow
    for (var i = 0; i < pixelData.data.length; i += rowLength) {
        for (var j = 0, k = rowLength - 1; j < rowLength; j += 4, k -= 4) {
            data[i + j] = pixelData.data[i + k - 3];
            data[i + j + 1] = pixelData.data[i + k - 2];
            data[i + j + 2] = pixelData.data[i + k - 1];
            data[i + j + 3] = pixelData.data[i + k];
        }
    }
    let flippedData = new ImageData(data, pixelData.width, pixelData.height);

    d.resolve(flippedData);
    return d.promise();
}