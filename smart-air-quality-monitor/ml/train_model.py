import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

def generate_synthetic_data(n_samples=5000):
    np.random.seed(42)
    mq135 = np.random.randint(100, 900, n_samples)
    mq7 = np.random.randint(50, 650, n_samples)
    temp = np.random.uniform(15, 35, n_samples)
    hum = np.random.uniform(30, 80, n_samples)

    labels = []
    for i in range(n_samples):
        if mq7[i] > 450:
            labels.append("CO Poisoning Risk")
        elif mq135[i] > 650 and temp[i] > 28 and hum[i] < 45:
            labels.append("Asthma Risk")
        elif mq135[i] > 500 or mq7[i] > 300:
            labels.append("High Risk")
        elif mq135[i] > 300 or mq7[i] > 150:
            labels.append("Moderate Risk")
        else:
            labels.append("Safe")

    return pd.DataFrame({
        'MQ135': mq135,
        'MQ7': mq7,
        'Temperature': temp,
        'Humidity': hum,
        'Risk': labels
    })

print("Training ML Model...")
data = generate_synthetic_data()
X = data[['MQ135', 'MQ7', 'Temperature', 'Humidity']]
y = data['Risk']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

print(f"Model Accuracy: {accuracy_score(y_test, model.predict(X_test)):.2%}")
joblib.dump(model, 'air_quality_health_risk_model.pkl')
print("✅ Model saved successfully!")