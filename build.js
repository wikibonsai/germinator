// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { defineConfig } from 'vite';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Function to copy files
// function copyFiles(src, dest) {
//   const srcDir = path.join(__dirname, src);
//   const destDir = path.join(__dirname, dest);

//   // Create destination directory if it doesn't exist
//   if (!fs.existsSync(dest)) {
//     fs.mkdirSync(dest, { recursive: true });
//   }

//   const files = fs.readdirSync(src);

//   for (const file of files) {
//     const srcFile = path.join(srcDir, file);
//     const destFile = path.join(destDir, file);
//     fs.copyFileSync(srcFile, destFile);
//     console.log(`Copied ${srcFile} to ${destFile}`);
//   }
// }

// function printDirectoryContentsAsync(directoryPath) {
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error(`Error reading directory: ${err.message}`);
//       return;
//     }

//     console.log(`Contents of ${directoryPath}:`);
//     files.forEach(file => {
//       console.log(file);
//     });
//   });
// }

// async function getBuildPath() {
//   // Import the Vite configuration
//   const viteConfig = await import('./vite.config.js');

//   // Resolve the configuration (execute the function if it's a function)
//   const resolvedConfig = (typeof viteConfig === 'function') ? defineConfig(viteConfig()) : defineConfig(viteConfig);

//   // Retrieve the build output directory
//   const outDir = resolvedConfig.build?.outDir || '.svelte-kit/output/server/entries';
//   console.log(
//     'base is: ', process.cwd(), '\n',
//     'resolvedConfig: ', resolvedConfig, '\n',
//     'resolvedConfig.build: ', resolvedConfig.build, '\n',
//     'resolvedConfig.build.outDir: ', resolvedConfig.build ? resolvedConfig.build.outDir : undefined, '\n',
//     'outDir: ', outDir, '\n',
//   );
//   // Return the relative path
//   return outDir;
//   // return path.resolve(process.cwd(), outDir);
// }

// async function main() {
//   const buildPath = await getBuildPath();
//   // copy markdown tree files
//   copyFiles('trees', path.join(buildPath, 'trees'));
//   console.log('buildPath: ', buildPath);
//   console.log(printDirectoryContentsAsync(path.join(__dirname, buildPath)));
//   // copyFiles('trees', path.join('.netlify', 'trees'));
// }

// main().catch((err) => console.error(err));
