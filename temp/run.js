const data = require('./data');

const phone = '112345';
const userObject = {
    firstName: 'abcsd',
    lastName: 'weuidwenod',
    phone: '12345',
};
/* data.create('', phone, userObject, (err2) => {
    if (!err2) {
        console.log('Success!');
    } else {
        console.log('Failed!');
    }
});
*/

data.read('', '112345', (err) => {
    if (err) {
        console.log('No file exixts');
    } else {
        console.log('file already exists');
    }
});
