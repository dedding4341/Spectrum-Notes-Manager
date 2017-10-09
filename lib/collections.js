import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert' (text) {
        check(text, String);

        //Check if user is logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error("Not Authorized");
        }

        //Insert into Notes Collection
        Notes.insert({text: text, createdAt: new Date(),
            owner: Meteor.userId(), username: Meteor.user().username});
    },

    'notes.remove' (note) {
        check(note._id, String);

        if (note.owner !== Meteor.userId()) {
            throw new Meteor.Error("Not Authorized");
        }

        Notes.remove(note._id);
    }
})