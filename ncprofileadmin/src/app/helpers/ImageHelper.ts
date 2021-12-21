export function createImageFromBlob(image: Blob) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            //  this.logoImage = reader.result;
            resolve(reader.result);
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    })
}