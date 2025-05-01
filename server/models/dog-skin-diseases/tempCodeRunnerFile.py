

prediction = model.predict(img_array)
predicted_index = np.argmax(prediction)
predicted_label = class_labels[predicted_index]


print(f"Prediction: {predicted_label} ({prediction[0][predicted_index]*100:.2f}%)")
