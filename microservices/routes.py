from flask import render_template, request, jsonify

from models import Interviewee, Member, Result, TaroCard
from datetime import date
from llama_vanga import tell_the_fortune
from astrology import return_astrological_data, team_prediction
from functools import wraps
import time

from llama_vanga import tell_the_astro
SECRET_API_KEY = 'gn94bgy3ruodcmknf3ob2ieposqld'

def check_api_key(func):
    @wraps(func)  # Используем @wraps для сохранения имени и метаданных функции
    def wrapper(*args, **kwargs):
        # Получаем API ключ из заголовков
        api_key = request.headers.get('API-Key')
        
        if api_key != SECRET_API_KEY:
            # Возвращаем ошибку, если ключ не совпадает
            return jsonify({"error": "Unauthorized"}), 401
        
        return func(*args, **kwargs)
    return wrapper


def register_routes(app, db):

    @app.route('/', methods=['GET'])
    def test():
        for i in range(1, 22):
        
            card = TaroCard.query.filter(TaroCard.id == f'{i}')[0]

            card.meaning = 'Это смысл карты. Он очень глубокий, очень интересный, очень загадочный и необычный' 
            card.strength = 'Это сила карты. Очень сильная, поражающая, униичтожающая'
            card.weakness = 'Это слабость карты. Хилая, никчемная'
        
            time.sleep(0.5)

            db.session.commit()
            

            return jsonify({"suc": "ccess"})


    @app.route('/astrological_position', methods = ['POST'])
    @check_api_key
    def astrological_position():

        time.sleep(2)

        if not request.is_json: 
            return 'Wrong data format'

        data = request.get_json()

        inter_id = data.get('id')
        inter = Interviewee.query.filter(Interviewee.id == inter_id)[0]
        

        positions = return_astrological_data(

                                             inter.name,
                                             inter.dateOfBirth,
                                             inter.cityOfBirth,
                                             inter.countryOfBirth,

                                             )
        return jsonify(positions)

    
    @app.route('/new_member/predict/astro', methods = ['POST'])
    @check_api_key
    def predict_astro():

        if not request.is_json: 
            return 'Wrong data format'

        data = request.get_json()

        if 'teamId' not in data or 'id' not in data: 
            return 'Wrong post request'

        team_id = data.get('teamId')
        team_members = Member.query.filter(Member.teamId == team_id)

        team_dates = [member.dateOfBirth for member in team_members if member.dateOfBirth]
        team_cities = [member.cityOfBirth for member in team_members if member.cityOfBirth]
        team_countries = [member.countryOfBirth for member in team_members if member.countryOfBirth]

        new_member_id = data.get('id')
        
        new_member = Interviewee.query.filter(Interviewee.id == new_member_id)[0]

        prediction = team_prediction(team_dates, team_cities, team_countries, new_member.dateOfBirth, new_member.cityOfBirth, new_member.countryOfBirth)

        #qry = Result.query.filter(Result.intervieweeId == new_member_id, Result.teamId == team_id).first()

        #if qry:
        #    qry.compatibilityAstroDescription = 'Based on Stars, Moon, Planets, Houses(you are gay)'
        #    qry.compatibilityAstroPercent = prediction
        #else:
       
        description = tell_the_astro()

        result = Result(
                        date=date.today(),
                        teamId=team_id,
                        intervieweeId=new_member_id,
                        compatibilityTaroPercent=None,
                        compatibilityTaroDescription=None,
                        compatibilityAstroPercent=prediction,
                        compatibilityAstroDescription=description,
                        cardId=new_member.taroCardId,

                        )
        db.session.add(result)

        db.session.commit()
 
        return jsonify({"description": description, "prediction": prediction})




    @app.route('/new_member/predict/taro', methods = ['POST'])
    @check_api_key
    #IN: new_member_id; new_member card; team_name
    #OUT: text_from_llama; prediction
    def predict_taro():
        try:
            if not request.is_json: 
                return 'Wrong data format'

            data = request.get_json()

            if 'teamId' not in data or 'id' not in data: 
                return 'Wrong post request'

            team_id = data.get('teamId')
            team_members = Member.query.filter(Member.teamId == team_id)
            team_cards = [member.taroCard.name for member in team_members]
            team_cards = ', '.join(team_cards)

            new_member_id = data.get('id')
            
            new_member = Interviewee.query.filter(Interviewee.id == new_member_id)[0]

            answer, percentage = tell_the_fortune(team_cards, new_member.taroCard.name)
            
            #qry = Result.query.filter(Result.intervieweeId == new_member_id, Result.teamId == team_id).first()

            #if qry:
            #    qry.compatibilityTaroDescription = answer
            #    qry.compatibilityTaroPercent = percentage     
            #else:
            result = Result(
                            date=date.today(),
                            teamId=team_id,
                            intervieweeId=new_member_id,
                            compatibilityTaroPercent=percentage,
                            compatibilityTaroDescription=answer,
                            compatibilityAstroPercent=None,
                            compatibilityAstroDescription=None,
                            cardId=new_member.taroCardId,

                            )
            db.session.add(result)

            db.session.commit()

        except Exception as e:
            print(f'{e}')
            return jsonify({'answer': 'This dude is fine', 'percentage':80})

        return jsonify({'answer': answer, 'percentage':percentage})



