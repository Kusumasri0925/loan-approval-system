import pandas as pd
import shap
from sklearn.linear_model import LogisticRegression
import numpy as np
import joblib

# ================= TRAIN DATA =================
data = pd.DataFrame({
    "creditScore": [750, 600, 720, 680, 800],
    "income": [50000, 20000, 40000, 30000, 90000],
    "existingLoan": [0, 20000, 5000, 10000, 0],
    "employment": [5, 1, 3, 2, 6],
    "approved": [1, 0, 1, 0, 1]
})

X = data[["creditScore", "income", "existingLoan", "employment"]]
y = data["approved"]

# ================= MODEL =================
model = LogisticRegression()
model.fit(X, y)

# Save model
joblib.dump(model, "loan_model.pkl")

# ================= SHAP =================
explainer = shap.Explainer(model, X)

def explain(input_data):
    input_df = pd.DataFrame([input_data])
    shap_values = explainer(input_df)

    explanation = {}
    for i, col in enumerate(input_df.columns):
        explanation[col] = float(shap_values.values[0][i])

    prediction = model.predict(input_df)[0]

    return {
        "prediction": int(prediction),
        "explanation": explanation
    }

# ================= TEST =================
if __name__ == "__main__":
    sample = {
        "creditScore": 750,
        "income": 20000,
        "existingLoan": 0,
        "employment": 0
    }

    result = explain(sample)
    print(result)