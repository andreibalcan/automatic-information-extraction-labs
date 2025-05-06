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

//const fs = require("fs");
//const { trainModel } = require("./classification/train.js");
//console.log("Training model...");
//const model = trainModel(["positive", "negative"], [1, 2]);
//fs.writeFileSync("output_model.json", JSON.stringify(model, null, 2));
//console.log("Trained model saved into output_model.json");

// addUniqueTerms
//const { addUniqueTerms } = require("./classification/bagOfWords.js");
//const vocab = ["best", "time", "worst"];
//const docTerms = ["ag", "best", "wisdom"];
//const updatedVocab = addUniqueTerms(vocab, docTerms);
//console.log(updatedVocab);

// Train model using unigrams and bigrams Lab 4, ex 2 and 3:
//const { trainModel } = require("./classification/train.js");
//const { classVocabularies } = trainModel(["positive", "negative"], [1, 2]);
//console.log("Positive class unigrams:", classVocabularies["positive"].unigrams);
//console.log("Positive class bigrams:", classVocabularies["positive"].bigrams);
//console.log("Negative class unigrams:", classVocabularies["negative"].unigrams);
//console.log("Negative class bigrams:", classVocabularies["negative"].bigrams);
//console.log(
//	"Total positive unigrams:",
//	classVocabularies["positive"].unigrams.length
//);
//console.log(
//	"Total positive bigrams:",
//	classVocabularies["positive"].bigrams.length
//);
//console.log(
//	"Total negative unigrams:",
//	classVocabularies["negative"].unigrams.length
//);
//console.log(
//	"Total negative bigrams:",
//	classVocabularies["negative"].bigrams.length
//);

// binaryVector, Lab 4, ex. 4
//const { binaryVector } = require("./classification/bagOfWords.js");
//const bow = ["excelente", "hotel", "bom", "localização"];
//const doc1 = ["hotel", "bom", "serviço"];
//const doc2 = ["excelente", "localização", "quartos"];
//console.log("Binary vector for doc1:", binaryVector(bow, doc1)); // Esperado: [0, 1, 1, 0]
//console.log("Binary vector for doc2:", binaryVector(bow, doc2)); // Esperado: [1, 0, 0, 1]

// numberOfOccurrencesVector, Lab 4, ex. 5
//const { numberOfOccurrencesVector } = require("./classification/bagOfWords.js");
//const bowNr = ["ótimo", "hotel", "localização"];
//const docTermsNr = ["hotel", "ótimo", "hotel", "quartos", "ótimo", "ótimo"];
//console.log(
//	"Occurrences vector:",
//	numberOfOccurrencesVector(bowNr, docTermsNr)
//);

// tfVector Lab 4, ex. 6
//const { tfVector } = require("./classification/bagOfWords.js");
//const bowTf = ["ótimo", "hotel", "localização"];
//const docTermsTf = ["hotel", "ótimo", "hotel", "quartos", "ótimo", "ótimo"];
//console.log("TF vector:", tfVector(bowTf, docTermsTf));

// idfVector Lab 4, ex. 7
//const { idfVector } = require("./classification/bagOfWords");
//const bowIdf = ["ótimo", "hotel", "localização"];
//const docTermsIdf = [
//	["hotel", "ótimo", "quartos"],
//	["localização", "ótimo"],
//	["hotel", "ótimo", "ótimo"],
//];
//console.log("IDF vector:", idfVector(bowIdf, docTermsIdf));

// tfidfVector Lab 4, ex.8
// const { tfidfVector } = require('./classification/bagOfWords');
// const tfArray = [
//     { term: 'ótimo', tf: 0.3 },
//     { term: 'hotel', tf: 0.5 },
//     { term: 'localização', tf: 0.2 }
// ];
// const idfArray = [1.2, 0.8, 1.5];
// console.log("TF-IDF vector:", tfidfVector(tfArray, idfArray));

// sumVector Lab 5, ex.1
const { sumVector } = require("./classification/bagOfWords");
const terms = [
	{ name: "hotel", freq: 1, tf: 0.2, idf: 0.176, tfidf: 0.0352 },
	{ name: "hotel", freq: 2, tf: 0.3, idf: 0.176, tfidf: 0.0528 },
];
console.log(sumVector(terms));
// avgVector Lab 5, ex.2
const { avgVector } = require("./classification/bagOfWords");
console.log(avgVector(terms));

//BROWSER TEST:
//run in terminal: node ./bin/www
//http://localhost:3000/corpus/positive
//http://localhost:3000/corpus/negative
//http://localhost:3000/corpus/document/10512
//http://localhost:3000/trainingset
//http://localhost:3000/trainingset/positive
//http://localhost:3000/trainingset/negative
// Lab 4 and Lab 5: http://localhost:3000/train
