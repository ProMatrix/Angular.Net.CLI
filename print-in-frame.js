// In print-in-frame.js

const printInFrame = (size, header) => {
    console.log('*'.repeat(size));
    console.log(header);
    console.log('*'.repeat(size));
};

if (require.main === module) {
    printInFrame(process.argv[2], process.argv[3]);
} else {
    module.exports = printInFrame;
}