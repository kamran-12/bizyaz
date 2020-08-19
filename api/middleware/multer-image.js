const Multer = require('multer')
const my_random = require('../util/random')
const path = require('path');
const crypto = require("crypto")
const { Storage } = require('@google-cloud/storage');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (r, f, c) => c(null, 'image/png image/jpg image/jpeg image/webp'.split(' ').includes(f.mimetype))
}).single('image');

const storage = new Storage({
    keyFilename: path.join(__dirname, "../credentials.json"),
    projectId: 'bizyaz'
});

// storage.getBuckets().then(x => console.log(x))

const bucket = storage.bucket('bizyaz');

const googleFileSaver = file => {
    return new Promise((resolve, reject) => {
        const blob = bucket.file(my_random.fileName(file.originalname));
        const blobStream = blob.createWriteStream();
        blobStream.on('error', (err) => {
            reject(err);
        });
        blobStream.on('finish', () => {
            file.path = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            resolve();
        });
        blobStream.end(file.buffer);
    })
};

const googleFileDeleter = source => {
    return new Promise((resolve, reject) => {
        if (source.startsWith('https://storage.googleapis.com/')) {
            while (source.endsWith('/')) {
                source = source.substring(0, source.length - 1)
            }
            let filename = source.substring(source.lastIndexOf('/') + 1)
            bucket.file(filename).delete().then(success => {
                resolve(success);
            }).catch(error => {
                reject(error);
            });
        }
    })
}

module.exports = { multer, googleFileSaver, googleFileDeleter }