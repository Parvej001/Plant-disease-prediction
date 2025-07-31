import os
import shutil
import random

SOURCE_DIR = 'PlantVillage'      # This is where all the class folders are
DEST_DIR = 'dataset'             # Output folders: train/ and val/
TRAIN_SPLIT = 0.8                # 80% training, 20% validation

# Get list of all class folders
classes = [d for d in os.listdir(SOURCE_DIR) if os.path.isdir(os.path.join(SOURCE_DIR, d))]

# Create train and val folders
for cls in classes:
    os.makedirs(os.path.join(DEST_DIR, 'train', cls), exist_ok=True)
    os.makedirs(os.path.join(DEST_DIR, 'val', cls), exist_ok=True)

    # List all images in current class folder
    class_path = os.path.join(SOURCE_DIR, cls)
    images = os.listdir(class_path)
    random.shuffle(images)

    # Split into train and validation sets
    split_idx = int(len(images) * TRAIN_SPLIT)
    train_imgs = images[:split_idx]
    val_imgs = images[split_idx:]

    for img in train_imgs:
        src = os.path.join(class_path, img)
        dst = os.path.join(DEST_DIR, 'train', cls, img)
        shutil.copyfile(src, dst)

    for img in val_imgs:
        src = os.path.join(class_path, img)
        dst = os.path.join(DEST_DIR, 'val', cls, img)
        shutil.copyfile(src, dst)

print("✅ Dataset split complete.")
