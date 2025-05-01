import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np


model = load_model("cat_skin_transfer_model.h5")


class_labels = ['Flea allergy', 'Healthy', 'Ringworm', 'Scabies']


img_path = "sample_cat.jpg"  
img = image.load_img(img_path, target_size=(224, 224))
img_array = image.img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)


prediction = model.predict(img_array)
predicted_index = np.argmax(prediction)
predicted_label = class_labels[predicted_index]
confidence = prediction[0][predicted_index] * 100


print(f"Prediction: {predicted_label} ({confidence:.2f}%)")
