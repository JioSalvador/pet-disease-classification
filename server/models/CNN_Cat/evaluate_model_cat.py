import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.utils.multiclass import unique_labels
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import os


model = load_model("cat_skin_transfer_model.h5")

data_dir = r"C:\Users\Jio\Desktop\CNN Cat"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

eval_generator = datagen.flow_from_directory(
    data_dir,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)


y_pred = model.predict(eval_generator)
y_pred_classes = np.argmax(y_pred, axis=1)
y_true = eval_generator.classes
class_labels = list(eval_generator.class_indices.keys())


labels = unique_labels(y_true, y_pred_classes)
safe_class_labels = [class_labels[i] if i < len(class_labels) else f"Class {i}" for i in labels]


print("\n📋 Evaluation Report (Cats):")
print(classification_report(y_true, y_pred_classes, labels=labels, target_names=safe_class_labels))

# Confusion matrix
cm = confusion_matrix(y_true, y_pred_classes)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=class_labels, yticklabels=class_labels)
plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.title("Confusion Matrix (Cats)")
plt.tight_layout()
plt.show()
