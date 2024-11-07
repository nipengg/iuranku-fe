from PIL import Image
import pytesseract
import re
from fuzzywuzzy import fuzz
from datetime import datetime
import base64
import io
import json

def extract_transfer_details(image_data):
    image_bytes = base64.b64decode(image_data)
    
    image = Image.open(io.BytesIO(image_bytes))

    text = pytesseract.image_to_string(image, lang='eng')
    text = text.replace('\n', ' ').replace(',', '')
    
    date_patterns = [
        r'(\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2})',
        r'(\d{2} \w+ \d{4} \d{2}:\d{2})' 
    ]
    amount_patterns = [
        r'Rp\. ([\d,]+\.\d{2})',
        r'IDR ([\d,]+)',
        r'Amount\s*IDR\s*([\d.]+)'
    ]

    date_time = None
    for pattern in date_patterns:
        match = re.search(pattern, text)
        if match:
            date_str = match.group(1)
            try:
                if '/' in date_str:
                    # Format: DD/MM/YYYY HH:MM:SS
                    date_time = datetime.strptime(date_str, '%d/%m/%Y %H:%M:%S')
                else:
                    # Format: DD Mon YYYY HH:MM
                    date_time = datetime.strptime(date_str, '%d %b %Y %H:%M')
                
                date_time = date_time.strftime('%Y-%m-%d %H:%M:%S')
            except ValueError:
                pass
            break

    amount = None
    for pattern in amount_patterns:
        match = re.search(pattern, text)
        if match:
            amount = match.group(1).replace(',', '')
            break
        
    result = {
        "date_time": date_time,
        "amount": amount,
    }
    print(json.dumps(result))   
    return result

# Example usage
if __name__ == "__main__":
    import sys
    base64_image_data = sys.argv[1]
    
    details = extract_transfer_details(base64_image_data)
    print(details)
