/** Utlity function to remove punctuation (don't want to penalize user for not putting a comma/period)
 * Removes punctuation marks: .,!?:;'"
 * Removes special characters: @#$%^&*()[]{}<>/|\~
 * Removes underscores
 * WIP: Remove em dash (For the North American challenge, if you remove the -, it doesn't register)
 */
export function removePunctuation(word) {
  return word.replace(/[^\w\s]|_/g, "");
}
