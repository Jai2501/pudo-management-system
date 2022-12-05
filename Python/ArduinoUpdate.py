import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import time

# INIT
cred = credentials.Certificate("pudo-ridehailing-ms-firebase-adminsdk-72349-c9452f50cd.json")
default_app = firebase_admin.initialize_app(cred, {
	'databaseURL':"https://pudo-ridehailing-ms-default-rtdb.firebaseio.com"
	})
ref = db.reference("/")

# Berth that has been setup with Arduino
berthToUpdate = "berth-a-1"
newBerthCarNumber = "SGJ 2501 L"

def updateBerthCarNumber():
    # ref.child("berth-live-info").update({
    #     berthToUpdate: newBerthCarNumber
    # })

    ref.child("arduino").update({
        'ldr-value': 748746583768,
        'car-present': False
    })

    # print(ref.get()['berth-live-info']['berth-a-2'])

def readArduinoData():
    pass

def readCarPlate():
    return None

def run():
    print("Started...")
    while True:
        print("Running...")
        updateBerthCarNumber()

        newBerthCarNumber = readCarPlate()

        if not (newBerthCarNumber == None) :
            updateBerthCarNumber()
        
        time.sleep(1)

run()