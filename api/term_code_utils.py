# api/term_code_utils.py

from datetime import datetime

def get_term_code_from_text(term_input: str) -> str:
    month_to_code = {
        'winter': '1',
        'spring': '3',
        'summer': '5',
        'fall': '7'
    }

    now = datetime.now()
    term_input = term_input.strip().lower()

    # Special handling for phrases like "next quarter"
    if "next" in term_input:
        return infer_next_term_code(now)

    for season, season_code in month_to_code.items():
        if season in term_input:
            digits = ''.join(filter(str.isdigit, term_input))
            if digits:
                year = int("20" + digits[-2:])  # e.g. "25" becomes 2025
            else:
                year = now.year
            return f"{str(year)[-2:]}5{season_code}"

    return infer_next_term_code(now)

def get_term_code_from_text(text):
    text = text.lower()
    year = datetime.datetime.now().year
    month = datetime.datetime.now().month

    # Handle keyword-based conversion
    if "winter" in text:
        return f"{str(year)[-2:]}51"
    elif "spring" in text:
        return f"{str(year)[-2:]}53"
    elif "summer" in text:
        return f"{str(year)[-2:]}55"
    elif "fall" in text:
        return f"{str(year)[-2:]}57"
    elif "next" in text or "upcoming" in text:
        if month < 3:
            return f"{str(year)[-2:]}51"
        elif month < 6:
            return f"{str(year)[-2:]}53"
        elif month < 9:
            return f"{str(year)[-2:]}55"
        else:
            return f"{str(year)[-2:]}57"
    else:
        return "UNKNOWN"
