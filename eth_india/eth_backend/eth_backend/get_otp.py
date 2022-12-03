import twilio
from twilio.rest import Client
import random # generate random number
account_sid = 'AC413962c0a3affbc8a0d2e58750d6392a'
auth_token = 'a7978ebdf8cce6275f7acda64f6fd3b6'
    
def get_otp(request):
    otp = random.randint(1000,9999)
    print("Your OTP is - ",otp)
    client = Client(account_sid, auth_token)
    print("*********OTP**********","Sent to ",request["number"])
    message = client.messages.create(
            body='Hello '+request['name']+' Your Secure Device OTP is - ' + str(otp),
            from_='+15134504530',
            to='+91'+request["number"]
        )

    print(message.sid)
    return otp
