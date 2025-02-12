import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDirectory = path.join(__dirname, "public/imagecollection");
const outputFilePath = path.join(__dirname, "public/imageList.json");

fs.readdir(imageDirectory, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const imageFiles = files.filter(file => path.extname(file).toLowerCase() === ".jpg");

  fs.writeFileSync(outputFilePath, JSON.stringify(imageFiles, null, 2));
  console.log("Image list saved to imageList.json");
});


// now write a md file for git hub how to use this app step by step process
// 1. put all the images in public/imagecollection folder
// 2.put source image in public/myimage folder with the file name myphoto.png 
// 3.run the project by typing npm run dev in teterminal
// 4.open http://localhost:5173/ in browser..
// you can see source image is loaded in the left and iamge collection will take a while to load.showing a counter how many image is loading..
// 5.after loading all images it wqill start matching and a counter will be shown how many image are tested.. 
// 6.if matchin images are found it will list down the images with their file name
// 7.then user can manually find take their image using the file name