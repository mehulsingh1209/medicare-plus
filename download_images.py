import os
from PIL import Image, ImageDraw, ImageFont

# Get the absolute path of the script's directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

def create_placeholder_image(width, height, text, filename):
    try:
        # Create a new image with a light blue background
        image = Image.new('RGB', (width, height), '#E3F2FD')
        draw = ImageDraw.Draw(image)
        
        # Add a simple design
        draw.rectangle([(0, 0), (width, height)], outline='#90CAF9', width=10)
        
        # Add text
        font_size = min(width, height) // 10
        font = ImageFont.load_default()
        
        # Calculate text position
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        # Draw text
        draw.text((x, y), text, font=font, fill='#1976D2')
        
        # Convert relative path to absolute path
        abs_filename = os.path.join(SCRIPT_DIR, filename)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(abs_filename), exist_ok=True)
        
        # Save the image
        image.save(abs_filename, 'JPEG', quality=85)
        print(f"Created: {filename}")
    except Exception as e:
        print(f"Error creating {filename}: {str(e)}")

# Create directories first
directories = [
    'img/hero',
    'img/categories',
    'img/products',
    'img/testimonials',
    'img/team',
    'img/about'
]

for directory in directories:
    try:
        abs_dir = os.path.join(SCRIPT_DIR, directory)
        os.makedirs(abs_dir, exist_ok=True)
        print(f"Created directory: {directory}")
    except Exception as e:
        print(f"Error creating directory {directory}: {str(e)}")

# Define and create images
images = {
    # Hero images
    'img/hero/pharmacy-hero.jpg': ('Pharmacy Hero', 1920, 800),
    'img/hero/products-hero.jpg': ('Products Hero', 1920, 800),
    'img/hero/contact-hero.jpg': ('Contact Hero', 1920, 800),
    'img/hero/about-hero.jpg': ('About Hero', 1920, 800),
    
    # Category images
    'img/categories/allopathic.jpg': ('Allopathic', 600, 400),
    'img/categories/ayurvedic.jpg': ('Ayurvedic', 600, 400),
    'img/categories/generic.jpg': ('Generic', 600, 400),
    
    # Product images
    'img/products/paracetamol.jpg': ('Paracetamol', 400, 400),
    'img/products/amoxicillin.jpg': ('Amoxicillin', 400, 400),
    'img/products/omeprazole.jpg': ('Omeprazole', 400, 400),
    'img/products/chyawanprash.jpg': ('Chyawanprash', 400, 400),
    'img/products/ashwagandha.jpg': ('Ashwagandha', 400, 400),
    'img/products/giloy.jpg': ('Giloy', 400, 400),
    'img/products/metformin.jpg': ('Metformin', 400, 400),
    'img/products/amlodipine.jpg': ('Amlodipine', 400, 400),
    
    # Testimonial images
    'img/testimonials/customer1.jpg': ('Customer 1', 300, 300),
    'img/testimonials/customer2.jpg': ('Customer 2', 300, 300),
    
    # Team images
    'img/team/doctor1.jpg': ('Dr. Sharma', 300, 300),
    'img/team/doctor2.jpg': ('Dr. Patel', 300, 300),
    'img/team/pharmacist1.jpg': ('Pharmacist', 300, 300),
    'img/team/pharmacist2.jpg': ('Pharmacist 2', 300, 300),
    'img/team/pharmacist3.jpg': ('Pharmacist 3', 300, 300),
    
    # About page images
    'img/about/story.jpg': ('Our Story', 800, 600),
    'img/about/cert1.jpg': ('Certification 1', 400, 300),
    'img/about/cert2.jpg': ('Certification 2', 400, 300),
    'img/about/cert3.jpg': ('Certification 3', 400, 300),
}

# Create all images
for path, (text, width, height) in images.items():
    create_placeholder_image(width, height, text, path)

print("\nAll placeholder images have been created successfully!")

# Print the total number of images created
print(f"\nTotal images created: {len(images)}")
print("You can now refresh your browser to see the images.") 