import picaModule from "pica";

const pica = picaModule();

const MAX_DIMENSION = 1280;

const resizeImage = async (file: File) => {
  const img = await _createImageFromUri(file);
  const fromCanvas = _createCanvasForImage(img);
  const toCanvas = _createTargetCanvas(img.width, img.height);
  const quality = 1;
  let outputBlob: Blob | null = null;

  await pica.resize(fromCanvas, toCanvas, {
    unsharpAmount: 60,
    unsharpRadius: 0.6,
    unsharpThreshold: 2,
  });
  outputBlob = await pica.toBlob(toCanvas, file.type, quality);
  return outputBlob;
};

const _createCanvasForImage = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  console.log(img.width, img.height);
  canvas.width = img.width;
  canvas.height = img.height;

  ctx!.drawImage(
    img,
    canvas.width / 2 - img.width / 2,
    canvas.height / 2 - img.height / 2,
  );

  return canvas;
};

const _createTargetCanvas = (originalWidth: number, originalHeight: number) => {
  const canvas = document.createElement("canvas");

  const { width, height } = _resizeToMaxDimension(
    originalWidth,
    originalHeight,
  );

  canvas.width = width;
  canvas.height = height;

  return canvas;
};

const _createImageFromUri = async (file: File): Promise<HTMLImageElement> => {
  const img = document.createElement("img");
  const uri = URL.createObjectURL(file);

  return new Promise((resolve) => {
    img.onload = () => {
      resolve(img);
    };
    img.src = uri;
  });
};

function _resizeToMaxDimension(
  width: number,
  height: number,
): { width: number; height: number } {
  const aspectRatio = width / height;

  let newWidth: number, newHeight: number;

  if (width > height) {
    newWidth = MAX_DIMENSION;
    newHeight = MAX_DIMENSION / aspectRatio;
  } else {
    newHeight = MAX_DIMENSION;
    newWidth = MAX_DIMENSION * aspectRatio;
  }

  return {
    width: newWidth,
    height: newHeight,
  };
}

export default resizeImage;
