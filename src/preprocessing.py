import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler


def load_and_clean_data(filepath):
    """Raw CSV load karo aur basic cleaning karo."""
    df = pd.read_csv(filepath)

    # TotalCharges ko number banao, jo convert na ho wo NaN ban jaayega
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df['TotalCharges'] = df['TotalCharges'].fillna(0)

    # customerID drop karo — predictive value nahi hai
    df = df.drop('customerID', axis=1)

    return df


def split_features_target(df):
    """Features (X) aur target (y) alag karo."""
    X = df.drop('Churn', axis=1)
    y = df['Churn'].map({'No': 0, 'Yes': 1})
    return X, y


def build_preprocessor(X):
    """ColumnTransformer banao jo scaling + encoding karega."""
    categorical_cols = X.select_dtypes(include='object').columns.tolist()
    numeric_cols = X.select_dtypes(exclude='object').columns.tolist()

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_cols),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
        ]
    )
    return preprocessor 