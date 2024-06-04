getDef();

async function getWord() {
  let myObject = await fetch("https://random-word-api.herokuapp.com/word");
  let myText = await myObject.text();
  let myWord = myText.slice(2, -2);
  document.getElementById("word").innerHTML = myWord;
  return myWord;  
}



async function getDef() {
  let word;
  let response;
  let defUrl;

  while (true) {
    try {
      word = await getWord();
      //alert(word);
      defUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
      //alert(defUrl);

      response = await fetch(defUrl);

      if (response.ok) {
        break; // Exit the loop if the response is 200
      } else if (response.status === 404) {
        //alert(word + ' not found, trying again...');
        // Loop will continue to get a new word
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  try {
    const data = await response.json();
    const meaningsDiv = document.getElementById("meanings");
    meaningsDiv.innerHTML = ''; // Clear previous content

    data.forEach(entry => {
    if (entry.phonetics.length > 0) {
          entry.phonetics.forEach(phonetic => {
            if (phonetic.text) {
              const phoneticPara = document.createElement("p");
              phoneticPara.classList.add("phoneticPara");
              phoneticPara.textContent = phonetic.text;
              meaningsDiv.appendChild(phoneticPara);
            }
          });
        }
      entry.meanings.forEach(meaning => {
        const meaningContainer = document.createElement("div");
        meaningContainer.classList.add("meaningContainer");

        const partOfSpeech = document.createElement("h3");
        partOfSpeech.classList.add("partOfSpeech");
        partOfSpeech.textContent = meaning.partOfSpeech;
        meaningContainer.appendChild(partOfSpeech);

        meaning.definitions.forEach(definition => {
          const definitionPara = document.createElement("p");
          definitionPara.classList.add("definitionPara");
          definitionPara.textContent = definition.definition;
          meaningContainer.appendChild(definitionPara);

          if (definition.synonyms.length > 0) {
            const synonymsPara = document.createElement("p");
            synonymsPara.classList.add("synonymsPara");
            synonymsPara.textContent = "Synonyms: " + definition.synonyms.join(", ");
            meaningContainer.appendChild(synonymsPara);
          }

          if (definition.antonyms.length > 0) {
            const antonymsPara = document.createElement("p");
            antonymsPara.classList.add("antonymsPara");
            antonymsPara.textContent = "Antonyms: " + definition.antonyms.join(", ");
            meaningContainer.appendChild(antonymsPara);
          }
        });

        

        meaningsDiv.appendChild(meaningContainer);
      });
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
}