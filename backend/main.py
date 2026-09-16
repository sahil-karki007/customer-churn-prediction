from pydantic import BaseModel
from fastapi import FastAPI
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev server
    allow_methods=["*"],
    allow_headers=["*"],
)
class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float


model = joblib.load('../models/churn_model.pkl')
preprocessor = joblib.load('../models/preprocessor.pkl')


@app.post('/predict')
def predict_churn(customer: CustomerData):
    input_dict = customer.model_dump()
    input_df = pd.DataFrame([input_dict])

    input_processed = preprocessor.transform(input_df)

    prediction = model.predict(input_processed)[0]
    probability = model.predict_proba(input_processed)[0][1]

    return {
        'churn_prediction': 'Yes' if prediction == 1 else 'No',
        'churn_probability': round(float(probability), 4)
    }