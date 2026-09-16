import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

from preprocessing import load_and_clean_data, split_features_target, build_preprocessor


def train_model():
    # Step 1: Data load aur clean karo
    df = load_and_clean_data('../raw/dataset.csv')

    # Step 2: Features aur target alag karo
    X, y = split_features_target(df)

    # Step 3: Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Step 4: Preprocessor banao aur fit karo (sirf training data pe)
    preprocessor = build_preprocessor(X_train)
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)

    # Step 5: Model train karo
    model = LogisticRegression(max_iter=1000, class_weight='balanced')
    model.fit(X_train_processed, y_train)

    # Step 6: Evaluate karo, taaki har baar retrain karne pe pata chale performance kaisa hai
    y_pred = model.predict(X_test_processed)
    print(classification_report(y_test, y_pred))

    # Step 7: Model aur preprocessor save karo
    joblib.dump(model, '../models/churn_model.pkl')
    joblib.dump(preprocessor, '../models/preprocessor.pkl')
    print("Model and preprocessor saved successfully!")


if __name__ == '__main__':
    train_model()