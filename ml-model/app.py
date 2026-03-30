from flask import Flask, request, jsonify
import joblib
import shap
import pandas as pd

app = Flask(__name__)

# Load model
model = joblib.load("loan_model.pkl")

# Background data (for SHAP)
background = pd.DataFrame({
    "creditScore": [750, 600, 720, 680, 800],
    "income": [50000, 20000, 40000, 30000, 90000],
    "existingLoan": [0, 20000, 5000, 10000, 0],
    "employment": [5, 1, 3, 2, 6]
})

# SHAP explainer
explainer = shap.Explainer(model, background)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # ✅ FIXED: FORCE COLUMN ORDER
    input_df = pd.DataFrame([[
        data.get("creditScore", 0),
        data.get("income", 0),
        data.get("existingLoan", 0),
        data.get("employment", 0)
    ]], columns=[
        "creditScore",
        "income",
        "existingLoan",
        "employment"
    ])

    # Prediction
    prediction = int(model.predict(input_df)[0])

    # SHAP values
    shap_values = explainer(input_df)

    # Convert SHAP to readable dict
    explanation = {}
    for i, col in enumerate(input_df.columns):
        explanation[col] = float(shap_values.values[0][i])

    return jsonify({
        "prediction": prediction,
        "explanation": explanation
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)