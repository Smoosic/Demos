# Changes
12-31-2025

Happy new year!

The demo files weren't working for most people, they should be now.  Some of the exports from Smoosic were broken.  Please open
an issue if the instructions below don't work for you.  If you tried before, please `npm update` and try again.

# Demos
Demo and test HTML that use Smoosic.

The demo project here should be the same as the demo project in the main Smoosic repository, which is also here:

https://smoosic.github.io/Smoosic/release/html/smoosic.html

Other demos include:

* asyncDemo - shows how to update a score in real-time
* demoMenuDialog - shows how to create customized menus and dialogs  (look under 'Notes' in the right menu)
* fileConversionDemo - shows off the different formats that Smoosic supports
* loadFileDemo - loads a file in Smoosic format and renders it
* loadXml - loads a file in MusicXml format
* syncDemo - renders a score synchronously

## Using Demos
You should only need git and npm installed.  Using the demos should be as simple as:

```
git clone https://github.com/Smoosic/Demos.git
``` 

Go into the Demos directory.

```
npm install
npm run build
npm run server
```

Then open the test files in your browser:

```
http://localhost:3001/test/demo.html

http://localhost:3001/test/syncDemo.html

http://localhost:3001/test/asyncDemo.html
```
etc.

**Note:**

You _can_ open the files by clicking on the .html directly, but it won't work as well.  
You will get lots of console error messages from the sound library, and we won't be able to 
store the sound files as blobs.  But it will fall back to the functionality it can use.




