from kerykeion import AstrologicalSubject, SynastryAspects
from datetime import datetime



def return_astrological_data(name, dateOfBirth, city, country): 

    subject = AstrologicalSubject(name, dateOfBirth.year, dateOfBirth.month, dateOfBirth.day, dateOfBirth.hour, dateOfBirth.minute, city, country) 

    data = {
    "planets":{

        "Pluto":[subject.pluto.abs_pos], 
        "Neptune":[subject.neptune.abs_pos], 
        "Uranus":[subject.uranus.abs_pos], 
        "Saturn":[subject.saturn.abs_pos], 
        "Jupiter":[subject.jupiter.abs_pos], 
        "Mars":[subject.mars.abs_pos], 
        "Moon":[subject.moon.abs_pos], 
        "Sun":[subject.sun.abs_pos],
        "Mercury":[subject.mercury.abs_pos], 
        "Venus":[subject.venus.abs_pos]},

    "cusps":[subject.first_house.abs_pos, 
            subject.second_house.abs_pos,
            subject.third_house.abs_pos,
            subject.fourth_house.abs_pos,
            subject.fifth_house.abs_pos,
            subject.sixth_house.abs_pos,
            subject.seventh_house.abs_pos,
            subject.eighth_house.abs_pos,
            subject.ninth_house.abs_pos,
            subject.tenth_house.abs_pos,
            subject.eleventh_house.abs_pos,
            subject.twelfth_house.abs_pos] }

    return data  

def compare_two_subjects(dateOfBirth1, city1, country1, dateOfBirth2, city2, country2):


    subject1 = AstrologicalSubject('subject1', dateOfBirth1.year, dateOfBirth1.month, dateOfBirth1.day, dateOfBirth1.hour, dateOfBirth1.minute, city1, country1) 
        
    subject2 = AstrologicalSubject('subject2', dateOfBirth2.year, dateOfBirth2.month, dateOfBirth2.day, dateOfBirth2.hour, dateOfBirth2.minute, city2, country2) 

    aspects = SynastryAspects(subject1, subject2).relevant_aspects
    
    good_or_bad = []

    for aspect in aspects:
        good_or_bad.append(aspect.aspect)

    mask = {'trine': 'good', 'opposition': 'bad', 'conjunction': 'good', 'sextile':'good','square':'bad', 'quintile': 'good'}
    
    good_or_bad = [mask.get(item, item) for item in good_or_bad]

    ratios = {item: good_or_bad.count(item) / len(good_or_bad) for item in set(good_or_bad)}

    return ratios['good']

def team_prediction(teamDates, teamCities, teamCountries, interDate, interCity, interCountry):
    result_of_predictions = []
    for date, city, country in zip(teamDates, teamCities, teamCountries):
        result_of_predictions.append(compare_two_subjects(interDate, interCity, interCountry, date, city, country))

    average = sum(result_of_predictions)/len(result_of_predictions)

    
    return average

    


