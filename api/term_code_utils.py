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

def infer_next_term_code(current: datetime) -> str:
    m = current.month
    y = current.year
    short_year = str(y)[-2:]

    if m <= 2:
        return f"{short_year}51"
    elif m <= 5:
        return f"{short_year}53"
    elif m <= 8:
        return f"{short_year}55"
    else:
        return f"{short_year}57"
