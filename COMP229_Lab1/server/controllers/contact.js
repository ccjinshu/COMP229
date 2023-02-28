/**
 File name: app.js
 Course name: COMP229 Web application development
 Assignment: 2#
 Student Name: Jin Shu
 Student ID: 301303882
 Date: 2023-02-26
 **/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema )
let Contact = require("../model/contact");
const Book = require("../model/books");

//display contact list
module.exports.displayContactList = (req, res, next) => {
    //An alphabetically sorted list of contacts
    //find all contacts in the contacts collection and sort them alphabetically
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        } else {
            //console.log(contactList);
            //render contact.ejs and pass title and Contactlist . and sort them alphabetically
            res.render("contact/list", {
                title: "Business Contacts",
                ContactList: contactList,
                displayName: req.user ? req.user.displayName : ''
            }); //render contact.ejs and pass title and Contactlist
             }
    }).sort({name: 1}); //sort
};

module.exports.addPage = (req, res, next) => {
    res.render("contact/add", {
        title: "Add Contact",
        displayName: req.user ? req.user.displayName : "",
    });  //render add.ejs and pass title
};

module.exports.addProcessPage = (req, res, next) => {
    let newContact = Contact({
        name: req.body.name, number: req.body.number, email: req.body.email,
    });
    Contact.create(newContact, (err, Contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/contactList"); //redirect to contact list
        }
    });
};

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contacttoedit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show  edit page
            res.render("contact/edit",
                {
                    title: "Edit Contact",
                    contact: contacttoedit,
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    });
};

module.exports.processingEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateContact = Contact({
        _id: id, name: req.body.name, number: req.body.number, email: req.body.email,
    });
    Contact.updateOne({_id: id}, updateContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/contactList"); //redirect to contact list
        }
    });
};

module.exports.deletePage = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/contactList"); //redirect to contact list
        }
    });
};
