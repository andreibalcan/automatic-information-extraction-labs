const corpusDatabase = require("./database/corpus.js");
const corpusController = require("./controllers/corpus.js");

// corpusController.importDocuments(10);
// console.log("Documents imported successfully!");

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
// const { sumVector } = require("./classification/bagOfWords");
// const terms = [
// 	{ name: "hotel", freq: 1, tf: 0.2, idf: 0.176, tfidf: 0.0352 },
// 	{ name: "hotel", freq: 2, tf: 0.3, idf: 0.176, tfidf: 0.0528 },
// ];
// console.log(sumVector(terms));
// avgVector Lab 5, ex.2
// const { avgVector } = require("./classification/bagOfWords");
// console.log(avgVector(terms));

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// Lab 6 ex 1
// const { getTfIdfVectorsFromClass } = require("./classification/train.js");
// console.log(JSON.stringify(getTfIdfVectorsFromClass("positive", 1)));

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// Lab 6 ex 3 & 4
// const fs = require("fs");
// const path = require("path");
// const { cosineSimilarity } = require("./classification/classifier");
// const { getTfIdfVectorsFromClass } = require("./classification/train");
// const allReviews = JSON.parse(
// 	fs.readFileSync(path.join(__dirname, "database/hotelreviews.json"), "utf-8")
// );
// const skipTrain = 100;
// const testPositives = allReviews
// 	.filter((r) => r.label === "positive")
// 	.slice(skipTrain, skipTrain + 50);
// const testNegatives = allReviews
// 	.filter((r) => r.label === "negative")
// 	.slice(skipTrain, skipTrain + 50);
// const testSet = [...testPositives, ...testNegatives];
// const vectors = [
// 	getTfIdfVectorsFromClass("positive")[0],
// 	getTfIdfVectorsFromClass("negative")[0],
// ];
// testSet.forEach((review, i) => {
// 	const result = cosineSimilarity(review.description, vectors);
// 	console.log(
// 		`${i + 1}. TRUE: ${review.label} | PREDICTED: ${result.class} | SIM: ${result.similarity.toFixed(4)}`
// 	);
// });

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// //  Lab 7, Ex.1 c)
// // STEPS:
// // 1. Change database/trainingset.js getPositiveReviewsOriginalSet and getNegativeReviewsOriginalSet value to 10.
// // 2. Delete what's inside train-lab-5.json
// // 3. Delede what's inside corpus.json (leave only [] empty array, if not an error occurs);
// const { trainModel } = require("./classification/train.js");
// console.log("Training model...");
// trainModel(["positive", "negative"], [1, 2]);
// console.log("Training finished!");

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// // Lab 7, Ex.2
// const { probabilisticClassification } = require("./classification/classifier");
// const result = probabilisticClassification("Having stayed at many Hilton properties, I expect a friendly efficient service from what is considered a good brand. This property was a let down. Initially, things went smoothly. Check-in was fine, as a HHonors Gold member I was informed with an apology that they did not have an Executive Floor to upgrade me to, but put me in a - bedroom suite and offered me a complimentary buffet breakfast and the usual wifi vouchers. This is where the good things ended. The room had issues. Initially, the phone in the living room did not work. They sent someone up to fix the phone, and then some --- hours later it just started randomly producing high pitched beeps (which in turn woke me up). In addition, the guest compendium was empty (as in someone had removed the pages). It took - phone calls and - people to come up to my room to actually understand what I was requesting, and deliver a full compendium I also had cause to contact and visit the front desk at various stages later in the evening during my stay. To say the night staff were next to useless would be an over-statement. The night manager basically said nothing to my requests, or as little as possible. They treated me like I was putting them out of their way and disrupting them being lazy. One particular staff member was so bad I wrote a separate complaint to Hilton about them. I also witnessed a lady in obvious distress attempting to get a room late one evening. When they informed her she was not able to get a room without photo ID she became upset and aggravated. She ranted a little bit about 'if I get murdered tonight, it'll be on your conscious' to which the night manager replied That's ok Ma'am, I have no consciou I've never seen such rude staff. Would I stay there again? Definitely not by choice");
// // const result = probabilisticClassification("Steps off Times Square, nice rooms, stayed - nights, great for a short visit");

// console.log(result); // { class: 'positive' or 'negative', probability: ... }

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// Lab 8, Ex. 1
// Must have train-lab-4-5.json filled. Run Lab  Lab 7, Ex.1 c) exercices first to do that.
const { confusionMatrix, precision, recall, fMeasure } = require('./classification/stats');
const { probabilisticClassification } = require("./classification/classifier");
const predicted = probabilisticClassification("Steps off Times Square, nice rooms, stayed - nights, great for a short visit").class;
const preticted2 = probabilisticClassification("Having stayed at many Hilton properties, I expect a friendly efficient service from what is considered a good brand. This property was a let down. Initially, things went smoothly. Check-in was fine, as a HHonors Gold member I was informed with an apology that they did not have an Executive Floor to upgrade me to, but put me in a - bedroom suite and offered me a complimentary buffet breakfast and the usual wifi vouchers. This is where the good things ended. The room had issues. Initially, the phone in the living room did not work. They sent someone up to fix the phone, and then some --- hours later it just started randomly producing high pitched beeps (which in turn woke me up). In addition, the guest compendium was empty (as in someone had removed the pages). It took - phone calls and - people to come up to my room to actually understand what I was requesting, and deliver a full compendium I also had cause to contact and visit the front desk at various stages later in the evening during my stay. To say the night staff were next to useless would be an over-statement. The night manager basically said nothing to my requests, or as little as possible. They treated me like I was putting them out of their way and disrupting them being lazy. One particular staff member was so bad I wrote a separate complaint to Hilton about them. I also witnessed a lady in obvious distress attempting to get a room late one evening. When they informed her she was not able to get a room without photo ID she became upset and aggravated. She ranted a little bit about 'if I get murdered tonight, it'll be on your conscious' to which the night manager replied That's ok Ma'am, I have no consciou I've never seen such rude staff. Would I stay there again? Definitely not by choice").class;

const data = [
    { predictedClass: predicted, realClass: "positive" },
    { predictedClass: preticted2, realClass: "negative" },
];

// const data = [
//     { predictedClass: 'Cat', realClass: 'Cat' },
//     { predictedClass: 'Cat', realClass: 'Cat' },
//     { predictedClass: 'Cat', realClass: 'Dog' },
//     { predictedClass: 'Cat', realClass: 'Bird' },

//     { predictedClass: 'Dog', realClass: 'Dog' },
//     { predictedClass: 'Dog', realClass: 'Dog' },
//     { predictedClass: 'Dog', realClass: 'Cat' },
//     { predictedClass: 'Dog', realClass: 'Bird' },

//     { predictedClass: 'Bird', realClass: 'Bird' },
//     { predictedClass: 'Bird', realClass: 'Cat' }
// ];

// Ex 1. a)
const matrix  = confusionMatrix(data);
console.log('Matriz:', matrix.matrix);
console.log('Classes:', matrix.classes);

// Ex 1. b)
const precisions = precision(matrix);
console.log('Precision:', precisions);

// Ex 1. c)
const recalls = recall(matrix);
console.log('Recall:', recalls);

// Ex 1. d)
const fMeasures = fMeasure(matrix);
console.log('F1-score:', fMeasures);

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

//BROWSER TEST:
//run in terminal: node ./bin/www
//http://localhost:3000/corpus/positive
//http://localhost:3000/corpus/negative
//http://localhost:3000/corpus/document/10512
//http://localhost:3000/trainingset
//http://localhost:3000/trainingset/positive
//http://localhost:3000/trainingset/negative
// Lab 4 and Lab 5: http://localhost:3000/train
// Lab 6 Ex 2: http://localhost:3000/api/classVectors/positive or http://localhost:3000/api/classVectors/negative