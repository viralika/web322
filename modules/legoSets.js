const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        setData.forEach(set => {
            const themeName = themeData.find(theme => theme.id === set.theme_id)?.name || "Unknown";
            sets.push({ ...set, theme: themeName });
        });
        resolve();
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets.length > 0) {
            resolve(sets);
        } else {
            reject("No sets available");
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const foundSet = sets.find(set => set.set_num === setNum);
        if (foundSet) {
            resolve(foundSet);
        } else {
            reject(`Set with number ${setNum} not found`);
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const lowercaseTheme = theme.toLowerCase();
        const matchingSets = sets.filter(set => set.theme.toLowerCase().includes(lowercaseTheme));
        if (matchingSets.length > 0) {
            resolve(matchingSets);
        } else {
            reject(`No sets found for theme ${theme}`);
        }
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };

