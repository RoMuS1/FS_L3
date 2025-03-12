const fs = require('fs');
const path = require('path');

function writeToFile(filePath, data) {
  fs.writeFileSync(filePath, data, 'utf-8');
  console.log(`Данные записаны в файл ${filePath}`);
}

function readFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log(`Содержимое файла ${filePath}: \n${data}`);
    return data;
  } catch (err) {
    console.error(`Ошибка чтения файла ${filePath}:`, err);
  }
}

function overwriteFile(filePath, newData) {
  fs.writeFileSync(filePath, newData, 'utf-8');
  console.log(`Файл ${filePath} перезаписан новым содержимым`);
}

function clearFile(filePath) {
  fs.writeFileSync(filePath, '', 'utf-8');
  console.log(`Файл ${filePath} очищен`);
}

function removeNoiseFromFile(filePath) {
  let data = readFromFile(filePath);
  if (data) {
    data = data.replace(/\d+/g, '').toLowerCase();
    overwriteFile(filePath, data);
    console.log(`Удален шум из файла ${filePath}`);
  }
}

function copyFile(srcPath, destPath) {
  fs.copyFileSync(srcPath, destPath);
  console.log(`Файл ${srcPath} скопирован в ${destPath}`);
}

function createFolder(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`Папка ${folderPath} создана`);
}

function deleteFolder(folderPath) {
  fs.rmdirSync(folderPath, { recursive: true });
  console.log(`Папка ${folderPath} удалена`);
}

function listFiles(projectPath) {
  const files = [];
  function exploreDir(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        if (item !== '.git') exploreDir(fullPath); // Исключаем служебные папки
      } else {
        files.push(fullPath);
      }
    });
  }
  exploreDir(projectPath);
  console.log('Все файлы проекта:', files);
  return files;
}

function deleteAllFilesExceptService(projectPath) {
  const files = listFiles(projectPath);
  files.forEach(file => {
    if (!file.includes('.git')) {
      fs.rmSync(file, { recursive: true, force: true });
      console.log(`Удален файл/папка: ${file}`);
    }
  });
}

module.exports = { 
  writeToFile, 
  readFromFile, 
  overwriteFile, 
  clearFile, 
  removeNoiseFromFile, 
  copyFile, 
  createFolder, 
  deleteFolder, 
  listFiles, 
  deleteAllFilesExceptService 
};
