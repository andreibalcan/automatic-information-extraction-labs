const corpusDatabase = require("./database/corpus.js");
const corpusController = require("./controllers/corpus.js");

corpusController.importDocuments(10);
console.log("Documents imported successfully!");

// console.log("Test 1: Loading all reviews...");
// const allReviews = corpusDatabase.getCorpus('happy');
// console.log(allReviews.slice(0, 100));

// console.log("\nTest 2: Get positive reviews...");
// const positiveReviews = corpusDatabase.getPositiveReviewsOriginalSet();
// console.log(positiveReviews);

// console.log("\nTest 3: Get negative reviews...");
// const negativeReviews = corpusDatabase.getNegativeReviewsOriginalSet();
// console.log(negativeReviews);

// console.log("\nTest 4: Insert reviews into corpus...");
// corpusDatabase.insertCorpus([
//   { id_hotel_reviews: 1, review: "Good!", score: 5, label: "happy" },
//   { id_hotel_reviews: 2, review: "Terrible", score: 1, label: "not happy" }
// ]);
// console.log("Data successfully written into corpus.json");

// const positiveReviews = corpusDatabase.getPositiveReviewsOriginalSet(5);
// const negativeReviews = corpusDatabase.getNegativeReviewsOriginalSet(5);
// // Combinar os dados
// const reviewsToInsert = [...positiveReviews, ...negativeReviews];
// // Inserir no corpus
// corpusDatabase.insertCorpus(reviewsToInsert);

// const { cleanText } = require('./classification/clean.js');
// const testText = "Este é um ótimo hotel!!! Ótima localização. :)";
// console.log("Texto original:", testText);
// console.log("Texto limpo:", cleanText(testText));

// const { removeGeneralStopwords, removeCustomStopwords } = require('./classification/stopword.js');
// const testText = "Este é um ótimo hotel com uma ótima localização";
// console.log("Sem stopwords gerais:", removeGeneralStopwords(testText));
// console.log("Sem stopwords personalizadas:", removeCustomStopwords(testText, ["ótimo"]));

// const { tokenizeText } = require('./classification/tokenization.js');
// const testText = "Este hotel é incrível";
// console.log("Unigramas:", tokenizeText(testText, 1));
// console.log("Bigramas:", tokenizeText(testText, 2));

// const { trainModel } = require('./classification/train.js');
// console.log("Training model...");
// const model = trainModel(["positive", "negative"], [1, 2]);
// console.log("Trained model:", JSON.stringify(model, null, 2));

const fs = require("fs");
const { trainModel } = require("./classification/train.js");
console.log("Training model...");
const model = trainModel(["positive", "negative"], [1, 2]);
fs.writeFileSync("output_model.json", JSON.stringify(model, null, 2));
console.log("Trained model saved into output_model.json");

//BROWSER TEST:
//http://localhost:3000/corpus/positive
//http://localhost:3000/corpus/negative
//http://localhost:3000/corpus/document/10512
//http://localhost:3000/trainingset
//http://localhost:3000/trainingset/positive
//http://localhost:3000/trainingset/negative
