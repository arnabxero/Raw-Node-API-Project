/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/*
 * Title: Basic Node app example
 * Description: Simple node application.
 * Author: Eftakhar Ahmed Arnob ( Iftekhar Ahmed Arnob )
 * Github: https://github.com/arnabxero
 * Facebook: https://www.facebook.com/official.arnab
 * Youtube: https://www.youtube.com/iftekhararnab
 * Date: 11/09/19
 *
 */
// Dependencies
const { first } = require('lodash');
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');

const handler = {};

handler.userHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler.users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler.users = {};

handler.users.post = (requestProperties, callback) => {
    /* console.log('Entered Here');

    console.log(requestProperties.body);

    const firstN = typeof requestProperties.body.firstName === 'string'
            && requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    console.log(firstN);

    // callback(200, requestProperties.body);
    */

    // Create new user
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean' && requestProperties.body.tosAgreement === true;

    if (firstName && lastName && phone && password && tosAgreement) {
        data.read('', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                console.log(userObject);

                data.create('', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'User was created successfully!',
                        });
                    } else {
                        callback(500, {
                            error: 'Could not create user!',
                        });
                    }
                });
            } else {
                // console.log('File Exixts');
                callback(200, {
                    message: 'Error, File Already Exists!',
                });
            }
        });
    } else {
        callback(400, {
            message: 'Request is not right!',
        });
    }
};

handler.users.get = (requestProperties, callback) => {
    callback(200);
};

handler.users.put = (requestProperties, callback) => {};

handler.users.delete = (requestProperties, callback) => {};

module.exports = handler;
