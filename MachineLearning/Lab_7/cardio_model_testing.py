import pickle
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay

# Path to testing data.
df = pd.read_csv('cardio_test_data.csv', sep=';')

with open('cardiovascular_disease_model.pkl', 'rb') as f:
    model: GradientBoostingClassifier = pickle.load(f)

features_used_in_training = model.feature_names_in_

df = df.dropna(axis=1)

# Convert non numerical data to numerical
df['oldpeak'] = df['oldpeak'].apply(lambda row: float(row.replace(',', '.')))

X = df[features_used_in_training]
y = df['target']

# Test model
y_pred = model.predict(X)
report = classification_report(y, y_pred, digits=3)
print('Report\n', report)

# Display Confiusion matrix
cm = confusion_matrix(y, y_pred)
dispCM = ConfusionMatrixDisplay(confusion_matrix=cm)
dispCM.plot()
plt.show()