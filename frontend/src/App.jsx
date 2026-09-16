import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    gender: 'Male',
    SeniorCitizen: 0,
    Partner: 'No',
    Dependents: 'No',
    tenure: 0,
    PhoneService: 'Yes',
    MultipleLines: 'No',
    InternetService: 'DSL',
    OnlineSecurity: 'No',
    OnlineBackup: 'No',
    DeviceProtection: 'No',
    TechSupport: 'No',
    StreamingTV: 'No',
    StreamingMovies: 'No',
    Contract: 'Month-to-month',
    PaperlessBilling: 'Yes',
    PaymentMethod: 'Electronic check',
    MonthlyCharges: 0,
    TotalCharges: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          SeniorCitizen: Number(formData.SeniorCitizen),
          tenure: Number(formData.tenure),
          MonthlyCharges: Number(formData.MonthlyCharges),
          TotalCharges: Number(formData.TotalCharges),
        }),
      });

      if (!response.ok) {
        throw new Error('Prediction request failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Risk color depends on the actual prediction — not decoration, a signal
  const riskColor = result
    ? result.churn_prediction === 'Yes'
      ? 'var(--risk)'
      : 'var(--safe)'
    : 'var(--border)';

  return (
    <div className="app">
      <div className="app-header">
        <h1>Churn Predictor</h1>
        <p>Estimate the likelihood a customer will cancel their subscription.</p>
      </div>

      <div className="layout">
        {/* LEFT: form */}
        <div className="panel">
          <div className="section">
            <h2>Account</h2>
            <div className="field-grid">
              <div className="field">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="field">
                <label>Senior citizen</label>
                <select name="SeniorCitizen" value={formData.SeniorCitizen} onChange={handleChange}>
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>
              <div className="field">
                <label>Partner</label>
                <select name="Partner" value={formData.Partner} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="field">
                <label>Dependents</label>
                <select name="Dependents" value={formData.Dependents} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="field">
                <label>Tenure (months)</label>
                <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Services</h2>
            <div className="field-grid">
              <div className="field">
                <label>Phone service</label>
                <select name="PhoneService" value={formData.PhoneService} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="field">
                <label>Multiple lines</label>
                <select name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No phone service">No phone service</option>
                </select>
              </div>
              <div className="field">
                <label>Internet service</label>
                <select name="InternetService" value={formData.InternetService} onChange={handleChange}>
                  <option value="DSL">DSL</option>
                  <option value="Fiber optic">Fiber optic</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="field">
                <label>Online security</label>
                <select name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet service</option>
                </select>
              </div>
              <div className="field">
                <label>Online backup</label>
                <select name="OnlineBackup" value={formData.OnlineBackup} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet service</option>
                </select>
              </div>
              <div className="field">
                <label>Device protection</label>
                <select name="DeviceProtection" value={formData.DeviceProtection} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet service</option>
                </select>
              </div>
              <div className="field">
                <label>Tech support</label>
                <select name="TechSupport" value={formData.TechSupport} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet service</option>
                </select>
              </div>
              <div className="field">
                <label>Streaming TV</label>
                <select name="StreamingTV" value={formData.StreamingTV} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet service</option>
                </select>
              </div>
              <div className="field">
                <label>Streaming movies</label>
                <select name="StreamingMovies" value={formData.StreamingMovies} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet service</option>
                </select>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Billing</h2>
            <div className="field-grid">
              <div className="field">
                <label>Contract</label>
                <select name="Contract" value={formData.Contract} onChange={handleChange}>
                  <option value="Month-to-month">Month-to-month</option>
                  <option value="One year">One year</option>
                  <option value="Two year">Two year</option>
                </select>
              </div>
              <div className="field">
                <label>Paperless billing</label>
                <select name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="field">
                <label>Payment method</label>
                <select name="PaymentMethod" value={formData.PaymentMethod} onChange={handleChange}>
                  <option value="Electronic check">Electronic check</option>
                  <option value="Mailed check">Mailed check</option>
                  <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                  <option value="Credit card (automatic)">Credit card (automatic)</option>
                </select>
              </div>
              <div className="field">
                <label>Monthly charges</label>
                <input type="number" name="MonthlyCharges" value={formData.MonthlyCharges} onChange={handleChange} />
              </div>
              <div className="field">
                <label>Total charges</label>
                <input type="number" name="TotalCharges" value={formData.TotalCharges} onChange={handleChange} />
              </div>
            </div>
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Predicting…' : 'Predict Churn'}
          </button>

          {error && <p className="error-msg">{error}</p>}
        </div>

        {/* RIGHT: result panel, sticky so it stays visible while scrolling the form */}
        <div className="panel result-panel">
          <h2>Result</h2>

          {result ? (
            <>
              <div className="risk-meter" style={{ borderColor: riskColor, color: riskColor }}>
                {(result.churn_probability * 100).toFixed(0)}%
              </div>
              <div className="result-label" style={{ color: riskColor }}>
                {result.churn_prediction === 'Yes' ? 'At risk of churning' : 'Likely to stay'}
              </div>
              <div className="result-sub">Churn probability</div>
            </>
          ) : (
            <div className="empty-state">Fill out the form and click Predict Churn to see a result here.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;