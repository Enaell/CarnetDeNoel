export const types= ['Livre', 'Technologie', 'Cuisine', 'Vetement', 'Jeux'];

export const visibilities= ['loggedin', 'owner'];

export const familyMembers = ['Isabelle', 'Luigi', 'Eric', 'Hervé', 'Valérie', 'Thomas', 'Sylvie', 'Aurelien', 'Lulu', 'Audrey', 'Dorian', 'Fabien', 'Eva', 'Yann', 'Noah', 'Titouan', 'Peyo'];

export function renameObjectKey(keysMap: {[key: string]: string}, obj: {[key: string]: any}){
  return Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    ...{ [keysMap[key] || key]: obj[key]}
  }), {})
}

export function arrayOfInt(startAt: number, size: number) {
  let array = [];
  for(let i = startAt; i < startAt + size; i++) {
    array.push(i);
  } 
  return array
}

export function shuffleArray<T>(array:T[]) {
  let newArray = [...array];
  for(let i = newArray.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp
  }

  return newArray;
}

export function plusOrMinus(){
  return Math.random() >  0.5 ? 1 : -1;
}
