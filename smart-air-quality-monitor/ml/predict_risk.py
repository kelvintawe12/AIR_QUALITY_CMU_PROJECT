import sys
import pandas as pd
import joblib

if len(sys.argv) != 5:
    print("Unknown Risk")
    sys.exit(1)

try:
    mq135 = float(sys.argv[1])
    mq7 = float(sys.argv[2])
    temp = float(sys.argv[3])
    hum = float(sys.argv[4])

    model = joblib.load('air_quality_health_risk_model.pkl')
    input_data = pd.DataFrame([[mq135, mq7, temp, hum]],
                              columns=['MQ135', 'MQ7', 'Temperature', 'Humidity'])
    risk = model.predict(input_data)[0]
    print(risk)
except:
    print("Unknown Risk")
