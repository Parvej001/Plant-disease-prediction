import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
import os

# =================================================================
# === 1. Parameters & Configuration ===
# =================================================================
# --- Paths ---
data_dir = "dataset"  # Your main dataset directory
train_dir = os.path.join(data_dir, "train")
val_dir = os.path.join(data_dir, "val")
# The best model will be saved to this path by the callback
model_path = "plant_disease_best_model.h5"

# --- Model & Training Parameters ---
batch_size = 16
img_size = (224, 224)
epochs_initial = 15
epochs_finetune = 10
fine_tune_at_layer = 100 # Freeze all layers before the 100th layer

# =================================================================
# === 2. Data Pipeline (Load, Augment, Preprocess) ===
# =================================================================
print("🔄 Setting up data pipelines...")

# --- Load Datasets from directories ---
train_dataset = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    image_size=img_size,
    batch_size=batch_size,
    label_mode='int',
    shuffle=True
)

val_dataset = tf.keras.utils.image_dataset_from_directory(
    val_dir,
    image_size=img_size,
    batch_size=batch_size,
    label_mode='int',
    shuffle=False
)

# ADD THIS SECTION TO GET THE CLASS NAMES
# =============================================================
print("\n" + "="*50)
print("--- CORRECT CLASS NAMES FOR PREDICTION SCRIPT ---")
print(train_dataset.class_names)
print("="*50 + "\n")
# =============================================================

AUTOTUNE = tf.data.AUTOTUNE
class_names = train_dataset.class_names
num_classes = len(class_names)
print(f"Found {num_classes} classes: {class_names}")

# --- Define Data Augmentation ---
data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
    layers.RandomRotation(0.2),
    layers.RandomZoom(0.1),
    layers.RandomContrast(0.1),
], name="data_augmentation")

# --- Define Preprocessing Functions ---
def augment_and_preprocess(image, label):
    """Applies augmentation and then preprocessing for the training set."""
    image = data_augmentation(image, training=True)
    image = tf.keras.applications.mobilenet_v2.preprocess_input(image)
    return image, label

def preprocess_validation(image, label):
    """Applies only preprocessing for the validation/test set."""
    return tf.keras.applications.mobilenet_v2.preprocess_input(image), label

# --- Build the Pipelines ---
train_dataset = train_dataset.map(augment_and_preprocess, num_parallel_calls=AUTOTUNE)
val_dataset = val_dataset.map(preprocess_validation, num_parallel_calls=AUTOTUNE)

# --- Prefetch for performance ---
train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
val_dataset = val_dataset.prefetch(buffer_size=AUTOTUNE)
print("✅ Data pipelines are ready.")

# =================================================================
# === 3. Build the Model ===
# =================================================================
print("🏗️ Building the model...")
base_model = MobileNetV2(input_shape=img_size + (3,), include_top=False, weights="imagenet")

# Freeze the base model for initial training
base_model.trainable = False

inputs = tf.keras.Input(shape=img_size + (3,))
# The data pipeline handles preprocessing, so the model expects preprocessed inputs
x = base_model(inputs, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(num_classes, activation="softmax")(x)

model = models.Model(inputs, outputs)
print("✅ Model built successfully.")
model.summary()

# =================================================================
# === 4. Initial Training (Training the new head) ===
# =================================================================
print("\n--- Starting Initial Training ---")
model.compile(
    optimizer=tf.keras.optimizers.Adam(),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# --- Callbacks ---
# This saves only the best model found during the entire training process
checkpoint_cb = ModelCheckpoint(model_path, save_best_only=True, monitor='val_accuracy', verbose=1)
# This stops training if the validation loss doesn't improve
early_stop_cb = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

history = model.fit(
    train_dataset,
    validation_data=val_dataset,
    epochs=epochs_initial,
    callbacks=[checkpoint_cb, early_stop_cb]
)

# =================================================================
# === 5. Fine-Tuning (Training top layers of the base model) ===
# =================================================================
print("\n--- Starting Fine-Tuning ---")

# --- Unfreeze layers for fine-tuning ---
base_model.trainable = True
# Freeze all layers before the 'fine_tune_at_layer'
for layer in base_model.layers[:fine_tune_at_layer]:
    layer.trainable = False

# --- Re-compile the model with a very low learning rate ---
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
print("Model re-compiled for fine-tuning.")
model.summary() # Show the updated trainable parameters

# --- Continue training ---
# We use `len(history.epoch)` to continue the epoch count from where it left off
initial_epochs_completed = len(history.epoch)
total_epochs = initial_epochs_completed + epochs_finetune

history_fine = model.fit(
    train_dataset,
    validation_data=val_dataset,
    epochs=total_epochs,
    initial_epoch=initial_epochs_completed,
    callbacks=[checkpoint_cb, early_stop_cb] # Re-using the same callbacks
)

# =================================================================
# === 6. Completion ===
# =================================================================
print(f"\n✅✅✅ Training complete! The best model is saved at: {model_path}")