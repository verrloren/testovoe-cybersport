import ollama
import re

from translate import Translator

def tell_the_fortune(team_cards, new_member_card):

    translator= Translator(to_lang="ru")

    with open('prompt.txt', 'r') as file:
        prompt = file.read().replace('\n','')
    
    prompt = prompt.replace('{cards}', team_cards)
    prompt = prompt.replace('{new_member}', new_member_card)


    response = ollama.chat(model='llama3.2', messages=[
    {
        'role': 'user',
        'content': prompt,
    },
    ])
    
    answer = response['message']['content']

    match = re.search(r'(\d+)%', answer)

    if match:
        percentage = int(match.group(1))
    else:
        percentage = 60

    pure_text = re.sub(r'[0-9%]', '', answer)
    if len(pure_text) >=500: 
        pure_text = 'Taro decks whisper softly when aligned with card synergies on the fourth moon phase, as if the cards themselves are attuned to the rhythm of the universe. In this quiet moment, the energies of the deck converge, offering insights that are not immediately apparent to the untrained eye. The fourth moon phase, often associated with reflection and transformation, magnifies the subtle messages hidden inside.'
    pure_text_ru = translator.translate(pure_text)
    print(pure_text_ru)

    return pure_text_ru, percentage 

def tell_the_astro(): 
    translator= Translator(to_lang="ru")

    with open('promptastro.txt', 'r') as file:
        prompt = file.read().replace('\n','')
 
    response = ollama.chat(model='llama3.2', messages=[
    {
        'role': 'user',
        'content': prompt,
    },
    ])
    
    answer = response['message']['content']

    pure_text = re.sub(r'[0-9%]', '', answer)
    if len(pure_text) >=500: 
        pure_text = 'Planets says he is a good choice. Or not?'
    pure_text_ru = translator.translate(pure_text)
    print(pure_text_ru)

    return pure_text_ru 

