import fitz  # PyMuPDF
import os

pdf_path = "Next-Gen Enterprise Software Marketplace.pdf"  # Aapki PDF file ka path
output_dir = "public"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

file_names = [
    "slide-1-hero-tablet.png",
    "slide-2-telemetry-matrix.png",
    "slide-3-deal-pipeline.png",
    "slide-4-erp-operations.png",
    "slide-5-deployment-cubes.png"
]

for i in range(min(5, len(doc))):
    page = doc.load_page(i)
    # High resolution ke liye 2x zoom matrix (approx 300 DPI)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    save_path = os.path.join(output_dir, file_names[i])
    pix.save(save_path)
    print(f"Saved: {save_path}")

print("Saari slides public/ folder me save ho gayi hain!")