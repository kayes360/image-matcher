# Image Matcher

This app helps you match a source image with images from a collection, it will help you to get the imagefile name from a bulk image list

## Steps to Use the App

1. **Prepare Your Images:**
   - Put all the images that you want to compare in the `public/imagecollection` folder.
   - Put the source image in the `public/myimage` folder and name it `myphoto.png`.

2. **Run the Project:**
   - Open your terminal and navigate to the project directory.
   - Run the following command to start the development server:
     ```bash
     npm run dev
     ```

3. **Open the App in Browser:**
   - After the server starts, open your browser and go to:
     ```
     http://localhost:5173/
     ```
   - You should see the source image loaded on the left side and the image collection loading on the right side.

4. **Image Collection Loading:**
   - The image collection will take some time to load, and you will see a counter showing how many images are being loaded.

5. **Matching Process:**
   - After all images are loaded, the app will begin matching the images from the collection with the source image. 
   - A counter will show how many images have been tested.

6. **Results:**
   - If any matching images are found, they will be listed with their file names.
 
## Demo
https://github.com/user-attachments/assets/fffb3bd8-65fa-42ef-81ee-4c283c3eae1e
