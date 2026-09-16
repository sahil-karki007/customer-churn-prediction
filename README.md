# Customer Churn Prediction

An end-to-end ML project that predicts telecom customer churn — from raw data to a trained model, served via a FastAPI backend, with a React dashboard for live predictions.

## Stack
- **ML**: pandas, scikit-learn (Logistic Regression, one-hot encoding, scaling)
- **Backend**: FastAPI
- **Frontend**: React (Vite)

## Project structure
customer-churn-prediction/
├── raw/ # dataset (not committed — see .gitignore)
├── notebook/ # EDA + experimentation
├── src/ # preprocessing.py, train.py — reusable pipeline
├── models/ # trained model + preprocessor (not committed)
├── backend/ # FastAPI serving the model
└── frontend/ # React UI for live predictions


## How to run

**Train the model:**
```bash
cd src
python train.py
```

**Start the backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Start the frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Results
Logistic Regression with class balancing — Recall: 0.78, F1: 0.61 on the minority (churn) class.