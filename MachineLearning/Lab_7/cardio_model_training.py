import matplotlib.pyplot as plt
import pandas as pd
import os
import seaborn as sns
from sklearn.model_selection import train_test_split , GridSearchCV
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay
import pickle

df = pd.read_csv('Cardiovascular_Disease_Dataset_mod.csv', sep=';')

df = df.dropna(axis=1)
# print(f'Ilosc kolumn po usunięciu NaN: {len(df.columns)}')

# Convert non numerical data to numerical
df['oldpeak'] = df['oldpeak'].apply(lambda row: float(row.replace(',', '.')))
# print(df.head().to_string(), os.linesep)

# Drop rows with data out of domain
df.drop(df[df['serumcholestrol'] < 126].index, inplace=True)
df.drop(df[564 < df['serumcholestrol']].index, inplace=True)

# print(df.head().to_string())
# print(df.shape)

df.drop(columns=['patientid'], inplace=True)
features_to_train = ['age', 'gender', 'chestpain', 'restingBP', 'serumcholestrol', 'fastingbloodsugar',
                     'restingrelectro', 'maxheartrate', 'oldpeak', 'noofmajorvessels']

plt.figure(figsize=(11, 7))
plt.title("Cardio corr matrix")
sns.heatmap(df.corr(),
            cmap='BrBG',
            fmt='.2f',
            linewidths=1,
            annot=True)
plt.show()

X = df[features_to_train]
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

param_grid = {
    'n_estimators': [128, 200, 256],
    'learning_rate': [0.2, 0.3],
    'max_depth': [3, 5],
    'min_samples_split': [7, 8, 9],
    'min_samples_leaf': [1, 2, 3],
    'subsample': [0.6, 0.8, 1]
}

# Tune model for optimal hyperparameters
grid_search = GridSearchCV(GradientBoostingClassifier(random_state=42), param_grid, cv=3, scoring='f1', refit=True, n_jobs=-1)

grid_search.fit(X_train, y_train)

model = grid_search.best_estimator_
y_pred = model.predict(X_test)
report = classification_report(y_test, y_pred, digits=3)
print('Report',os.linesep, report)
print('Model score', grid_search.score(X_test, y_test), os.linesep)
print('Best score:', grid_search.best_score_)
print('Best hyperparameters\n', grid_search.best_params_)

# Display Confiusion matrix
cm = confusion_matrix(y_test, y_pred)
dispCM = ConfusionMatrixDisplay(confusion_matrix=cm)
dispCM.plot()
plt.show()

# Save the model
with open('cardiovascular_disease_model.pkl', 'wb') as f:
    pickle.dump(model ,f)