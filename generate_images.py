from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(width, height, text, filepath):
    try:
        # Create image with a light blue background
        img = Image.new('RGB', (width, height), '#E3F2FD')
        draw = ImageDraw.Draw(img)
        
        # Add border
        draw.rectangle([0, 0, width-1, height-1], outline='#90CAF9', width=2)
        
        # Add text
        font = ImageFont.load_default()
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        draw.text((x, y), text, fill='#1976D2', font=font)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        # Save image
        img.save(filepath, 'JPEG', quality=85)
        print(f'Created: {filepath}')
    except Exception as e:
        print(f'Error creating {filepath}: {str(e)}')

# Get the script's directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Create required directories
directories = [
    'img/hero',
    'img/categories',
    'img/products',
    'img/testimonials',
    'img/team',
    'img/about'
]

for dir_path in directories:
    full_path = os.path.join(current_dir, dir_path)
    try:
        os.makedirs(full_path, exist_ok=True)
        print(f'Created directory: {full_path}')
    except Exception as e:
        print(f'Error creating directory {full_path}: {str(e)}')

# Generate images
images = [
    # Hero images
    ('img/hero/pharmacy-hero.jpg', 'Pharmacy Hero', 1920, 800),
    ('img/hero/products-hero.jpg', 'Products Hero', 1920, 800),
    ('img/hero/contact-hero.jpg', 'Contact Hero', 1920, 800),
    ('img/hero/about-hero.jpg', 'About Hero', 1920, 800),
    
    # Category images
    ('img/categories/allopathic.jpg', 'Allopathic', 600, 400),
    ('img/categories/ayurvedic.jpg', 'Ayurvedic', 600, 400),
    ('img/categories/generic.jpg', 'Generic', 600, 400),
    
    # Product images
    ('img/products/paracetamol.jpg', 'Paracetamol', 400, 400),
    ('img/products/amoxicillin.jpg', 'Amoxicillin', 400, 400),
    ('img/products/omeprazole.jpg', 'Omeprazole', 400, 400),
    ('img/products/chyawanprash.jpg', 'Chyawanprash', 400, 400),
    ('img/products/ashwagandha.jpg', 'Ashwagandha', 400, 400),
    ('img/products/giloy.jpg', 'Giloy', 400, 400),
    ('img/products/metformin.jpg', 'Metformin', 400, 400),
    ('img/products/amlodipine.jpg', 'Amlodipine', 400, 400),
    
    # Testimonial images
    ('img/testimonials/customer1.jpg', 'Customer 1', 300, 300),
    ('img/testimonials/customer2.jpg', 'Customer 2', 300, 300),
    
    # Team images
    ('img/team/doctor1.jpg', 'Dr. Sharma', 300, 300),
    ('img/team/doctor2.jpg', 'Dr. Patel', 300, 300),
    ('img/team/pharmacist1.jpg', 'Pharmacist', 300, 300),
    ('img/team/pharmacist2.jpg', 'Pharmacist 2', 300, 300),
    ('img/team/pharmacist3.jpg', 'Pharmacist 3', 300, 300),
    
    # About page images
    ('img/about/story.jpg', 'Our Story', 800, 600),
    ('img/about/cert1.jpg', 'Certification 1', 400, 300),
    ('img/about/cert2.jpg', 'Certification 2', 400, 300),
    ('img/about/cert3.jpg', 'Certification 3', 400, 300),
]

# Create all images with full paths
for rel_path, text, width, height in images:
    full_path = os.path.join(current_dir, rel_path)
    create_placeholder(width, height, text, full_path)

print("\nAll placeholder images have been created successfully!")
print(f"Total images created: {len(images)}")
print("\nNow you can refresh your browser to see the images.") 