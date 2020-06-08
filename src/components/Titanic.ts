
function getTitle(name: string) {
  // example of name: "Braund, Mr. Owen Harris"
  const rawTitle = name.split(' ')[1];
  // TODO: fillna?
  if (rawTitle.indexOf('Mr') !== -1) {
    return 1;
  } else if (rawTitle.indexOf('Miss') !== -1) {
    return 2;
  } else if (rawTitle.indexOf('Mrs') !== -1) {
    return 3;
  } else if (rawTitle.indexOf('Master') !== -1) {
    return 4;
  } else {
    return 5;
  }
}

/**
 * Return age bracket according to the number age input of each passenger
 * @param age
 */
function getAgeGroup(age: number) {
  if (age <= 16) {
    return 0;
  } else if (age > 16 && age <= 32) {
    return 1;
  } else if (age > 32 && age <= 48) {
    return 2;
  } else if (age > 48 && age <= 64) {
    return 3;
  } else {
    // Anything other than above condition will be group 4
    return 4;
  }
}

/**
 * @param fare - ticket price
 */
function getFare(fare:number) {
  if (fare <= 7.91) {
    return 0;
  } else if (fare > 7.91 && fare <= 14.454) {
    return 1;
  } else if (fare > 14.454 && fare <= 31) {
    return 2;
  } else {
    return 3;
  }
}

/**
 * @param embarked
 */
function getEmbarked(embarked) {
  if (embarked === 'S') {
    return 0;
  } else if (embarked === 'C') {
    return 1;
  } else if (embarked === 'Q') {
    return 2;
  } else {
    // Other than above cases, simply return 0
    return 0;
  }
}

export function preprocess(dataset) {

  const X = [];
  const y = [];
  // List of labels in a certain order. Training data must be preprocessed and appended in this order
  const labels = ['pClass', 'sex', 'title', 'age', 'parch', 'fare', 'embarked', 'NameLength', 'HasCabin', 'FamilySize', 'IsAlone'];
  for (let i = 0; i < dataset.length; i++) {
    const row = dataset[i];
    // Handling the target data; nothing to preprocess, it should be either 0 or 1
    y.push(row.Survived);

    // Handle the training data
    const newRow = [];
    // 1. pClass; leaving it as default
    newRow.push(row.Pclass);
    // 2. sex; female (0) and male (1)
    newRow.push(row.Sex === 'male' ? 1 : 0);
    // 3. title; title - Title is the second section, after the first name, of the each passanger's name. Map each title to {"Mr": 1, "Miss": 2, "Mrs": 3, "Master": 4, "Rare": 5} and Rare when the title is ['Lady', 'Countess','Capt', 'Col','Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona']
    newRow.push(getTitle(row.Name));
    // 4. age; 0 if <= 16; 1 if > 16 & <= 32; 2 if > 32 & <= 48; 3 > 48 & <= 64; 4 > 64
    newRow.push(getAgeGroup(row.Age));
    // 5. parch; leaving it as default
    newRow.push(row.Parch);
    // 6. fare; 0 if <= 7.91; 1 if > 7.91 & <= 14.454; 2 if > 14.454 & <= 31; 3 if > 31
    newRow.push(getFare(row.Fare));
    // 7. embarked; empty values as 'S' and map each value to {'S': 0, 'C': 1, 'Q': 2}
    newRow.push(getEmbarked(row.Embarked));
    // 8. NameLength; length of each passenger's name
    newRow.push(row.Name.length);
    // 9. HasCabin; if the value is type fo float then 0 otherwise 1
    newRow.push(typeof row.Cabin === 'number' ? 0 : 1);
    // 10. FamilySize; SibSp + Parch + 1
    const familySize = row.SibSp + row.Parch + 1;
    newRow.push(familySize);
    // 11. IsAlone; if familysize === 1 then 1 otherwise 0
    newRow.push(familySize === 1 ? 1 : 0);
    X.push(newRow);
  }
  return { X, y };
}

export default function preprocessYTrue(yTrue) {
  const result = [];
  for (let i = 0; i < yTrue.length; i++) {
    result.push(yTrue[i].Survived);
  }
  return result;
}
